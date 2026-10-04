import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/** Returns true when the current request has a valid admin session. */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session;
}

/**
 * Use at the top of every admin-only API handler:
 *   const denied = await requireAdmin(); if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Escape user supplied text before putting it in an HTML e-mail. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
