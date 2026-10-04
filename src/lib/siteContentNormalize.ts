import { Localized, translateIfChanged } from "./autoTranslate";

type Prev = any;
const str = (v: any) => (typeof v === "string" ? v : v?.en || "");
const byId = (arr: any[] = []) => Object.fromEntries(arr.map((x) => [x?.id, x]));

/** Translate several Localized fields at once (sequentially per field, 4 languages at a time inside). */
async function loc(input: any, prev: any): Promise<Localized> {
  return translateIfChanged(str(input), prev && typeof prev === "object" ? prev : undefined);
}

const cleanUrl = (u: any) => String(u || "").trim();

export async function normalizeSection(key: string, input: any, previous: Prev): Promise<any> {
  if (key === "hero") {
    const prev = byId(previous?.items);
    const items = [];
    for (const it of input?.items || []) {
      const src = cleanUrl(it.src);
      if (!src) continue;
      const p = prev[it.id] || {};
      items.push({
        id: String(it.id || crypto.randomUUID()),
        type: it.type === "image" ? "image" : "video",
        enabled: it.enabled !== false,
        src,
        poster: cleanUrl(it.poster),
        title: await loc(it.title, p.title),
        subtitle: await loc(it.subtitle, p.subtitle),
      });
    }
    return { items };
  }

  if (key === "gallery") {
    const prev = byId(previous?.items);
    const items = [];
    for (const it of input?.items || []) {
      const src = cleanUrl(it.src);
      if (!src) continue;
      const p = prev[it.id] || {};
      items.push({
        id: String(it.id || crypto.randomUUID()),
        enabled: it.enabled !== false,
        src,
        alt: await loc(it.alt, p.alt),
        caption: await loc(it.caption, p.caption),
      });
    }
    return {
      items,
      heading: {
        label: await loc(input?.heading?.label, previous?.heading?.label),
        title: await loc(input?.heading?.title, previous?.heading?.title),
      },
    };
  }

  if (key === "tailorMade") {
    const out: any = { image: cleanUrl(input?.image) };
    for (const f of ["label", "heading", "desc", "subtext1", "subtext2", "buttonPrimary", "buttonSecondary"]) {
      out[f] = await loc(input?.[f], previous?.[f]);
    }
    const prevTags = previous?.tags || [];
    out.tags = [];
    const tags = (input?.tags || []).filter((t: any) => str(t).trim());
    for (let i = 0; i < tags.length; i++) out.tags.push(await loc(tags[i], prevTags[i]));
    return out;
  }

  throw new Error(`Unknown section "${key}"`);
}
