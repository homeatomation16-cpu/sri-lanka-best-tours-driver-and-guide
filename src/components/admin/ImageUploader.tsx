"use client";
import React, { useRef, useState } from "react";
import { UploadCloud, X, Loader2, Star, Link2 } from "lucide-react";

async function uploadFile(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json.url as string;
}

type Props = {
  /** current image URL(s) */
  value: string | string[];
  onChange: (v: any) => void;
  multiple?: boolean;
  folder?: string;
  label?: string;
  onError?: (msg: string) => void;
};

/** Drag & drop / click-to-upload image field. Single (cover) or multiple (gallery). */
export default function ImageUploader({ value, onChange, multiple = false, folder = "tours", label, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(0);
  const [drag, setDrag] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const images: string[] = multiple ? ((value as string[]) || []) : value ? [value as string] : [];

  const handleFiles = async (files: FileList | File[] | null) => {
    if (!files || !files.length) return;
    const list = Array.from(files).slice(0, multiple ? 12 : 1);
    setBusy((b) => b + list.length);
    const uploaded: string[] = [];
    for (const f of list) {
      try {
        uploaded.push(await uploadFile(f, folder));
      } catch (e: any) {
        onError?.(`${f.name}: ${e.message}`);
      } finally {
        setBusy((b) => b - 1);
      }
    }
    if (!uploaded.length) return;
    if (multiple) onChange([...images, ...uploaded]);
    else onChange(uploaded[0]);
  };

  const remove = (i: number) => {
    if (multiple) onChange(images.filter((_, idx) => idx !== i));
    else onChange("");
  };

  const makeFirst = (i: number) => {
    const copy = [...images];
    const [item] = copy.splice(i, 1);
    onChange([item, ...copy]);
  };

  const addUrl = () => {
    const u = urlInput.trim();
    if (!u) return;
    if (multiple) onChange([...images, u]);
    else onChange(u);
    setUrlInput("");
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{label}</label>}

      {images.length > 0 && (
        <div className={multiple ? "grid grid-cols-2 sm:grid-cols-4 gap-3" : ""}>
          {images.map((src, i) => (
            <div key={src + i} className={`relative group rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800 ${multiple ? "aspect-square" : "h-48 w-full"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-start justify-end gap-1 p-2">
                {multiple && i !== 0 && (
                  <button type="button" onClick={() => makeFirst(i)} title="Move to first" className="p-1.5 rounded-lg bg-zinc-900/90 text-amber-400 hover:bg-amber-500 hover:text-white">
                    <Star size={14} />
                  </button>
                )}
                <button type="button" onClick={() => remove(i)} title="Remove" className="p-1.5 rounded-lg bg-zinc-900/90 text-red-400 hover:bg-red-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              {multiple && i === 0 && <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-orange-600 text-white px-2 py-0.5 rounded-full">First</span>}
            </div>
          ))}
        </div>
      )}

      {(multiple || images.length === 0) && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
          className={`cursor-pointer border-2 border-dashed rounded-2xl py-8 px-4 text-center transition ${drag ? "border-orange-500 bg-orange-500/10" : "border-zinc-700 hover:border-orange-500/60 bg-zinc-800/40"}`}
        >
          {busy > 0 ? (
            <div className="flex items-center justify-center gap-2 text-orange-400 text-sm font-semibold">
              <Loader2 className="animate-spin" size={18} /> Uploading {busy} image{busy > 1 ? "s" : ""}…
            </div>
          ) : (
            <>
              <UploadCloud className="mx-auto text-orange-500 mb-2" size={28} />
              <p className="text-sm text-zinc-300 font-semibold">Click or drag & drop {multiple ? "images" : "an image"}</p>
              <p className="text-[11px] text-zinc-500 mt-1">JPG, PNG, WEBP · max 8MB{multiple ? " · up to 12" : ""}</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
          />
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
            placeholder="…or paste an image URL / path (e.g. /tours/galle.jpg)"
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:border-orange-500/50"
          />
        </div>
        <button type="button" onClick={addUrl} className="px-3 py-2 text-xs font-bold bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700">Add</button>
      </div>
    </div>
  );
}
