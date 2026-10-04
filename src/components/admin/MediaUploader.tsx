"use client";
import React, { useRef, useState } from "react";
import { UploadCloud, Loader2, Link2, Film, X } from "lucide-react";

/**
 * Upload ONE image or video.
 *  - Cloudinary configured  -> browser uploads directly (works for big videos)
 *  - otherwise images only  -> /api/admin/upload (MongoDB), videos need a pasted URL
 */
async function uploadMedia(file: File, folder: string): Promise<string> {
  const isVideo = file.type.startsWith("video/");
  const sign = await fetch(`/api/admin/upload/sign?folder=${folder}`).then((r) => r.json()).catch(() => ({}));

  if (sign?.configured) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sign.apiKey);
    fd.append("timestamp", sign.timestamp);
    fd.append("signature", sign.signature);
    fd.append("folder", sign.folder);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloud}/${isVideo ? "video" : "image"}/upload`, { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");
    return json.secure_url as string;
  }

  if (isVideo) throw new Error("Video upload needs CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET in .env – or paste a video URL below.");
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json.url as string;
}

type Props = {
  value: string;
  onChange: (url: string, kind: "image" | "video") => void;
  accept?: "image" | "video" | "both";
  folder?: string;
  onError?: (m: string) => void;
  compact?: boolean;
};

const isVideoUrl = (u: string) => /\.(mp4|mov|webm|m4v)(\?|$)/i.test(u) || u.includes("/video/upload/");

export default function MediaUploader({ value, onChange, accept = "image", folder = "site", onError, compact }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");

  const acceptAttr = accept === "image" ? "image/*" : accept === "video" ? "video/*" : "image/*,video/*";

  const go = async (f?: File | null) => {
    if (!f) return;
    setBusy(true);
    try {
      const u = await uploadMedia(f, folder);
      onChange(u, f.type.startsWith("video/") ? "video" : "image");
    } catch (e: any) {
      onError?.(e.message);
    } finally {
      setBusy(false);
    }
  };

  const addUrl = () => {
    const u = url.trim();
    if (!u) return;
    onChange(u, isVideoUrl(u) ? "video" : "image");
    setUrl("");
  };

  const preview = value ? (
    <div className={`relative rounded-xl overflow-hidden border border-zinc-700 bg-black ${compact ? "h-28" : "h-44"} w-full`}>
      {isVideoUrl(value) ? (
        <video src={value} muted playsInline preload="metadata" className="w-full h-full object-cover" onMouseEnter={(e) => e.currentTarget.play().catch(() => {})} onMouseLeave={(e) => e.currentTarget.pause()} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-full h-full object-cover" />
      )}
      {isVideoUrl(value) && <span className="absolute top-2 left-2 text-[10px] font-black uppercase bg-black/70 text-white px-2 py-0.5 rounded-full flex items-center gap-1"><Film size={10} /> video</span>}
      <button type="button" onClick={() => onChange("", "image")} className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900/90 text-red-400 hover:bg-red-500 hover:text-white"><X size={14} /></button>
    </div>
  ) : null;

  return (
    <div className="space-y-2">
      {preview}
      {!value && (
        <button type="button" onClick={() => ref.current?.click()} className={`w-full border-2 border-dashed border-zinc-700 hover:border-orange-500/60 bg-zinc-800/40 rounded-2xl text-center ${compact ? "py-5" : "py-8"}`}>
          {busy ? (
            <span className="flex items-center justify-center gap-2 text-orange-400 text-sm font-semibold"><Loader2 className="animate-spin" size={18} /> Uploading…</span>
          ) : (
            <>
              <UploadCloud className="mx-auto text-orange-500 mb-1" size={24} />
              <span className="text-sm text-zinc-300 font-semibold">Click to upload {accept === "video" ? "a video" : accept === "both" ? "image or video" : "an image"}</span>
            </>
          )}
        </button>
      )}
      <input ref={ref} type="file" accept={acceptAttr} className="hidden" onChange={(e) => { go(e.target.files?.[0]); e.target.value = ""; }} />
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }} placeholder="…or paste URL / path (/gallery/x.jpg)" className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:border-orange-500/50" />
        </div>
        <button type="button" onClick={addUrl} className="px-3 py-2 text-xs font-bold bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700">Use</button>
      </div>
    </div>
  );
}
