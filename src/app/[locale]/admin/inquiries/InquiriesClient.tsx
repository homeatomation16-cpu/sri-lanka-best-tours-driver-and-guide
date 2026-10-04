"use client";
import React, { useMemo, useState } from "react";
import { Mail, MessageSquare, Trash2, Save, Compass, Inbox, ChevronDown } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

type Item = {
  _id: string; type: "contact" | "tailor-made"; name: string; email: string; phone: string; message: string; data: any;
  status: "new" | "contacted" | "closed"; internalNotes: string; createdAt: string;
};

const ST: Record<string, string> = {
  new: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  contacted: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  closed: "bg-zinc-700/30 text-zinc-400 border-zinc-600",
};

export default function InquiriesClient({ items: initial }: { items: Item[] }) {
  const toast = useToast();
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<"all" | Item["status"]>("all");
  const [type, setType] = useState<"all" | Item["type"]>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const list = useMemo(() => items.filter((i) => (filter === "all" || i.status === filter) && (type === "all" || i.type === type)), [items, filter, type]);

  const patch = async (id: string, body: any, msg: string) => {
    const res = await fetch(`/api/inquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setItems((p) => p.map((i) => (i._id === id ? { ...i, ...body } : i))); toast(msg); }
    else toast("Update failed", "error");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) { setItems((p) => p.filter((i) => i._id !== id)); toast("Deleted"); } else toast("Delete failed", "error");
  };

  const labelize = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="p-4 md:p-8 min-h-screen text-zinc-200">
      <div className="mb-8 mt-10 md:mt-0">
        <h1 className="text-3xl font-serif font-bold text-white">Inquiries</h1>
        <p className="text-zinc-500 text-sm">Contact-form messages and Tailor-made tour requests</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
          {["all", "new", "contacted", "closed"].map((f) => (
            <button key={f} onClick={() => setFilter(f as any)} className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider ${filter === f ? "bg-orange-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>{f}{f === "new" ? ` (${items.filter((i) => i.status === "new").length})` : ""}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
          {[["all", "All types"], ["contact", "Contact"], ["tailor-made", "Tailor-made"]].map(([k, l]) => (
            <button key={k} onClick={() => setType(k as any)} className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider ${type === k ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>{l}</button>
          ))}
        </div>
      </div>

      {list.length === 0 && (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-3xl text-zinc-500"><Inbox className="mx-auto mb-3" /> No inquiries here.<br /><span className="text-xs">New messages from the Contact and Tailor-made forms will appear automatically.</span></div>
      )}

      <div className="space-y-3">
        {list.map((i) => (
          <div key={i._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${i.type === "tailor-made" ? "bg-purple-500/15 text-purple-400" : "bg-sky-500/15 text-sky-400"}`}>
                  {i.type === "tailor-made" ? <Compass size={18} /> : <MessageSquare size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{i.name || "Unknown"} <span className="text-[10px] uppercase font-black text-zinc-500 ml-2">{i.type}</span></p>
                  <p className="text-xs text-zinc-500 truncate">{i.email}{i.phone ? ` · ${i.phone}` : ""} · {new Date(i.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select value={i.status} onChange={(e) => patch(i._id, { status: e.target.value }, `Marked ${e.target.value}`)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border bg-transparent outline-none cursor-pointer ${ST[i.status]}`}>
                  {["new", "contacted", "closed"].map((s) => <option key={s} value={s} className="bg-zinc-950 text-white">{s}</option>)}
                </select>
                {i.phone && <a href={`https://wa.me/${i.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-zinc-800 text-emerald-400 hover:bg-emerald-500 hover:text-white"><MessageSquare size={16} /></a>}
                <a href={`mailto:${i.email}`} onClick={() => i.status === "new" && patch(i._id, { status: "contacted" }, "Marked contacted")} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white"><Mail size={16} /></a>
                <button onClick={() => remove(i._id)} className="p-2.5 rounded-xl bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                <button onClick={() => setOpen(open === i._id ? null : i._id)} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400"><ChevronDown size={16} className={open === i._id ? "rotate-180" : ""} /></button>
              </div>
            </div>

            {open === i._id && (
              <div className="border-t border-zinc-800 bg-zinc-950/50 p-5 grid md:grid-cols-2 gap-6">
                <div>
                  {i.message && <p className="text-sm text-zinc-300 italic border-l-2 border-orange-500/40 pl-4 mb-4 whitespace-pre-wrap">{i.message}</p>}
                  {i.data && (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      {Object.entries(i.data).filter(([k, v]) => v !== "" && v !== null && !["name", "email", "additionalRequirements"].includes(k)).map(([k, v]) => (
                        <React.Fragment key={k}><dt className="text-zinc-500">{labelize(k)}</dt><dd className="text-zinc-200 font-medium">{Array.isArray(v) ? v.join(", ") : String(v)}</dd></React.Fragment>
                      ))}
                    </dl>
                  )}
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Internal notes</label>
                  <textarea rows={4} value={notes[i._id] ?? i.internalNotes} onChange={(e) => setNotes({ ...notes, [i._id]: e.target.value })} className="w-full mt-1 p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm outline-none" />
                  <button onClick={() => patch(i._id, { internalNotes: notes[i._id] ?? i.internalNotes }, "Notes saved")} className="mt-3 flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-xl text-sm font-bold"><Save size={14} /> Save notes</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
