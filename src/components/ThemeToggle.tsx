"use client";

// Navbar button that switches the website between light and dark (remembered for a year).
// Only shown when Admin → Theme allows visitors to choose.
import { createContext, useContext, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_COOKIE, type ThemeMode } from "@/lib/themeDefaults";

const ModeCtx = createContext<ThemeMode>("visitor");
export const ThemeModeProvider = ModeCtx.Provider;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.dataset.theme === "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const mode = useContext(ModeCtx);
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  if (mode !== "visitor") return null;

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Light mode" : "Dark mode"} title={dark ? "Light mode" : "Dark mode"} className={className}>
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
