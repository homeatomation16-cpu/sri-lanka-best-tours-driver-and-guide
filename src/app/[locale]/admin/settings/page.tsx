"use client";

// Admin → Site settings: one place to change the phone, WhatsApp, e-mail, address, map and social links shown everywhere.
import { useEffect, useState } from "react";
import { Building2, Clock, Globe, Mail, MapPin, MessageCircle, Phone, RotateCcw, Save, Settings } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { SOCIAL_KEYS, type SiteSettings } from "@/lib/siteSettingsDefaults";

const SOCIAL_LABEL: Record<string, string> = {
  facebook: "Facebook", instagram: "Instagram", youtube: "YouTube", tripadvisor: "Tripadvisor", twitter: "X / Twitter", linkedin: "LinkedIn",
};

const input = "w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none";

function Field({ label, hint, icon: Icon, children }: { label: string; hint?: string; icon: typeof Phone; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Icon size={14} className="text-amber-400" />{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export default function SettingsPage() {
  const toast = useToast();
  const [s, setS] = useState<SiteSettings | null>(null);
  const [defaults, setDefaults] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { setS(d.settings); setDefaults(d.defaults); })
      .catch(() => toast("Could not load settings", "error"));
  }, [toast]);

  if (!s) return <div className="p-8 text-slate-400">Loading settings…</div>;

  const set = (k: keyof SiteSettings, v: string) => setS({ ...s, [k]: v });
  const setSocial = (k: string, v: string) => setS({ ...s, social: { ...s.social, [k]: v } });

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setS(d.settings);
      toast("Settings saved – the website is updated");
    } catch {
      toast("Saving failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-white"><Settings className="text-amber-400" />Site settings</h1>
          <p className="mt-1 text-sm text-slate-400">Change contact details and social links once – the header, footer, contact page, booking forms and e-mails all use them.</p>
        </div>
        <div className="flex gap-2">
          {defaults && (
            <button onClick={() => setS(defaults)} className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
              <RotateCcw size={16} />Defaults
            </button>
          )}
          <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-60">
            <Save size={16} />{saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="mb-5 text-sm font-bold text-white">Business & contact</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Business name" icon={Building2}><input className={input} value={s.brand} onChange={(e) => set("brand", e.target.value)} /></Field>
          <Field label="E-mail" icon={Mail}><input type="email" className={input} value={s.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Phone" icon={Phone} hint="With country code, e.g. +94 77 123 4567"><input className={input} value={s.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="WhatsApp number" icon={MessageCircle} hint="The wa.me chat link is created from this"><input className={input} value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
          <Field label="Business hours" icon={Clock} hint="Optional, e.g. Every day 6am – 10pm"><input className={input} value={s.businessHours} onChange={(e) => set("businessHours", e.target.value)} /></Field>
          <Field label="Address" icon={MapPin}><input className={input} value={s.address} onChange={(e) => set("address", e.target.value)} /></Field>
          <div className="md:col-span-2">
            <Field label="Google Maps embed URL" icon={Globe} hint="Google Maps → Share → Embed a map → copy the https://www.google.com/maps/embed?… link">
              <input className={input} value={s.map} onChange={(e) => set("map", e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="mb-1 text-sm font-bold text-white">Social media</h2>
        <p className="mb-5 text-xs text-slate-500">Full https:// links. Leave empty to hide an icon.</p>
        <div className="grid gap-5 md:grid-cols-2">
          {SOCIAL_KEYS.map((k) => (
            <Field key={k} label={SOCIAL_LABEL[k]} icon={Globe}>
              <input className={input} placeholder="https://" value={s.social[k]} onChange={(e) => setSocial(k, e.target.value)} />
            </Field>
          ))}
        </div>
      </section>
    </div>
  );
}
