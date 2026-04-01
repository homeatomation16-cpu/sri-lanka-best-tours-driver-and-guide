// src/app/[locale]/admin/layout.tsx

import Sidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // මෙතැන Promise එකක් බව සඳහන් කරන්න
}) {
  // params ටික await කරලා ගන්න
  const { locale } = await params; 
  
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/${locale}/login`); 
  }

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <Sidebar locale={locale} />
      <div className="flex-1 overflow-y-auto pt-24">
        {children}
      </div>
    </div>
  );
}