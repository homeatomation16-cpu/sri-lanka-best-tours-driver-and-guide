"use client";

import React, { useState, useMemo } from "react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  Search, Download, Trash2, Calendar, Users,
  TrendingUp, Clock, ChevronDown, Check,
  Mail, Phone, MessageSquare, LogOut
} from "lucide-react";

type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
  notes: string;
  itemName: string;
  bookingType: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

const STATUS_STYLES = {
  pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminDashboardClient({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Booking["status"]>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const params = useParams();
  const locale = params?.locale || "en";

  // --- Stats Calculation ---
  const today = new Date().toDateString();
  const stats = useMemo(() => {
    const todayCount = bookings.filter(b => new Date(b.createdAt).toDateString() === today).length;
    const confirmed = bookings.filter(b => b.status === "confirmed").length;
    const pending = bookings.filter(b => b.status === "pending").length;
    return { total: bookings.length, today: todayCount, confirmed, pending };
  }, [bookings]);

  // --- Filtered list ---
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch = 
        b.name.toLowerCase().includes(search.toLowerCase()) || 
        b.email.toLowerCase().includes(search.toLowerCase()) || 
        b.phone.includes(search);
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  // --- Actions ---
  const updateStatus = async (id: string, status: Booking["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/booking/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== deleteId));
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Travel Date", "Item", "Status", "Created At"];
    const rows = filtered.map(b => [
      `"${b.name}"`, `"${b.email}"`, `"${b.phone}"`, `"${b.date}"`, `"${b.itemName}"`, `"${b.status}"`, `"${new Date(b.createdAt).toLocaleDateString()}"`
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen font-sans text-zinc-200 pb-20">
      
      {/* --- PAGE HEADER (Not fixed anymore to avoid sidebar overlap) --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
            <Calendar size={24} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">Booking Requests</h1>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Manage your customer inquiries</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:bg-zinc-800 transition-all active:scale-95">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <main className="px-4">
        
        {/* --- STATS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Bookings", value: stats.total, icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "New Today", value: stats.today, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Confirmed", value: stats.confirmed, icon: Check, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Pending", value: stats.pending, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((s, i) => (
            <div key={i} className="bg-zinc-900/50 p-6 rounded-4xlrder border-zinc-800/50 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{s.label}</span>
                <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}>
                  <s.icon size={18} />
                </div>
              </div>
              <div className="text-4xl font-serif font-bold text-white tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>

        {/* --- SEARCH & FILTERS --- */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="w-full pl-12 pr-10 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all text-zinc-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
            {["all", "pending", "confirmed", "cancelled"].map((f) => (
              <button 
                key={f}
                onClick={() => setStatusFilter(f as any)}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all
                  ${statusFilter === f ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-zinc-900/50 rounded-[40px] border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-800/40 border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5 text-center">Date</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filtered.map((b) => (
                  <React.Fragment key={b._id}>
                    <tr className={`transition-colors ${expandedId === b._id ? 'bg-zinc-800/20' : 'hover:bg-zinc-800/40'}`}>
                      <td className="px-8 py-6">
                        <div className="font-bold text-white text-lg">{b.name}</div>
                        <button 
                          onClick={() => setExpandedId(expandedId === b._id ? null : b._id)}
                          className="text-[11px] font-bold text-orange-500 mt-2 flex items-center gap-1 hover:text-orange-400 uppercase tracking-wider transition-colors"
                        >
                          {expandedId === b._id ? 'Close Details' : 'View Requirements'}
                          <ChevronDown size={12} className={`transition-transform duration-300 ${expandedId === b._id ? 'rotate-180' : ''}`} />
                        </button>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1.5">
                          <span className="flex items-center gap-2.5 text-sm text-zinc-300 font-medium leading-none"><Mail size={14} className="text-zinc-600" /> {b.email}</span>
                          <span className="flex items-center gap-2.5 text-sm text-zinc-500 leading-none"><Phone size={14} className="text-zinc-600" /> {b.phone || '—'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold border border-zinc-700/50">{b.date || '—'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="relative max-w-35 mx-auto">
                          <select 
                            value={b.status} 
                            onChange={(e) => updateStatus(b._id, e.target.value as any)}
                            disabled={updatingId === b._id}
                            className={`w-full appearance-none px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer outline-none bg-transparent text-center
                              ${STATUS_STYLES[b.status]} ${updatingId === b._id ? 'opacity-50' : ''}`}
                          >
                            <option value="pending" className="bg-zinc-950">Pending</option>
                            <option value="confirmed" className="bg-zinc-950">Confirmed</option>
                            <option value="cancelled" className="bg-zinc-950">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <a href={`mailto:${b.email}`} className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center border border-zinc-700/50 active:scale-90">
                            <Mail size={16} />
                          </a>
                          <button 
                            onClick={() => setDeleteId(b._id)}
                            className="w-10 h-10 rounded-xl bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-zinc-700/50 active:scale-90"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* DETAILS PANEL */}
                    {expandedId === b._id && (
                      <tr>
                        <td colSpan={5} className="px-8 py-0">
                          <div className="mb-6 mt-2 p-8 bg-zinc-950/50 rounded-4xl border border-zinc-800/50 shadow-inner animate-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <MessageSquare size={16} className="text-orange-500" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Inquiry Message</span>
                                </div>
                                <p className="text-sm text-zinc-300 italic leading-relaxed border-l-2 border-orange-500/30 pl-6 py-1">
                                  "{b.message || 'No message provided.'}"
                                </p>
                              </div>
                              <div className="bg-zinc-900/80 p-6 rounded-3xl border border-zinc-800/30">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-4">Request Specs</span>
                                <div className="space-y-3 text-xs">
                                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                                    <span className="text-zinc-500">Category:</span>
                                    <span className="text-orange-400 font-bold uppercase tracking-wider">{b.bookingType || 'General'}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                                    <span className="text-zinc-500">Item Name:</span>
                                    <span className="text-zinc-200 font-medium">{b.itemName || '—'}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                                    <span className="text-zinc-500">Preferred Time:</span>
                                    <span className="text-zinc-200 font-medium">{b.time || '—'}</span>
                                  </div>
                                  <div className="mt-4">
                                    <span className="text-zinc-600 block mb-1 uppercase tracking-tighter font-black text-[9px]">Internal Notes</span>
                                    <p className="text-zinc-400 italic bg-black/20 p-3 rounded-lg border border-zinc-800/50">
                                      {b.notes || 'No internal notes added yet.'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-32 text-center bg-zinc-900/20">
              <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800/50">
                <Search size={40} className="text-zinc-700" />
              </div>
              <p className="text-zinc-500 font-serif italic text-xl">No results found for your search.</p>
              <button onClick={() => {setSearch(""); setStatusFilter("all");}} className="mt-4 text-orange-500 text-xs font-bold uppercase tracking-widest hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </main>

      {/* --- DELETE MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 max-w-sm w-full rounded-[40px] p-10 border border-zinc-800 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-center text-white mb-3">Confirm Deletion?</h3>
            <p className="text-zinc-500 text-sm text-center mb-8 leading-relaxed">
              Are you sure you want to delete this record? This action is permanent.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-4 px-4 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-800 transition-colors">Cancel</button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-4 px-4 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
              >
                {deleting ? 'Processing...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}