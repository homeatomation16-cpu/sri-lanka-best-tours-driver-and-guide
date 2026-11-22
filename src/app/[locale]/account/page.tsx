// My account: greeting, e-mail confirmation notice and the customer's bookings (only after the e-mail is confirmed,
// because bookings are matched by e-mail address).
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { redirect } from "@/i18n/navigation";
import { getCurrentCustomer } from "@/lib/customerAuth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import AccountActions from "@/components/account/AccountActions";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-slate-200 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const customer = await getCurrentCustomer();
  if (!customer) redirect({ href: "/account/login", locale });
  const me = customer!;
  const t = await getTranslations({ locale, namespace: "account" });

  let bookings: any[] = [];
  if (me.emailVerified) {
    await connectDB();
    bookings = await Booking.find({ email: new RegExp(`^${me.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
  }
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const statusLabel = (status: string) => (status === "pending" ? t("status_pending") : t.has(`status_${status}`) ? t(`status_${status}`) : status);

  return (
    <main className="min-h-screen bg-[#f9f7f2]">
      <section className="bg-[#0b2a22] px-6 pb-14 pt-32 text-white sm:pt-36">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{t("myAccount")}</p>
            <h1 className="mt-2 font-playfair text-4xl">{t("hello", { name: me.name })}</h1>
            <p className="mt-2 max-w-xl text-white/75">{t("accountIntro")}</p>
            <p className="mt-3 text-sm text-white/60">{me.email} · {t("memberSince")} {dateFmt.format(new Date(me.createdAt))}</p>
          </div>
          <AccountActions verified={me.emailVerified} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="font-playfair text-3xl text-slate-900">{t("myBookings")}</h2>
        <p className="mt-1 text-slate-600">{t("myBookingsIntro")}</p>

        {!me.emailVerified ? (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">{t("verifyPending", { email: me.email })}</div>
        ) : bookings.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">{t("noBookings")}</p>
            <p className="mt-2 text-slate-600">{t("noBookingsHint")}</p>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {bookings.map((b) => (
              <li key={String(b._id)} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{b.itemName || "Tour"}</p>
                    <p className="mt-1 text-sm text-slate-500">{t("requestedOn", { date: dateFmt.format(new Date(b.createdAt)) })}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[b.status] || STATUS_STYLE.pending}`}>{statusLabel(b.status)}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                  {b.date && <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-amber-600" aria-hidden />{b.date}{b.endDate ? ` → ${b.endDate}` : ""}</span>}
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-amber-600" aria-hidden />{t("travellers", { adults: b.adults ?? b.people ?? 1, children: b.children ?? 0 })}</span>
                  {b.totalPrice > 0 && <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-amber-600" aria-hidden />{t("quote")}: ${b.totalPrice}</span>}
                </div>
                {b.status === "cancelled" && <p className="mt-3 text-sm text-red-700">{t("cancelledNote")}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
