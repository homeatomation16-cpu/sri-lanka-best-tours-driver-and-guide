"use client";
import React, { useMemo, useState } from "react";
import { Search, Mail, Phone, MessageSquare, ChevronDown, Download, Users, Repeat, DollarSign } from "lucide-react";

type C = {
  email: string; name: string; phone: string; inquiries: number; firstSeen: string; lastSeen: string; spent: number; tripCount: number;
  bookings: { id: string; item: string; date: string; status: string; total: number; paid: number; people: number }[];
};

const badge: Record<string, string> = {
  pending: "text-orange-400", confirmed: "text-emerald-400", completed: "text-sky-400", cancelled: "text-red-400",
};

export default function CustomersClient({ customers }: { customers: C[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [onlyRepeat, setOnlyRepeat] = useState(false);

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return customers.filter((c) => (!s || [c.name, c.email, c.phone].some((v) => v.toLowerCase().includes(s))) && (!onlyRepeat || c.bookings.length > 1));
  }, [customers, q, onlyRepeat]);

  const repeat = customers.filter((c) => c.bookings.length > 1).length;
  const lifetime = customers.reduce((s, c) => s + c.spent, 0);

  const exportCSV = () => {
    const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = list.map((c) => [c.name, c.email, c.phone, c.bookings.length, c.tripCount, c.spent, c.inquiries, c.lastSeen.slice(0, 10)].map(esc).join(","));
    const csv = "\uFEFF" + ["Name,Email,Phone,Bookings,Trips,Spent USD,Inquiries,Last contact", ...rows].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-4 md:p-8 min-h-screen text-zinc-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 mt-10 md:mt-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Customers</h1>
          <p className="text-zinc-500 text-sm">Everyone who booked or contacted you, merged by e-mail</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800"><Download size={16} /> Export CSV</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { l: "Customers", v: customers.length, i: Users },
          { l: "Repeat guests", v: repeat, i: Repeat },
          { l: "Lifetime revenue", v: `$${lifetime.toLocaleString()}`, i: DollarSign },
        ].map((s) => (
          <div key={s.l} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <s.i size={18} className="text-orange-500 mb-2" />
            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{s.l}</p>
            <p className="text-2xl font-bold text-white">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, e-mail, phone…" className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none focus:border-orange-500/50" />
        </div>
        <button onClick={() => setOnlyRepeat(!onlyRepeat)} className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border ${onlyRepeat ? "bg-orange-600 border-orange-600" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`}>Repeat guests only</button>
      </div>

      <div className="space-y-3">
        {list.length === 0 && <p className="text-center text-zinc-500 py-20">No customers found.</p>}
        {list.map((c) => (
          <div key={c.email} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-5 flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-full bg-orange-600/20 text-orange-400 font-bold flex items-center justify-center shrink-0">{(c.name || "?")[0]?.toUpperCase()}</div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{c.name} {c.bookings.length > 1 && <span className="ml-2 text-[9px] font-black uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Repeat</span>}</p>
                  <p className="text-xs text-zinc-500 truncate">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div><p className="text-lg font-bold text-white">{c.bookings.length}</p><p className="text-[10px] uppercase text-zinc-500">Bookings</p></div>
                <div><p className="text-lg font-bold text-emerald-400">${c.spent.toLocaleString()}</p><p className="text-[10px] uppercase text-zinc-500">Spent</p></div>
                <div className="hidden sm:block"><p className="text-sm font-bold text-zinc-300">{c.lastSeen.slice(0, 10)}</p><p className="text-[10px] uppercase text-zinc-500">Last contact</p></div>
              </div>
              <div className="flex items-center gap-2">
                {c.phone && <a href={`https://wa.me/${c.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-zinc-800 text-emerald-400 hover:bg-emerald-500 hover:text-white"><MessageSquare size={16} /></a>}
                <a href={`mailto:${c.email}`} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white"><Mail size={16} /></a>
                {c.phone && <a href={`tel:${c.phone}`} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white"><Phone size={16} /></a>}
                <button onClick={() => setOpen(open === c.email ? null : c.email)} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"><ChevronDown size={16} className={open === c.email ? "rotate-180" : ""} /></button>
              </div>
            </div>
            {open === c.email && (
              <div className="border-t border-zinc-800 bg-zinc-950/50 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">History · {c.inquiries} inquir{c.inquiries === 1 ? "y" : "ies"} · customer since {c.firstSeen.slice(0, 10)}</p>
                {c.bookings.length === 0 ? <p className="text-sm text-zinc-500">No bookings yet – inquiries only.</p> : (
                  <div className="space-y-2">
                    {c.bookings.map((b) => (
                      <div key={b.id} className="flex flex-wrap justify-between gap-2 text-sm bg-zinc-900 rounded-xl px-4 py-3">
                        <span className="text-zinc-200">{b.item || "—"} <span className="text-zinc-500 text-xs">· {b.date || "no date"} · {b.people} pax</span></span>
                        <span><b className={`uppercase text-xs mr-3 ${badge[b.status]}`}>{b.status}</b><span className="text-zinc-300">${b.total}</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
