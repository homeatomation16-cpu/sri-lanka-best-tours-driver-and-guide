// Compares two (Vercel preview) URLs with interleaved mobile Lighthouse runs and prints medians.
// Used by .github/workflows/lighthouse-compare.yml; needs lighthouse and puppeteer-core installed.
//
// Protected previews: the bypass secret is sent once per run as Vercel's query parameter to the preview
// itself, which sets a cookie for that host only. It is never added as a header, so it cannot reach
// third-party origins (Cloudinary, Google Tag Manager, fonts), and it never appears in the reports.
import fs from "node:fs";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer-core";

const [baseline, candidate] = [process.env.BASELINE_URL, process.env.CANDIDATE_URL];
const runs = Number(process.env.RUNS) || 5;
const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "";
if (!baseline || !candidate) throw new Error("BASELINE_URL and CANDIDATE_URL are required");

const median = (v) => { const s = [...v].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

async function measure(url) {
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox", "--headless=new"] });
  try {
    const page = await browser.newPage();
    if (secret && new URL(url).hostname.endsWith(".vercel.app")) {
      const unlock = new URL(url);
      unlock.searchParams.set("x-vercel-protection-bypass", secret);
      unlock.searchParams.set("x-vercel-set-bypass-cookie", "true");
      await page.goto(unlock.href, { waitUntil: "domcontentloaded" });
    } else {
      await page.goto(url, { waitUntil: "domcontentloaded" }); // same warm-up for an unprotected URL
    }
    const cdp = await page.createCDPSession();
    await cdp.send("Network.clearBrowserCache"); // cold cache for every run; the bypass cookie stays
    const { lhr } = await lighthouse(url, { output: "json", onlyCategories: ["performance"], disableStorageReset: true, formFactor: "mobile" }, undefined, page);
    const a = lhr.audits;
    const phaseTable = (a["lcp-phases-insight"]?.details?.items || []).find((item) => item.type === "table");
    const phases = Object.fromEntries((phaseTable?.items || []).map((p) => [p.phase || p.subpart, p.timing ?? p.duration]));
    const requests = a["network-requests"].details.items;
    return {
      performance: Math.round(lhr.categories.performance.score * 100),
      fcp: a["first-contentful-paint"].numericValue,
      lcp: a["largest-contentful-paint"].numericValue,
      tbt: a["total-blocking-time"].numericValue,
      cls: a["cumulative-layout-shift"].numericValue,
      speedIndex: a["speed-index"].numericValue,
      mainThread: a["mainthread-work-breakdown"].numericValue,
      longTasks: a["long-tasks"].details.items.length,
      jsKiB: requests.filter((r) => r.resourceType === "Script").reduce((s, r) => s + (r.transferSize || 0), 0) / 1024,
      totalKiB: a["total-byte-weight"].numericValue / 1024,
      lcpRenderDelay: phases.elementRenderDelay ?? NaN,
      benchmarkIndex: lhr.environment.benchmarkIndex,
    };
  } finally {
    await browser.close();
  }
}

const results = { baseline: [], candidate: [] };
for (let i = 0; i < runs; i++) {
  // alternate the order each round so neither side always runs on a warmer machine
  for (const name of i % 2 ? ["candidate", "baseline"] : ["baseline", "candidate"]) {
    results[name].push(await measure(name === "baseline" ? baseline : candidate));
    console.log(`round ${i + 1} ${name}: perf ${results[name].at(-1).performance} lcp ${Math.round(results[name].at(-1).lcp)}ms tbt ${Math.round(results[name].at(-1).tbt)}ms`);
  }
}

const metrics = Object.keys(results.baseline[0]);
const rows = metrics.map((m) => {
  const cell = (name) => { const v = results[name].map((r) => r[m]); return `${median(v).toFixed(m === "cls" ? 3 : 0)} [${Math.min(...v).toFixed(0)}–${Math.max(...v).toFixed(0)}]`; };
  return `| ${m} | ${cell("baseline")} | ${cell("candidate")} |`;
});
const summary = [`Median [min–max] of ${runs} interleaved mobile runs (Lighthouse ${lighthouse.version ?? "12"}, simulated throttling).`, "", `| metric | baseline | candidate |`, `|---|---|---|`, ...rows].join("\n");
console.log(summary);
fs.writeFileSync("lighthouse-compare.json", JSON.stringify(results, null, 1));
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
