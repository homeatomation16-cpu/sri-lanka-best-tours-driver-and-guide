"use client";

// Admin → Tour pricing: spreadsheet-style table of whole-group prices (USD) for the 10 round tours.
// Tab / Shift+Tab move along a row, Enter / arrow keys move up and down. Changed cells turn amber until saved.
import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Car, History, RotateCcw, Save, Table2 } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { formatUsd, MAX_TRAVELLERS, parseUsdInput, vehicleFor, type PriceTable } from "@/lib/tourPricingCore";

type Pricing = {
  version: number;
  prices: PriceTable;
  updatedAt: string;
  updatedBy: string;
  history: { version: number; at: string; by: string; changes: { tourId: string; travellers: number; from: number; to: number }[] }[];
};
type Tour = { tourId: string; name: string };

const COLS = Array.from({ length: MAX_TRAVELLERS }, (_, i) => i + 1);
const centsToText = (c: number) => (c % 100 === 0 ? String(c / 100) : (c / 100).toFixed(2));
const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const VEHICLE_TONE: Record<string, string> = { "Sedan Car": "bg-sky-500/10 text-sky-300", "KDH Flatroof": "bg-violet-500/10 text-violet-300", "KDH Highroof": "bg-emerald-500/10 text-emerald-300" };

export default function PricingPage() {
  const toast = useToast();
  const [tours, setTours] = useState<Tour[]>([]);
  const [saved, setSaved] = useState<Pricing | null>(null);
  const [draft, setDraft] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    fetch("/api/admin/pricing", { cache: "no-store" })
      .then(async (res) => {
        const d = await res.json();
        if (!res.ok) throw new Error(d.error);
        setTours(d.tours);
        setSaved(d.pricing);
        setDraft(Object.fromEntries(Object.entries(d.pricing.prices as PriceTable).map(([id, row]) => [id, row.map(centsToText)])));
      })
      .catch(() => setLoadError("Could not load the price table."));
  }, [reloadKey]);

  // Cell state: parsed cents, error, changed
  const cells = useMemo(() => {
    const out: Record<string, { cents: number | null; changed: boolean }[]> = {};
    if (!saved) return out;
    for (const { tourId } of tours) {
      out[tourId] = (draft[tourId] ?? []).map((text, i) => {
        const cents = parseUsdInput(text);
        return { cents, changed: cents !== saved.prices[tourId][i] };
      });
    }
    return out;
  }, [draft, saved, tours]);
  const flat = Object.values(cells).flat();
  const invalid = flat.filter((c) => c.cents === null).length;
  const changed = flat.filter((c) => c.changed).length;

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!changed) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [changed]);

  const setCell = (tourId: string, i: number, value: string) => setDraft((d) => ({ ...d, [tourId]: d[tourId].map((v, j) => (j === i ? value : v)) }));

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    const move = e.key === "Enter" || e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!move) return;
    e.preventDefault();
    const next = tours[row + (e.shiftKey && e.key === "Enter" ? -1 : move)];
    if (next) inputs.current[`${next.tourId}:${col}`]?.select();
  };

  function discard() {
    if (!saved || !confirm(`Discard ${changed} unsaved change${changed === 1 ? "" : "s"}?`)) return;
    setDraft(Object.fromEntries(Object.entries(saved.prices).map(([id, row]) => [id, row.map(centsToText)])));
  }

  async function save() {
    if (!saved || invalid || !changed) return;
    const prices = Object.fromEntries(tours.map(({ tourId }) => [tourId, cells[tourId].map((c) => c.cents as number)]));
    // Ask before big edits: many cells, or any price moving by more than 30 %
    const big = tours.flatMap(({ tourId, name }) =>
      cells[tourId].flatMap((c, i) => {
        const from = saved.prices[tourId][i];
        return c.changed && Math.abs((c.cents as number) - from) / from > 0.3 ? [`${name}, ${i + 1} pax: ${formatUsd(from)} → ${formatUsd(c.cents as number)}`] : [];
      }),
    );
    if ((changed > 10 || big.length) && !confirm(`Save ${changed} price change${changed === 1 ? "" : "s"}?${big.length ? `\n\nLarge changes (over 30%):\n${big.slice(0, 8).join("\n")}${big.length > 8 ? `\n…and ${big.length - 8} more` : ""}` : ""}`)) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/pricing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: saved.version, prices }) });
      const d = await res.json();
      if (res.status === 409) {
        toast(d.message || "Someone else saved first – reload to see their prices", "error");
        return;
      }
      if (!res.ok) throw new Error(d.details?.[0] || d.error);
      setSaved(d.pricing);
      setDraft(Object.fromEntries(Object.entries(d.pricing.prices as PriceTable).map(([id, row]) => [id, row.map(centsToText)])));
      toast(`Saved ${d.changed} price${d.changed === 1 ? "" : "s"} – the website shows them now`);
    } catch (error: any) {
      toast(error?.message || "Saving failed", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loadError) return <div className="p-8 text-red-400">{loadError} <button onClick={() => { setLoadError(""); setReloadKey((k) => k + 1); }} className="ml-2 underline">Try again</button></div>;
  if (!saved) return <div className="p-8 text-slate-400">Loading prices…</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-white"><Table2 className="text-amber-400" />Tour pricing</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Whole-group price in <strong className="text-slate-200">USD</strong> for each number of travellers – not per person. The vehicle follows the group size.
            Round tours with hotels, day tours and other packages keep their own prices.
          </p>
          <p className="mt-2 text-xs text-slate-500">{saved.version === 0 ? "Initial price list – not saved in the database yet (the first save stores it)" : `Version ${saved.version} · last saved ${when(saved.updatedAt)} by ${saved.updatedBy}`}</p>
        </div>
        <div className="flex items-center gap-2">
          {changed > 0 && <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">{changed} unsaved</span>}
          <button onClick={discard} disabled={!changed || saving} className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-40">
            <RotateCcw size={16} />Discard
          </button>
          <button onClick={save} disabled={!changed || !!invalid || saving} className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-40">
            <Save size={16} />{saving ? "Saving…" : "Save prices"}
          </button>
        </div>
      </div>

      {invalid > 0 && (
        <p role="alert" className="mb-4 flex items-center gap-2 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />{invalid} cell{invalid === 1 ? " has" : "s have"} an invalid price. Use a positive amount like 450 or 1020.50.
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-[1100px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900">
              <th rowSpan={2} className="sticky left-0 z-10 bg-slate-900 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Tour package</th>
              {COLS.map((n) => (
                <th key={n} className="px-2 pt-3 text-center text-xs font-bold text-slate-300">{n} {n === 1 ? "person" : "people"}</th>
              ))}
            </tr>
            <tr className="bg-slate-900">
              {COLS.map((n) => (
                <th key={n} className="px-2 pb-3 pt-1 text-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${VEHICLE_TONE[vehicleFor(n)]}`}><Car size={10} />{vehicleFor(n)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tours.map(({ tourId, name }, row) => (
              <tr key={tourId} className="border-t border-slate-800 odd:bg-slate-950 even:bg-slate-900/40">
                <th scope="row" className="sticky left-0 z-10 bg-inherit px-4 py-2 text-left font-semibold text-white">
                  {name}
                  <span className="block font-mono text-[10px] font-normal text-slate-500">{tourId}</span>
                </th>
                {COLS.map((n, col) => {
                  const cell = cells[tourId]?.[col];
                  const bad = cell?.cents === null;
                  return (
                    <td key={n} className="px-1 py-1.5">
                      <label className="sr-only" htmlFor={`p-${tourId}-${n}`}>{name}, {n} travellers, USD</label>
                      <div className={`flex items-center rounded-lg border px-2 ${bad ? "border-red-500 bg-red-950/40" : cell?.changed ? "border-amber-400 bg-amber-400/10" : "border-slate-700 bg-slate-900"} focus-within:ring-2 focus-within:ring-amber-400/50`}>
                        <span className="text-xs text-slate-500">$</span>
                        <input
                          id={`p-${tourId}-${n}`}
                          ref={(el) => { inputs.current[`${tourId}:${col}`] = el; }}
                          inputMode="decimal"
                          value={draft[tourId]?.[col] ?? ""}
                          onChange={(e) => setCell(tourId, col, e.target.value)}
                          onKeyDown={(e) => onKey(e, row, col)}
                          onFocus={(e) => e.target.select()}
                          aria-invalid={bad}
                          className="w-full min-w-0 bg-transparent py-2 pl-1 text-right font-mono text-sm text-white outline-none"
                        />
                      </div>
                      {bad && <span className="mt-0.5 block text-center text-[10px] text-red-400">Invalid</span>}
                      {!bad && cell?.changed && <span className="mt-0.5 block text-center text-[10px] text-amber-300/80">was {formatUsd(saved.prices[tourId][col])}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">Tip: Tab moves right, Enter or ↓ moves down. Per-person prices on the website are the group total divided by the travellers.</p>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white"><History size={16} className="text-amber-400" />Change history</h2>
        {saved.history?.length ? (
          <ul className="space-y-3">
            {saved.history.slice(0, 15).map((h) => (
              <li key={h.version} className="text-sm">
                <p className="text-slate-300"><strong>v{h.version}</strong> · {when(h.at)} · {h.by} · {h.changes.length} change{h.changes.length === 1 ? "" : "s"}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {h.changes.slice(0, 6).map((c) => `${tours.find((t) => t.tourId === c.tourId)?.name ?? c.tourId} ${c.travellers} pax ${formatUsd(c.from)} → ${formatUsd(c.to)}`).join(" · ")}
                  {h.changes.length > 6 ? ` · +${h.changes.length - 6} more` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No changes yet – the table holds the initial price list.</p>
        )}
      </section>
    </div>
  );
}
