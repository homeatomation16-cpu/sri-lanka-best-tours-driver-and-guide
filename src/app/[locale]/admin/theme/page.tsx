"use client";

// Admin → Theme & colours: pick a preset, fine-tune colours, choose light / dark / visitor's choice.
import { useEffect, useState } from "react";
import { Check, Monitor, Moon, Palette, RotateCcw, Save, Sun } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { COLOR_FIELDS, DEFAULT_THEME, PRESETS, type ThemeColors, type ThemeMode, type ThemeSettings } from "@/lib/themeDefaults";

const MODES: { id: ThemeMode; label: string; hint: string; icon: typeof Sun }[] = [
  { id: "visitor", label: "Visitor chooses", hint: "Sun/moon button in the menu; starts with the device setting", icon: Monitor },
  { id: "light", label: "Always light", hint: "No toggle", icon: Sun },
  { id: "dark", label: "Always dark", hint: "No toggle", icon: Moon },
];

function Dots({ colors }: { colors: ThemeColors }) {
  return (
    <div className="flex -space-x-1.5">
      {[colors.primary, colors.accent, colors.bg, colors.darkBg].map((c, i) => (
        <span key={i} className="h-6 w-6 rounded-full border-2 border-slate-900" style={{ background: c }} />
      ))}
    </div>
  );
}

function Preview({ colors, dark }: { colors: ThemeColors; dark: boolean }) {
  const bg = dark ? colors.darkBg : colors.bg;
  const card = dark ? colors.darkSurface : "#ffffff";
  const text = dark ? colors.darkText : "#1a1209";
  const muted = dark ? colors.darkMuted : "#5c4e3d";
  const border = dark ? colors.darkBorder : "#e8ddd0";
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700" style={{ background: bg }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.primary }}>
        <span className="text-sm font-bold text-white">Sri Lanka Tours</span>
        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: colors.accent, color: "#1a1209" }}>Book now</span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Honeymoon</p>
        <p className="font-serif text-lg font-bold" style={{ color: text }}>Romantic Sri Lanka</p>
        <div className="mt-3 rounded-xl p-3" style={{ background: card, border: `1px solid ${border}` }}>
          <p className="text-sm font-semibold" style={{ color: text }}>7 days · Kandy, Ella, Galle</p>
          <p className="text-xs" style={{ color: muted }}>Private driver guide, hotels and breakfast</p>
          <p className="mt-2 text-sm font-bold" style={{ color: colors.accent }}>from $690</p>
        </div>
      </div>
    </div>
  );
}

export default function ThemePage() {
  const toast = useToast();
  const [t, setT] = useState<ThemeSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/theme", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setT(d.theme))
      .catch(() => toast("Could not load the theme", "error"));
  }, [toast]);

  if (!t) return <div className="p-8 text-slate-400">Loading theme…</div>;

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/theme", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t) });
      const d = await res.json();
      if (!res.ok) throw new Error();
      setT(d.theme);
      toast("Theme saved – open the website to see it");
    } catch {
      toast("Saving failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-white"><Palette className="text-amber-400" />Theme & colours</h1>
          <p className="mt-1 text-sm text-slate-400">Pick a preset or your own colours, and decide whether visitors can switch to dark mode.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setT(DEFAULT_THEME)} className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
            <RotateCcw size={16} />Original
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-60">
            <Save size={16} />{saving ? "Saving…" : "Save theme"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">Light / dark mode</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {MODES.map(({ id, label, hint, icon: Icon }) => (
                <button key={id} onClick={() => setT({ ...t, mode: id })}
                  className={`rounded-xl border p-4 text-left transition ${t.mode === id ? "border-amber-400 bg-amber-400/10" : "border-slate-700 hover:border-slate-500"}`}>
                  <Icon size={20} className={t.mode === id ? "text-amber-400" : "text-slate-400"} />
                  <p className="mt-2 text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500">{hint}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="mb-4 text-sm font-bold text-white">Presets</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {PRESETS.map((p) => (
                <button key={p.id} onClick={() => setT({ ...t, preset: p.id, colors: p.colors })}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition ${t.preset === p.id ? "border-amber-400 bg-amber-400/10" : "border-slate-700 hover:border-slate-500"}`}>
                  <div>
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <div className="mt-2"><Dots colors={p.colors} /></div>
                  </div>
                  {t.preset === p.id && <Check size={18} className="text-amber-400" />}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="mb-1 text-sm font-bold text-white">Custom colours</h2>
            <p className="mb-5 text-xs text-slate-500">Changing a colour switches the preset to “Custom”.</p>
            {(["Brand", "Dark mode"] as const).map((group) => (
              <div key={group} className="mb-5 last:mb-0">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{group}</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {COLOR_FIELDS.filter((f) => f.group === group).map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 p-2.5">
                      <input type="color" value={t.colors[key]} onChange={(e) => setT({ ...t, preset: "custom", colors: { ...t.colors, [key]: e.target.value } })}
                        className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent" />
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold text-white">{label}</span>
                        <span className="font-mono text-xs text-slate-500">{t.colors[key]}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Preview</p>
          {t.mode !== "dark" && <Preview colors={t.colors} dark={false} />}
          {t.mode !== "light" && <Preview colors={t.colors} dark />}
          <p className="text-xs text-slate-500">Photos, videos and a few illustrated scenes keep their own colours.</p>
        </aside>
      </div>
    </div>
  );
}
