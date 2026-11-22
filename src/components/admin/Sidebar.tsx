"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, CalendarCheck, Map, Car, Users, MessageSquare, LogOut, Menu, X, Globe, LayoutTemplate, BarChart3, UserCog, Settings, Palette } from "lucide-react";

export default function Sidebar({ locale, newInquiries = 0, pendingBookings = 0, newUsers = 0 }: { locale: string; newInquiries?: number; pendingBookings?: number; newUsers?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const base = `/${locale}/admin`;
  // Grouped so each kind of work is easy to find
  const groups: { title: string; items: { name: string; href: string; icon: typeof LayoutDashboard; badge?: number; hint: string }[] }[] = [
    { title: "Overview", items: [
      { name: "Dashboard", href: base, icon: LayoutDashboard, hint: "Today at a glance" },
      { name: "Analytics", href: `${base}/analytics`, icon: BarChart3, hint: "Visitors, pages, countries" },
    ] },
    { title: "Bookings & leads", items: [
      { name: "Bookings", href: `${base}/bookings`, icon: CalendarCheck, badge: pendingBookings, hint: "Tour & excursion requests" },
      { name: "Inquiries", href: `${base}/inquiries`, icon: MessageSquare, badge: newInquiries, hint: "Contact & tailor-made forms" },
      { name: "Customers", href: `${base}/customers`, icon: Users, hint: "Everyone who booked" },
    ] },
    { title: "Users", items: [
      { name: "Website users", href: `${base}/users`, icon: UserCog, badge: newUsers, hint: "Accounts that signed up" },
    ] },
    { title: "Website", items: [
      { name: "Tours", href: `${base}/tours`, icon: Map, hint: "Packages, prices, itineraries" },
      { name: "Vehicles", href: `${base}/vehicles`, icon: Car, hint: "Fleet & rates" },
      { name: "Website Content", href: `${base}/content`, icon: LayoutTemplate, hint: "Hero, gallery, tailor-made" },
    ] },
    { title: "Settings", items: [
      { name: "Site settings", href: `${base}/settings`, icon: Settings, hint: "Contact details, social links" },
      { name: "Theme & colours", href: `${base}/theme`, icon: Palette, hint: "Presets, colours, dark mode" },
    ] },
  ];

  const nav = (
    <nav className="mt-4 px-4">
      {groups.map((group) => (
      <div key={group.title} className="mb-5">
      <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">{group.title}</p>
      <div className="space-y-1">
      {group.items.map((item) => {
        const isActive = item.href === base ? pathname === base : pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20" : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
            }`}
          >
            <item.icon size={18} className="shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block">{item.name}</span>
              <span className={`block truncate text-[11px] font-medium ${isActive ? "text-orange-100" : "text-zinc-600"}`}>{item.hint}</span>
            </span>
            {!!item.badge && <span className="text-[10px] font-black bg-white text-orange-600 rounded-full px-2 py-0.5">{item.badge}</span>}
          </Link>
        );
      })}
      </div>
      </div>
      ))}
      <div className="pt-4 mt-4 border-t border-zinc-800 space-y-2">
        <Link href={`/${locale}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300">
          <Globe size={18} /> View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="w-64 shrink-0 bg-zinc-950 border-r border-zinc-800 hidden md:block pt-24 sticky top-0 h-screen overflow-y-auto">
        <div className="px-8 pb-2 font-serif text-2xl font-bold text-orange-500">Admin CRM</div>
        {nav}
      </aside>

      {/* Mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-24 left-3 z-40 p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 shadow-lg"
        aria-label="Open admin menu"
      >
        <Menu size={20} />
      </button>
      {open && (
        <div className="md:hidden fixed inset-0 z-[90] flex">
          <div className="w-72 bg-zinc-950 border-r border-zinc-800 pt-6 overflow-y-auto">
            <div className="px-8 pb-2 flex items-center justify-between font-serif text-2xl font-bold text-orange-500">
              Admin CRM
              <button onClick={() => setOpen(false)} className="text-zinc-400"><X size={22} /></button>
            </div>
            {nav}
          </div>
          <div className="flex-1 bg-black/70" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
