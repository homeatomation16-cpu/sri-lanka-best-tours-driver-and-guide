"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, Eye, EyeOff, RotateCcw, Languages, CheckCircle2 } from "lucide-react";
import MediaUploader from "@/components/admin/MediaUploader";
import { useToast } from "@/components/admin/Toast";

const LOCALES = ["en", "ar", "fr", "de", "es", "it", "hi", "zh", "ru", "ja", "si", "pt", "ko", "ta"];
type Loc = Record<string, string>;
const en = (v: any): string => (typeof v === "string" ? v : v?.en || "");
const setEn = (v: any, text: string): Loc => ({ ...(typeof v === "object" && v ? v : {}), en: text });
const uid = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2));

const TABS = [
  { key: "hero", label: "Home Hero (videos)" },
  { key: "gallery", label: "Gallery" },
  { key: "tailorMade", label: "Tailor Made" },
] as const;

export default function ContentClient() {
  const toast = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("hero");
  const [data, setData] = useState<any>(null);
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async (key: string) => {
    setLoading(true);
    setDirty(false);
    try {
      const r = await fetch(`/api/admin/content?key=${key}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setData(j.data);
      setIsDefault(!!j.isDefault);
    } catch (e: any) {
      toast(e.message || "Could not load", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { load(tab); }, [tab, load]);

  const change = (updater: (d: any) => any) => { setData((d: any) => updater(structuredClone(d))); setDirty(true); };

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: tab, data }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setData(j.data);
      setIsDefault(false);
      setDirty(false);
      toast("Saved & translated into 14 languages ✓");
    } catch (e: any) {
      toast(e.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("Go back to the original built-in content? Your saved changes for this section will be removed.")) return;
    await fetch(`/api/admin/content?key=${tab}`, { method: "DELETE" });
    toast("Restored original content");
    load(tab);
  };

  const switchTab = (k: any) => {
    if (dirty && !confirm("You have unsaved changes. Leave without saving?")) return;
    setTab(k);
  };

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-zinc-200 pb-32">
      <div className="mb-6 mt-10 md:mt-0">
        <h1 className="text-3xl font-serif font-bold text-white">Website Content</h1>
        <p className="text-zinc-500 text-sm flex items-center gap-2 mt-1"><Languages size={14} className="text-orange-500" /> Type <b className="text-zinc-300">English only</b> – the other 13 languages are translated automatically when you save.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => switchTab(t.key)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${tab === t.key ? "bg-orange-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"}`}>{t.label}</button>
        ))}
      </div>

      {isDefault && !loading && <div className="mb-6 text-xs bg-sky-500/10 border border-sky-500/30 text-sky-300 px-4 py-3 rounded-xl">These are the website's current built-in items. Edit anything and press <b>Save</b> – from then on the website uses what you saved here.</div>}

      {loading || !data ? (
        <div className="flex items-center gap-3 text-zinc-500 py-20 justify-center"><Loader2 className="animate-spin" /> Loading…</div>
      ) : tab === "hero" ? (
        <ItemsEditor
          data={data} change={change} toast={toast} kind="hero"
          blank={() => ({ id: uid(), type: "video", enabled: true, src: "", title: { en: "" }, subtitle: { en: "" } })}
        />
      ) : tab === "gallery" ? (
        <>
          <Card title="Section heading">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Small label" value={en(data.heading?.label)} onChange={(v) => change((d) => { d.heading = d.heading || {}; d.heading.label = setEn(d.heading.label, v); return d; })} />
              <Field label="Title" value={en(data.heading?.title)} onChange={(v) => change((d) => { d.heading = d.heading || {}; d.heading.title = setEn(d.heading.title, v); return d; })} />
            </div>
          </Card>
          <ItemsEditor data={data} change={change} toast={toast} kind="gallery" blank={() => ({ id: uid(), enabled: true, src: "", alt: { en: "" }, caption: { en: "" } })} />
        </>
      ) : (
        <TailorEditor data={data} change={change} toast={toast} />
      )}

      <div className="fixed bottom-0 left-0 right-0 md:left-64 z-40 bg-zinc-950/95 backdrop-blur border-t border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between gap-3">
        <button onClick={reset} className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-red-400"><RotateCcw size={14} /> Restore original</button>
        <div className="flex items-center gap-4">
          {dirty && <span className="text-xs text-amber-400 font-semibold">Unsaved changes</span>}
          <button onClick={save} disabled={saving || loading} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 px-6 py-3 rounded-xl font-bold text-sm">
            {saving ? <><Loader2 className="animate-spin" size={16} /> Translating & saving…</> : <><Save size={16} /> Save & auto-translate</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero + Gallery list editor ---------- */
function ItemsEditor({ data, change, toast, kind, blank }: any) {
  const items: any[] = data.items || [];
  const isHero = kind === "hero";
  const upd = (i: number, fn: (it: any) => void) => change((d: any) => { fn(d.items[i]); return d; });
  const move = (i: number, dir: number) => change((d: any) => { const j = i + dir; if (j < 0 || j >= d.items.length) return d; [d.items[i], d.items[j]] = [d.items[j], d.items[i]]; return d; });

  return (
    <div className="space-y-5">
      {items.map((it, i) => (
        <div key={it.id} className={`bg-zinc-900 border rounded-2xl p-5 grid md:grid-cols-[260px_1fr] gap-5 ${it.enabled === false ? "border-zinc-800 opacity-60" : "border-zinc-800"}`}>
          <MediaUploader
            value={it.src}
            accept={isHero ? "both" : "image"}
            folder={isHero ? "hero" : "gallery"}
            onError={(m) => toast(m, "error")}
            onChange={(url, k) => upd(i, (x) => { x.src = url; if (isHero) x.type = k; })}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">#{i + 1} {isHero ? it.type : "photo"}</span>
              <div className="flex gap-1">
                <IconBtn title="Move up" onClick={() => move(i, -1)}><ArrowUp size={14} /></IconBtn>
                <IconBtn title="Move down" onClick={() => move(i, 1)}><ArrowDown size={14} /></IconBtn>
                <IconBtn title={it.enabled === false ? "Show on website" : "Hide from website"} onClick={() => upd(i, (x) => { x.enabled = x.enabled === false; })}>{it.enabled === false ? <EyeOff size={14} /> : <Eye size={14} />}</IconBtn>
                <IconBtn title="Delete" danger onClick={() => confirm("Delete this item?") && change((d: any) => { d.items.splice(i, 1); return d; })}><Trash2 size={14} /></IconBtn>
              </div>
            </div>
            {isHero ? (
              <>
                <Field label="Title (English)" value={en(it.title)} onChange={(v) => upd(i, (x) => { x.title = setEn(x.title, v); })} />
                <Field label="Subtitle (English)" value={en(it.subtitle)} onChange={(v) => upd(i, (x) => { x.subtitle = setEn(x.subtitle, v); })} />
                <TransStatus a={it.title} b={it.subtitle} />
              </>
            ) : (
              <>
                <Field label="Caption (English) – shown on hover" value={en(it.caption)} onChange={(v) => upd(i, (x) => { x.caption = setEn(x.caption, v); })} />
                <Field label="Alt text (English, for SEO)" value={en(it.alt)} onChange={(v) => upd(i, (x) => { x.alt = setEn(x.alt, v); })} />
                <TransStatus a={it.caption} b={it.alt} />
              </>
            )}
          </div>
        </div>
      ))}
      <button onClick={() => change((d: any) => { d.items.push(blank()); return d; })} className="w-full py-4 border-2 border-dashed border-zinc-700 hover:border-orange-500/60 rounded-2xl text-sm font-bold text-zinc-400 hover:text-orange-400 flex items-center justify-center gap-2"><Plus size={16} /> Add {isHero ? "video / image slide" : "photo"}</button>
    </div>
  );
}

/* ---------- Tailor made editor ---------- */
function TailorEditor({ data, change, toast }: any) {
  const f = (k: string, label: string, area = false) => (
    <Field key={k} label={label} area={area} value={en(data[k])} onChange={(v) => change((d: any) => { d[k] = setEn(d[k], v); return d; })} />
  );
  const tags: any[] = data.tags || [];
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card title="Photo (home page card)">
        <MediaUploader value={data.image} accept="image" folder="tailormade" onError={(m) => toast(m, "error")} onChange={(u) => change((d: any) => { d.image = u; return d; })} />
      </Card>
      <Card title="Texts (English)">
        <div className="space-y-4">
          {f("label", "Small label")}
          {f("heading", "Heading")}
          {f("desc", "Highlighted line", true)}
          {f("subtext1", "Paragraph 1", true)}
          {f("subtext2", "Paragraph 2", true)}
          {f("buttonPrimary", "Main button")}
          {f("buttonSecondary", "Second link")}
        </div>
      </Card>
      <Card title="Tags on the photo">
        <div className="space-y-3">
          {tags.map((t, i) => (
            <div key={i} className="flex gap-2">
              <Field label="" value={en(t)} onChange={(v) => change((d: any) => { d.tags[i] = setEn(d.tags[i], v); return d; })} />
              <IconBtn danger title="Remove" onClick={() => change((d: any) => { d.tags.splice(i, 1); return d; })}><Trash2 size={14} /></IconBtn>
            </div>
          ))}
          <button onClick={() => change((d: any) => { d.tags = [...(d.tags || []), { en: "" }]; return d; })} className="text-xs font-bold text-orange-400 flex items-center gap-1"><Plus size={14} /> Add tag</button>
        </div>
      </Card>
      <div className="text-xs text-zinc-500 leading-relaxed bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <b className="text-zinc-300">Tailor-made request form</b> (steps, field names, buttons) stays in the normal translation files – it never changes. Only this home-page card is editable here.
      </div>
    </div>
  );
}

/* ---------- small UI helpers ---------- */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6"><h3 className="font-bold text-white mb-4 text-sm">{title}</h3>{children}</div>;
}
function Field({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  const cls = "w-full px-3 py-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:border-orange-500/50";
  return (
    <div className="flex-1 space-y-1">
      {label && <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{label}</label>}
      {area ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={cls} /> : <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />}
    </div>
  );
}
function IconBtn({ children, onClick, title, danger }: any) {
  return <button type="button" title={title} onClick={onClick} className={`p-2 rounded-lg bg-zinc-800 border border-zinc-700 ${danger ? "text-red-400 hover:bg-red-500 hover:text-white" : "text-zinc-400 hover:text-white"}`}>{children}</button>;
}
function TransStatus({ a, b }: { a: any; b: any }) {
  const done = (v: any) => (typeof v === "object" && v ? LOCALES.filter((l) => v[l]?.trim()).length : 0);
  const n = Math.min(done(a) || 0, done(b) || 0);
  const full = n === LOCALES.length;
  return (
    <p className={`text-[11px] flex items-center gap-1.5 ${full ? "text-emerald-400" : "text-zinc-500"}`}>
      {full ? <CheckCircle2 size={12} /> : <Languages size={12} />} {full ? "Translated in all 14 languages" : "Will be translated into 14 languages when you save"}
    </p>
  );
}
