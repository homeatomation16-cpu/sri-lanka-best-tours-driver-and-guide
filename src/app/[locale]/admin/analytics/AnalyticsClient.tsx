"use client";
import React, { useEffect, useState } from "react";
import { Eye, Users, Activity, TrendingUp, TrendingDown, Loader2, MousePointerClick } from "lucide-react";

const RANGES = [7, 30, 90];

export default function AnalyticsClient() {
  const [days, setDays] = useState(30);
  const [d, setD] = useState<any>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setD(null);
    setErr("");
    fetch(`/api/admin/analytics?days=${days}`)
      .then(async (r) => { const j = await r.json(); if (!r.ok) throw new Error(j.error); setD(j); })
      .catch((e) => setErr(e.message));
  }, [days]);

  const delta = (cur: number, prev: number) => (prev ? Math.round(((cur - prev) / prev) * 100) : null);

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-zinc-200">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 mt-10 md:mt-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Analytics</h1>
          <p className="text-zinc-500 text-sm">Visitors to your website (no personal data stored). Tracking started when this update was deployed.</p>
        </div>
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button key={r} onClick={() => setDays(r)} className={`px-4 py-2 rounded-xl text-sm font-bold ${days === r ? "bg-orange-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400"}`}>{r} days</button>
          ))}
        </div>
      </div>

      {err && <p className="text-red-400 text-sm">{err}</p>}
      {!d && !err && <div className="flex items-center gap-3 text-zinc-500 py-20 justify-center"><Loader2 className="animate-spin" /> Loading…</div>}

      {d && (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            <Stat icon={<Eye size={18} />} title="Page views" value={d.views.toLocaleString()} delta={delta(d.views, d.prevViews)} />
            <Stat icon={<Users size={18} />} title="Visitors" value={d.visitors.toLocaleString()} delta={delta(d.visitors, d.prevVisitors)} />
            <Stat icon={<Activity size={18} />} title="Online now" value={d.liveNow} />
            <Stat icon={<MousePointerClick size={18} />} title="Bookings + inquiries" value={d.bookings + d.inquiries} />
            <Stat icon={<TrendingUp size={18} />} title="Visitor → enquiry" value={`${d.conversion}%`} />
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 mb-6">
            <h3 className="font-bold text-white mb-6">Daily views <span className="text-zinc-500 font-normal text-xs">(bar = views, lighter part = visitors)</span></h3>
            <Chart series={d.series} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <List title="Top pages" rows={d.pages.map((r: any) => [r._id, r.views])} />
            <List title="Most viewed tours" rows={d.tours.map((r: any) => [r._id, r.views])} empty="No tour page views yet" />
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <List title="Devices" rows={d.devices.map((r: any) => [r._id, r.views])} />
            <List title="Languages" rows={d.locales.map((r: any) => [String(r._id).toUpperCase(), r.views])} />
            <List title="Where they came from" rows={d.referrers.map((r: any) => [r._id, r.views])} empty="Mostly direct visits" />
            <List title="Countries" rows={d.countries.map((r: any) => [r._id, r.views])} empty="Country is detected on Vercel / Cloudflare hosting" />
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ icon, title, value, delta }: any) {
  return (
    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
      <div className="mb-3 text-orange-500">{icon}</div>
      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{title}</p>
      <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
      {delta !== undefined && delta !== null && (
        <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {delta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {Math.abs(delta)}% vs previous period
        </p>
      )}
    </div>
  );
}

function Chart({ series }: { series: { date: string; views: number; visitors: number }[] }) {
  const max = Math.max(1, ...series.map((s) => s.views));
  const step = Math.ceil(series.length / 10);
  return (
    <div className="flex items-end gap-[3px] h-52 overflow-x-auto">
      {series.map((s, i) => (
        <div key={s.date} className="flex-1 min-w-[6px] h-full flex flex-col justify-end items-center group relative">
          <div className="absolute -top-1 hidden group-hover:block bg-zinc-800 border border-zinc-700 text-[11px] px-2 py-1 rounded-lg whitespace-nowrap z-10 -translate-y-full">{s.date}: {s.views} views · {s.visitors} visitors</div>
          <div className="w-full rounded-t bg-orange-500/40 relative" style={{ height: `${Math.max(2, (s.views / max) * 100)}%` }}>
            <div className="absolute bottom-0 w-full rounded-t bg-orange-500" style={{ height: s.views ? `${(s.visitors / s.views) * 100}%` : 0 }} />
          </div>
          <span className="text-[9px] text-zinc-600 mt-1 h-3">{i % step === 0 ? s.date.slice(5) : ""}</span>
        </div>
      ))}
    </div>
  );
}

function List({ title, rows, empty = "No data yet" }: { title: string; rows: [string, number][]; empty?: string }) {
  const max = rows[0]?.[1] || 1;
  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
      <h3 className="font-bold text-white mb-5 text-sm">{title}</h3>
      {rows.length === 0 ? <p className="text-zinc-500 text-sm">{empty}</p> : (
        <ul className="space-y-3.5">
          {rows.map(([name, n]) => (
            <li key={name}>
              <div className="flex justify-between text-sm mb-1"><span className="truncate pr-3 text-zinc-300">{name}</span><span className="font-bold text-orange-400">{n}</span></div>
              <div className="h-1.5 bg-zinc-800 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{ width: `${(n / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
