"use client";

// Sign-out button and "resend confirmation e-mail" on the account page.
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AccountActions({ verified }: { verified: boolean }) {
  const t = useTranslations("account");
  const locale = useLocale();
  const router = useRouter();
  const [sent, setSent] = useState("");

  async function signOut() {
    await fetch("/api/customer/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  async function resend() {
    const res = await fetch("/api/customer/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    setSent(res.ok ? t("verifySent") : t("rateLimited"));
  }

  return (
    <div className="flex flex-col items-start gap-3 sm:items-end">
      <button type="button" onClick={signOut} className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0b2a22]">
        {t("signOut")}
      </button>
      {!verified && (
        sent ? <p className="text-sm text-amber-300" role="status">{sent}</p> : (
          <button type="button" onClick={resend} className="text-sm font-semibold text-amber-300 underline-offset-4 hover:underline">
            {t("resendVerification")}
          </button>
        )
      )}
    </div>
  );
}
