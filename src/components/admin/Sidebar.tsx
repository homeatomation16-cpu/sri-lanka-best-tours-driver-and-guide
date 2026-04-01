"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Map, Settings, Car } from "lucide-react";

export default function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: `/${locale}/admin`, icon: LayoutDashboard },
    { name: "Bookings", href: `/${locale}/admin/bookings`, icon: CalendarCheck },
    { name: "Tours", href: `/${locale}/admin/tours`, icon: Map },
    { name: "Vehicles", href: `/${locale}/admin/vehicles`, icon: Car },
    { name: "Settings", href: `/${locale}/admin/settings`, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 hidden md:block">
      <div className="p-8 font-serif text-2xl font-bold text-orange-500">Admin</div>
      <nav className="mt-4 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20" 
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}