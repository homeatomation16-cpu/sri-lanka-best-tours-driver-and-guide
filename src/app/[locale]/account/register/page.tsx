import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/account/AuthForm";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Dark band keeps the navbar readable (no hero image on account pages)
export default function Page() {
  return (
    <section className="min-h-[80vh] bg-[#0b2a22] px-6 pb-20 pt-32 sm:pt-36">
      <Suspense>
        <AuthForm mode="register" />
      </Suspense>
    </section>
  );
}
