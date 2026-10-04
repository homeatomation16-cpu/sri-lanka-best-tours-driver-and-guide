import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

/**
 * POST multipart/form-data  { file: File, folder?: string }
 * -> { url }
 *
 * Storage:
 *  1. Cloudinary (if CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET are set)
 *  2. otherwise MongoDB (served from /api/media/:id) - works on any host.
 */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const form = await req.formData();
    const file = form.get("file");
    const folder = String(form.get("folder") || "tours").replace(/[^a-z0-9_-]/gi, "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP, AVIF or GIF images are allowed" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image is too large (max 8MB)" }, { status: 400 });
    }

    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    const key = process.env.CLOUDINARY_API_KEY;
    const secret = process.env.CLOUDINARY_API_SECRET;

    // ---------- 1) Cloudinary ----------
    if (cloud && key && secret) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const toSign = `folder=${folder}&timestamp=${timestamp}${secret}`;
      const signature = crypto.createHash("sha1").update(toSign).digest("hex");

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", key);
      body.append("timestamp", timestamp);
      body.append("folder", folder);
      body.append("signature", signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
        method: "POST",
        body,
      });
      const json = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: json?.error?.message || "Cloudinary upload failed" }, { status: 502 });
      }
      return NextResponse.json({ url: json.secure_url, storage: "cloudinary" });
    }

    // ---------- 2) MongoDB fallback ----------
    await connectDB();
    const buffer = Buffer.from(await file.arrayBuffer());
    const doc = await Media.create({
      filename: file.name,
      contentType: file.type,
      size: file.size,
      data: buffer,
    });
    return NextResponse.json({ url: `/api/media/${doc._id}`, storage: "mongodb" });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
