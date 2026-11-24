"use client";

// Navbar account button: opens a panel under the navbar with sign in / sign up, or – when signed in – the
// customer's name, a link to My account and Sign out. No separate page needed.
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { UserRound, X } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
// The closed account menu needs no form or Google sign-in JavaScript.
const AuthForm = lazy(() => import("./AuthForm"));

type Me = { name: string; email: string } | null;

export default function AccountMenu({ className }: { className: string }) {
  const t = useTranslations("account");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<Me | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loadMe = useCallback(() => {
    fetch("/api/customer/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setMe(d.customer ?? null))
      .catch(() => setMe(null));
  }, []);

  useEffect(() => {
    if (!open) return;
    loadMe();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, loadMe]);

  async function signOut() {
    await fetch("/api/customer/logout", { method: "POST" });
    setMe(null);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={t("myAccount")}
        title={t("myAccount")}
        aria-expanded={open}
        aria-controls="account-panel"
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        <UserRound size={18} />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="account-panel"
          role="dialog"
          aria-label={t("myAccount")}
          className="fixed inset-x-3 top-[76px] z-60 max-h-[calc(100vh-90px)] overflow-y-auto rounded-3xl border border-slate-100 bg-white p-6 text-start shadow-2xl sm:absolute sm:inset-x-auto sm:end-4 sm:top-full sm:mt-2 sm:w-[380px]"
        >
          <button type="button" onClick={() => setOpen(false)} aria-label={t("backToSignIn")} className="absolute end-3 top-3 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={18} />
          </button>

          {me === undefined ? (
            <p className="py-8 text-center text-sm text-slate-500">{t("loading")}</p>
          ) : me ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">{t("myAccount")}</p>
              <p className="mt-2 font-playfair text-2xl text-slate-900">{t("hello", { name: me.name })}</p>
              <p className="mt-1 break-all text-sm text-slate-500">{me.email}</p>
              <div className="mt-6 grid gap-2">
                <Link href="/account" onClick={() => setOpen(false)} className="rounded-full bg-emerald-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-amber-500 hover:text-emerald-950">
                  {t("myBookings")}
                </Link>
                <button type="button" onClick={signOut} className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                  {t("signOut")}
                </button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<p className="py-8 text-center text-sm text-slate-500" role="status">{t("loading")}</p>}>
              <AuthForm mode="login" embedded onSignedIn={loadMe} />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
}
