"use client";

// Admin → Website users: accounts that signed up on the website (password or Google).
import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheck, CalendarCheck, LogOut, Search, Trash2, UserCog, Users } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

type U = { id: string; name: string; email: string; emailVerified: boolean; google: boolean; createdAt: string; lastLoginAt: string | null; bookings: number };

const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—");

export default function UsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState<U[] | null>(null);
  const [week, setWeek] = useState(0);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "verified" | "unverified" | "google">("all");

  const load = useCallback(() => {
    fetch("/api/admin/users", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { const list: U[] = d.users ?? []; const now = Date.now(); setUsers(list); setWeek(list.filter((u) => now - new Date(u.createdAt).getTime() < 7 * 86400000).length); })
      .catch(() => setUsers([]));
  }, []);
  useEffect(load, [load]);

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return (users ?? []).filter(
      (u) =>
        (!s || u.name.toLowerCase().includes(s) || u.email.includes(s)) &&
        (filter === "all" || (filter === "verified" && u.emailVerified) || (filter === "unverified" && !u.emailVerified) || (filter === "google" && u.google))
    );
  }, [users, q, filter]);

  async function act(user: U, action: "verify" | "signout" | "delete") {
    if (action === "delete" && !confirm(`Delete the account of ${user.name} (${user.email})? Their bookings are kept.`)) return;
    const res =
      action === "delete"
        ? await fetch(`/api/admin/users?id=${user.id}`, { method: "DELETE" })
        : await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: user.id, action }) });
    if (!res.ok) return toast("Action failed", "error");
    toast(action === "delete" ? "Account deleted" : action === "verify" ? "E-mail marked as confirmed" : "User signed out everywhere");
    load();
  }

  const all = users ?? [];

  return (
    <div className="p-4 md:p-8 min-h-screen text-zinc-200">
      <div className="mb-8 mt-10 md:mt-0">
        <h1 className="text-3xl font-serif font-bold text-white">Website users</h1>
        <p className="text-zinc-500 text-sm">People who created an account on the website (e-mail or Google)</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l: "Accounts", v: all.length, i: Users },
          { l: "New this week", v: week, i: UserCog },
          { l: "E-mail confirmed", v: all.filter((u) => u.emailVerified).length, i: BadgeCheck },
          { l: "With bookings", v: all.filter((u) => u.bookings > 0).length, i: CalendarCheck },
        ].map((s) => (
          <div key={s.l} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <s.i size={18} className="text-orange-500 mb-2" />
            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{s.l}</p>
            <p className="text-2xl font-bold text-white">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="relative flex-1 min-w-60">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or e-mail…" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-600" />
        </label>
        {(["all", "verified", "unverified", "google"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-xl text-sm font-semibold capitalize ${filter === f ? "bg-orange-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"}`}>
            {f === "unverified" ? "Not confirmed" : f}
          </button>
        ))}
      </div>

      {users === null ? (
        <p className="text-zinc-500">Loading…</p>
      ) : list.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-zinc-500">No accounts match.</div>
      ) : (
        <div className="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Sign-in</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Last sign-in</th>
                <th className="p-4">Bookings</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="border-b border-zinc-800/60 last:border-0">
                  <td className="p-4">
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-zinc-500">{u.email}</p>
                  </td>
                  <td className="p-4">
                    <span className="mr-2 text-zinc-400">{u.google ? "Google" : "E-mail"}</span>
                    {u.emailVerified ? <span className="text-emerald-400 text-xs font-semibold">confirmed</span> : <span className="text-orange-400 text-xs font-semibold">not confirmed</span>}
                  </td>
                  <td className="p-4 text-zinc-400">{day(u.createdAt)}</td>
                  <td className="p-4 text-zinc-400">{day(u.lastLoginAt)}</td>
                  <td className="p-4 text-white font-semibold">{u.bookings}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      {!u.emailVerified && (
                        <button onClick={() => act(u, "verify")} title="Mark e-mail as confirmed" className="p-2 rounded-lg bg-zinc-800 hover:bg-emerald-900 text-emerald-400"><BadgeCheck size={16} /></button>
                      )}
                      <button onClick={() => act(u, "signout")} title="Sign out on all devices" className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"><LogOut size={16} /></button>
                      <button onClick={() => act(u, "delete")} title="Delete account" className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900 text-red-400"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
