import { NextResponse } from "next/server";
import crypto from "crypto";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

/**
 * GET ?folder=hero  ->  signed params so the BROWSER uploads straight to Cloudinary.
 * Needed for videos (and big photos): hosting platforms reject request bodies > ~4.5 MB.
 */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret) {
    return NextResponse.json({ configured: false });
  }

  const folder = (new URL(req.url).searchParams.get("folder") || "site").replace(/[^a-z0-9_-]/gi, "");
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto.createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");

  return NextResponse.json({ configured: true, cloud, apiKey, timestamp, signature, folder });
}
