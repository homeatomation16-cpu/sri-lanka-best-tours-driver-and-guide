"use client";

// "Sign in with Google" button (Google Identity Services). Shown only when NEXT_PUBLIC_GOOGLE_CLIENT_ID is set.
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Google = {
  accounts: {
    id: {
      initialize: (config: { client_id: string; callback: (r: { credential: string }) => void; ux_mode?: string }) => void;
      renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
    };
  };
};
declare global {
  interface Window {
    google?: Google;
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.accounts) return resolve();
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("load")));
  });
}

export default function GoogleButton({ onSuccess, signUp = false }: { onSuccess: () => void; signUp?: boolean }) {
  const t = useTranslations("account");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: async ({ credential }) => {
            setError("");
            try {
              const res = await fetch("/api/customer/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential, locale }),
              });
              const data = await res.json().catch(() => ({}));
              if (!res.ok) throw new Error(data.error || "googleFailed");
              onSuccess();
            } catch (err) {
              const key = (err as Error).message;
              setError(t.has(key) ? t(key) : t("googleFailed"));
            }
          },
        });
        window.google.accounts.id.renderButton(ref.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: signUp ? "signup_with" : "signin_with",
          width: Math.min(ref.current.offsetWidth || 320, 400),
          locale,
        });
      })
      .catch(() => !cancelled && setError(t("googleFailed")));
    return () => {
      cancelled = true;
    };
  }, [locale, signUp, onSuccess, t]);

  if (!CLIENT_ID) return null;
  return (
    <div>
      <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        {t("or")}
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div ref={ref} className="flex min-h-11 justify-center" />
      {error && <p role="alert" className="mt-2 text-center text-sm text-red-700">{error}</p>}
    </div>
  );
}
