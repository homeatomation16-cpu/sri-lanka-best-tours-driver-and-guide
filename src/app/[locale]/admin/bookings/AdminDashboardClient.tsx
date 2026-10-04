"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Download, Trash2, Calendar, Users, TrendingUp, Clock, ChevronDown, Check, Mail, Phone,
  MessageSquare, DollarSign, Save, Loader2, ArrowUpDown,
} from "lucide-react";
import { useToast } from "@/components/admin/Toast";

type Status = "pending" | "confirmed" | "cancelled" | "completed";
type Payment = "unpaid" | "deposit" | "paid";

type Booking = {
  _id: string; name: string; email: string; phone: string; date: string; time: string; people: number;
  itemName: string; bookingType: string; message: string; internalNotes: string;
  totalPrice: number; pricePerPerson: number; paymentStatus: Payment; amountPaid: number; assignedDriver: string;
  status: Status; history: { action: string; at: string }[]; createdAt: string;
};

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  completed: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};
const PAY_STYLES: Record<Payment, string> = {
  unpaid: "text-red-400", deposit: "text-amber-400", paid: "text-emerald-400",
};

const waLink = (phone: string, text = "") => {
  const n = phone.replace(/[^\d]/g, "");
  return n ? `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "";
};

const PAGE_SIZE = 15;

export default function AdminDashboardClient({ bookings: initial }: { bookings: Booking[] }) {
  const toast = useToast();
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "travel">("newest");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { internalNotes: string; assignedDriver: string; amountPaid: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const today = new Date().toDateString();
  const stats = useMemo(() => {
    const active = bookings.filter((b) => b.status !== "cancelled");
    return {
      total: bookings.length,
      today: bookings.filter((b) => b.createdAt && new Date(b.createdAt).toDateString() === today).length,
      pending: bookings.filter((b) => b.status === "pending").length,
      revenue: bookings.filter((b) => b.status === "confirmed" || b.status === "completed").reduce((s, b) => s + (b.totalPrice || 0), 0),
      outstanding: active.reduce((s, b) => s + Math.max(0, (b.totalPrice || 0) - (b.amountPaid || 0)), 0),
    };
  }, [bookings, today]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = bookings.filter((b) => {
      const matchSearch = !q || [b.name, b.email, b.phone, b.itemName].some((v) => v.toLowerCase().includes(q));
      return matchSearch && (statusFilter === "all" || b.status === statusFilter);
    });
    return [...list].sort((a, b) => {
      if (sort === "oldest") return +new Date(a.createdAt) - +new Date(b.createdAt);
      if (sort === "travel") return (a.date || "9999").localeCompare(b.date || "9999");
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
  }, [bookings, search, statusFilter, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const patch = async (id: string, body: any, okMsg: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/booking/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      setBookings((prev) => prev.map((b) => (b._id === id ? {
        ...b, ...body,
        history: (json.history || []).map((h: any) => ({ action: h.action, at: new Date(h.at).toISOString() })),
      } : b)));
      toast(okMsg);
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/booking/${deleteId}`, { method: "DELETE" });
    if (res.ok) { setBookings((p) => p.filter((b) => b._id !== deleteId)); toast("Booking deleted"); }
    else toast("Delete failed", "error");
    setDeleting(false);
    setDeleteId(null);
  };

  const exportCSV = () => {
    const q = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const headers = ["Name", "Email", "Phone", "Travel Date", "People", "Item", "Total USD", "Paid USD", "Payment", "Driver", "Status", "Created"];
    const rows = filtered.map((b) => [b.name, b.email, b.phone, b.date, b.people, b.itemName, b.totalPrice, b.amountPaid, b.paymentStatus, b.assignedDriver, b.status, new Date(b.createdAt).toLocaleDateString()].map(q));
    const csv = "\uFEFF" + [headers.map(q), ...rows].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const draftOf = (b: Booking) => drafts[b._id] ?? { internalNotes: b.internalNotes, assignedDriver: b.assignedDriver, amountPaid: String(b.amountPaid || "") };
  const setDraft = (b: Booking, p: Partial<ReturnType<typeof draftOf>>) => setDrafts((d) => ({ ...d, [b._id]: { ...draftOf(b), ...p } }));

  const saveDetails = async (b: Booking) => {
    const d = draftOf(b);
    setSavingId(b._id);
    const body: any = { internalNotes: d.internalNotes, amountPaid: Number(d.amountPaid) || 0 };
    if (d.assignedDriver !== b.assignedDriver) body.assignedDriver = d.assignedDriver;
    await patch(b._id, body, "Details saved");
    setSavingId(null);
  };

  return (
    <div className="min-h-screen font-sans text-zinc-200 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 px-4 mt-10 md:mt-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
            <Calendar size={24} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">Booking Requests</h1>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Manage your customer bookings</p>
          </div>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:bg-zinc-800 active:scale-95">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <main className="px-4">
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Total", value: stats.total, icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "New Today", value: stats.today, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Pending", value: stats.pending, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Outstanding", value: `$${stats.outstanding.toLocaleString()}`, icon: DollarSign, color: "text-red-400", bg: "bg-red-500/10" },
          ].map((s, i) => (
            <div key={i} className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/50 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{s.label}</span>
                <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}><s.icon size={16} /></div>
              </div>
              <div className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center justify-between mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input
              type="text" placeholder="Search name, email, phone or tour…"
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-orange-500/50 outline-none text-zinc-200"
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 overflow-x-auto">
              {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
                <button key={f} onClick={() => { setStatusFilter(f as any); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${statusFilter === f ? "bg-orange-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="appearance-none pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold outline-none">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="travel">Travel date</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-zinc-800/40 border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Contact</th>
                  <th className="px-6 py-5">Trip</th>
                  <th className="px-6 py-5 text-center">Total / Paid</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {visible.map((b) => {
                  const d = draftOf(b);
                  const open = expandedId === b._id;
                  const balance = Math.max(0, (b.totalPrice || 0) - (b.amountPaid || 0));
                  return (
                    <React.Fragment key={b._id}>
                      <tr className={open ? "bg-zinc-800/20" : "hover:bg-zinc-800/40"}>
                        <td className="px-6 py-5">
                          <div className="font-bold text-white">{b.name}</div>
                          <div className="text-[11px] text-zinc-600 mt-0.5">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ""}</div>
                          <button onClick={() => setExpandedId(open ? null : b._id)} className="text-[11px] font-bold text-orange-500 mt-2 flex items-center gap-1 hover:text-orange-400 uppercase tracking-wider">
                            {open ? "Close" : "Details"} <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1.5 text-sm">
                            <span className="flex items-center gap-2 text-zinc-300"><Mail size={13} className="text-zinc-600" /> {b.email}</span>
                            <span className="flex items-center gap-2 text-zinc-500"><Phone size={13} className="text-zinc-600" /> {b.phone || "—"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm">
                          <div className="text-zinc-200 font-medium max-w-[200px] truncate">{b.itemName || "—"}</div>
                          <div className="text-xs text-zinc-500 mt-1">{b.date || "No date"} · {b.people} pax</div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="font-bold text-white">${(b.totalPrice || 0).toLocaleString()}</div>
                          <div className={`text-[10px] font-black uppercase mt-1 ${PAY_STYLES[b.paymentStatus]}`}>{b.paymentStatus}{balance > 0 && b.totalPrice ? ` · $${balance} due` : ""}</div>
                        </td>
                        <td className="px-6 py-5">
                          <select
                            value={b.status}
                            onChange={(e) => patch(b._id, { status: e.target.value }, `Marked ${e.target.value}`)}
                            disabled={updatingId === b._id}
                            className={`w-full appearance-none px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border cursor-pointer outline-none bg-transparent text-center ${STATUS_STYLES[b.status]} ${updatingId === b._id ? "opacity-50" : ""}`}
                          >
                            {(["pending", "confirmed", "completed", "cancelled"] as Status[]).map((s) => <option key={s} value={s} className="bg-zinc-950 text-white">{s}</option>)}
                          </select>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            {b.phone && waLink(b.phone) && (
                              <a href={waLink(b.phone, `Hello ${b.name}, thank you for your booking request for ${b.itemName}.`)} target="_blank" rel="noreferrer" title="WhatsApp" className="w-10 h-10 rounded-xl bg-zinc-800 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center border border-zinc-700/50">
                                <MessageSquare size={16} />
                              </a>
                            )}
                            <a href={`mailto:${b.email}?subject=${encodeURIComponent(`Your booking – ${b.itemName}`)}`} title="E-mail" className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white flex items-center justify-center border border-zinc-700/50">
                              <Mail size={16} />
                            </a>
                            <button onClick={() => setDeleteId(b._id)} title="Delete" className="w-10 h-10 rounded-xl bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center border border-zinc-700/50">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {open && (
                        <tr>
                          <td colSpan={6} className="px-6 py-0">
                            <div className="mb-6 mt-2 p-6 bg-zinc-950/50 rounded-3xl border border-zinc-800/50 grid lg:grid-cols-3 gap-8">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-3"><MessageSquare size={14} className="text-orange-500" /> Customer message</span>
                                <p className="text-sm text-zinc-300 italic leading-relaxed border-l-2 border-orange-500/30 pl-4">{b.message || "No message provided."}</p>
                                <div className="mt-5 space-y-2 text-xs">
                                  <Row k="Category" v={b.bookingType || "General"} />
                                  <Row k="Preferred time" v={b.time || "—"} />
                                  <Row k="Per person" v={b.pricePerPerson ? `$${b.pricePerPerson}` : "—"} />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Manage</span>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[10px] text-zinc-500 uppercase font-bold">Payment</label>
                                    <select value={b.paymentStatus} onChange={(e) => patch(b._id, { paymentStatus: e.target.value }, "Payment updated")} className="w-full mt-1 p-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm outline-none">
                                      <option value="unpaid">Unpaid</option><option value="deposit">Deposit paid</option><option value="paid">Fully paid</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-[10px] text-zinc-500 uppercase font-bold">Amount paid ($)</label>
                                    <input type="number" value={d.amountPaid} onChange={(e) => setDraft(b, { amountPaid: e.target.value })} className="w-full mt-1 p-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm outline-none" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Assigned driver</label>
                                  <input value={d.assignedDriver} onChange={(e) => setDraft(b, { assignedDriver: e.target.value })} placeholder="Driver name" className="w-full mt-1 p-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm outline-none" />
                                </div>
                                <div>
                                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Internal notes (private)</label>
                                  <textarea rows={3} value={d.internalNotes} onChange={(e) => setDraft(b, { internalNotes: e.target.value })} placeholder="Pickup hotel, special requests, follow-ups…" className="w-full mt-1 p-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm outline-none" />
                                </div>
                                <button onClick={() => saveDetails(b)} disabled={savingId === b._id} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-xl text-sm font-bold disabled:opacity-60">
                                  {savingId === b._id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save details
                                </button>
                              </div>

                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-3">Activity</span>
                                <ol className="space-y-3 border-l border-zinc-800 pl-4">
                                  <li className="text-xs text-zinc-400"><span className="text-zinc-600 block">{b.createdAt ? new Date(b.createdAt).toLocaleString() : ""}</span>Booking request received</li>
                                  {b.history.map((h, i) => (
                                    <li key={i} className="text-xs text-zinc-400"><span className="text-zinc-600 block">{new Date(h.at).toLocaleString()}</span>{h.action}</li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <Search size={36} className="text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 font-serif italic text-xl">No bookings found.</p>
              <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="mt-4 text-orange-500 text-xs font-bold uppercase tracking-widest hover:underline">Clear filters</button>
            </div>
          )}

          {pages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500">
              <span>{filtered.length} results · page {page} of {pages}</span>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-30">Prev</button>
                <button disabled={page === pages} onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-30">Next</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90">
          <div className="bg-zinc-900 max-w-sm w-full rounded-3xl p-8 border border-zinc-800">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-500/20"><Trash2 size={28} /></div>
            <h3 className="text-2xl font-serif font-bold text-center text-white mb-2">Delete booking?</h3>
            <p className="text-zinc-500 text-sm text-center mb-6">This action is permanent. Consider marking it “cancelled” instead.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-800">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700">{deleting ? "Deleting…" : "Yes, delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-zinc-800 pb-2">
      <span className="text-zinc-500">{k}</span>
      <span className="text-zinc-200 font-medium">{v}</span>
    </div>
  );
}
