"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type T = { id: number; type: "success" | "error"; msg: string };
const Ctx = createContext<(msg: string, type?: "success" | "error") => void>(() => {});

export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<T[]>([]);
  const push = useCallback((msg: string, type: "success" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setItems((p) => [...p, { id, type, msg }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200] space-y-2">
        {items.map((t) => (
          <div key={t.id} className={`flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl border shadow-2xl text-sm font-semibold backdrop-blur ${t.type === "success" ? "bg-emerald-950/90 border-emerald-700 text-emerald-300" : "bg-red-950/90 border-red-700 text-red-300"}`}>
            {t.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="max-w-xs">{t.msg}</span>
            <button onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}><X size={14} /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
