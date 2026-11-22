"use client";

// Sign in / create account / forgot password / reset password / confirm e-mail.
// `embedded` = shown in the navbar dropdown: switching between sign in, sign up and forgot password happens in place.
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import GoogleButton from "./GoogleButton";

export type AuthMode = "login" | "register" | "forgot" | "reset" | "verify";

const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";
const label = "mb-1 block text-sm font-semibold text-slate-700";
const linkBtn = "font-semibold text-emerald-800 hover:underline";

export default function AuthForm({ mode: initialMode, embedded = false, onSignedIn }: { mode: AuthMode; embedded?: boolean; onSignedIn?: () => void }) {
  const t = useTranslations("account");
  const locale = useLocale();
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const verifyStarted = useRef(false);

  // After sign in (password or Google): stay on the page in the dropdown, otherwise open My account
  const afterSignIn = useCallback(() => {
    if (embedded) onSignedIn?.();
    else router.replace("/account");
    router.refresh();
  }, [embedded, onSignedIn, router]);

  async function call(action: string, payload: object) {
    const res = await fetch(`/api/customer/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, locale }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "errorGeneric");
    return data;
  }

  const message = (key: string) => (t.has(key) ? t(key) : t("errorGeneric"));

  // Confirm e-mail as soon as the page opens with a token
  useEffect(() => {
    if (mode !== "verify" || verifyStarted.current) return;
    verifyStarted.current = true;
    call("verify-email", { token })
      .then(() => setDone(t("verifyDone")))
      .catch(() => setError(t("verifyInvalid")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, token]);

  function switchTo(next: AuthMode) {
    setMode(next);
    setError("");
    setDone("");
  }

  // In the dropdown the mode changes in place; on the full pages it is a link to the other page
  function modeLink(to: "login" | "register" | "forgot", children: React.ReactNode) {
    if (embedded) return <button type="button" onClick={() => switchTo(to)} className={linkBtn}>{children}</button>;
    const href = to === "login" ? "/account/login" : to === "register" ? "/account/register" : "/account/forgot-password";
    return <Link href={href} className={linkBtn}>{children}</Link>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setError("");
    if (mode === "reset" && form.password !== form.confirm) return setError(t("passwordsDontMatch"));
    setBusy(true);
    try {
      if (mode === "login" || mode === "register") {
        if (mode === "login") await call("login", { email: form.email, password: form.password });
        else await call("register", { name: form.name, email: form.email, password: form.password });
        afterSignIn();
      } else if (mode === "forgot") {
        await call("forgot-password", { email: form.email });
        setDone(t("resetSent", { email: form.email }));
      } else if (mode === "reset") {
        await call("reset-password", { token, password: form.password });
        setDone(t("resetDone"));
      }
    } catch (err) {
      setError(err instanceof TypeError ? t("errorNetwork") : message((err as Error).message));
    } finally {
      setBusy(false);
    }
  }

  const titles: Record<AuthMode, [string, string]> = {
    login: [t("loginTitle"), t("loginSubtitle")],
    register: [t("registerTitle"), t("registerSubtitle")],
    forgot: [t("forgotTitle"), t("forgotSubtitle")],
    reset: [t("resetTitle"), ""],
    verify: [t("verifyTitle"), ""],
  };
  const [title, subtitle] = titles[mode];

  return (
    <div className={embedded ? "w-full" : "mx-auto w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9"}>
      <h2 className={`font-playfair text-slate-900 ${embedded ? "text-2xl" : "text-3xl"}`}>{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>}

      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {done ? (
        <div className="mt-5 text-center" role="status">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-600" aria-hidden />
          <p className="text-slate-700">{done}</p>
          <div className="mt-5">
            {mode === "verify" ? <Link href="/account" className={linkBtn}>{t("myAccount")}</Link> : modeLink("login", t("backToSignIn"))}
          </div>
        </div>
      ) : mode === "verify" ? (
        !error && <Loader2 className="mx-auto mt-8 h-8 w-8 animate-spin text-emerald-700" aria-label={t("loading")} />
      ) : mode === "reset" && !token ? (
        <div className="mt-6">
          <p className="text-slate-700">{t("resetInvalid")}</p>
          <div className="mt-4">{modeLink("forgot", t("requestNewLink"))}</div>
        </div>
      ) : (
        <form key={mode} onSubmit={onSubmit} className="mt-5 space-y-3.5">
          {mode === "register" && (
            <div>
              <label className={label} htmlFor={`acc-name-${embedded}`}>{t("name")}</label>
              <input id={`acc-name-${embedded}`} name="name" required maxLength={120} autoComplete="name" className={input} />
            </div>
          )}
          {mode !== "reset" && (
            <div>
              <label className={label} htmlFor={`acc-email-${embedded}`}>{t("email")}</label>
              <input id={`acc-email-${embedded}`} name="email" type="email" required autoComplete="email" className={input} />
            </div>
          )}
          {mode !== "forgot" && (
            <div>
              <div className="flex items-center justify-between gap-2">
                <label className={label} htmlFor={`acc-password-${embedded}`}>{mode === "reset" ? t("newPassword") : t("password")}</label>
                {mode === "login" && <span className="mb-1 text-xs">{modeLink("forgot", t("forgotPassword"))}</span>}
              </div>
              <input
                id={`acc-password-${embedded}`}
                name="password"
                type="password"
                required
                minLength={mode === "login" ? 1 : 8}
                pattern={mode === "login" ? undefined : "(?=.*[A-Za-z])(?=.*\\d).{8,}"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className={input}
              />
              {mode !== "login" && <p className="mt-1 text-xs text-slate-500">{t("passwordRule")}</p>}
            </div>
          )}
          {mode === "reset" && (
            <div>
              <label className={label} htmlFor="acc-confirm">{t("confirmPassword")}</label>
              <input id="acc-confirm" name="confirm" type="password" required autoComplete="new-password" className={input} />
            </div>
          )}

          <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-emerald-950 disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {mode === "login" ? t("signIn") : mode === "register" ? t("createAccount") : mode === "forgot" ? t("sendResetLink") : t("updatePassword")}
          </button>

          <p className="pt-1 text-center text-sm text-slate-600">
            {mode === "login" && <>{t("noAccount")} {modeLink("register", t("createAccount"))}</>}
            {mode === "register" && <>{t("haveAccount")} {modeLink("login", t("signIn"))}</>}
            {(mode === "forgot" || mode === "reset") && modeLink("login", t("backToSignIn"))}
          </p>
          {(mode === "login" || mode === "register") && <GoogleButton onSuccess={afterSignIn} signUp={mode === "register"} />}
          {(mode === "login" || mode === "register") && <p className="text-center text-xs text-slate-500">{t("guestNote")}</p>}
        </form>
      )}
    </div>
  );
}
