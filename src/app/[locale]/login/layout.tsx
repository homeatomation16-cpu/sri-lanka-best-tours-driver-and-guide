import type { Metadata } from "next";

// Admin sign-in: never indexed (the page itself is a client component, so its metadata lives here).
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
