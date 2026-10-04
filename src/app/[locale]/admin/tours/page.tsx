"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus, Edit, Trash2, Image as ImageIcon, Loader2, X, Copy, Search, Star, Eye, EyeOff, Clock, Users, Languages, ChevronUp, ChevronDown,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/components/admin/Toast";

const LANGUAGES = [
  { code: "en", label: "English" }, { code: "si", label: "Sinhala" }, { code: "ru", label: "Russian" },
  { code: "fr", label: "French" }, { code: "de", label: "German" }, { code: "it", label: "Italian" },
  { code: "es", label: "Spanish" }, { code: "ja", label: "Japanese" }, { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" }, { code: "hi", label: "Hindi" }, { code: "ko", label: "Korean" },
  { code: "pt", label: "Portuguese" }, { code: "ta", label: "Tamil" },
];

const EMPTY_FORM = {
  tourId: "", price: "", pricePerPerson: "", additionalPersonPrice: "", minimumPeople: 2, maxPeople: "", minAge: "",
  duration: 1, image: "", gallery: [] as string[], tourType: "", featured: false, status: "active", translations: {} as any,
};

const inputCls = "w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm outline-none focus:border-orange-500/60";
const labelCls = "text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5 block";

const toLines = (v: any) => (Array.isArray(v) ? v.join("\n") : v || "");
const fromLines = (s: string) => s.split("\n");
const cleanLines = (a: any) => (Array.isArray(a) ? a.map((x: string) => x.trim()).filter(Boolean) : []);

export default function ToursAdmin() {
  const toast = useToast();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("en");
  const [formData, setFormData] = useState<any>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tours");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setTours(data);
    } catch (e: any) {
      toast(e.message, "error");
    }
    setLoading(false);
  };
  useEffect(() => { fetchTours(); /* eslint-disable-next-line */ }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tours.filter((t) => {
      const title = (t.translations?.en?.title || t.tourId || "").toLowerCase();
      const okSearch = !q || title.includes(q) || (t.tourId || "").toLowerCase().includes(q) || (t.tourType || "").toLowerCase().includes(q);
      const okStatus = filter === "all" || (t.status || "active") === filter;
      return okSearch && okStatus;
    });
  }, [tours, search, filter]);

  // ---------- form helpers ----------
  const set = (patch: any) => setFormData((p: any) => ({ ...p, ...patch }));
  const tr = (lang = activeTab) => formData.translations?.[lang] || {};
  const setTr = (field: string, value: any, lang = activeTab) =>
    setFormData((p: any) => ({ ...p, translations: { ...p.translations, [lang]: { ...p.translations?.[lang], [field]: value } } }));

  const openNew = () => { setEditingId(null); setFormData(EMPTY_FORM); setActiveTab("en"); setShowModal(true); };

  const openEdit = (tour: any, duplicate = false) => {
    setEditingId(duplicate ? null : tour._id);
    setFormData({
      tourId: duplicate ? `${tour.tourId}-copy` : tour.tourId,
      price: tour.price ?? "",
      pricePerPerson: tour.pricePerPerson ?? tour.price ?? "",
      additionalPersonPrice: tour.additionalPersonPrice ?? tour.pricePerPerson ?? tour.price ?? "",
      minimumPeople: tour.minimumPeople ?? 2,
      maxPeople: tour.maxPeople ?? "",
      minAge: tour.minAge ?? "",
      duration: tour.duration ?? 1,
      image: tour.image || "",
      gallery: tour.gallery || [],
      tourType: tour.tourType || "",
      featured: !!tour.featured,
      status: duplicate ? "inactive" : tour.status || "active",
      translations: JSON.parse(JSON.stringify(tour.translations || {})),
    });
    setActiveTab("en");
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); setFormData(EMPTY_FORM); };

  const langFilled = (code: string) => !!formData.translations?.[code]?.title?.trim();

  const copyFromEnglish = () => {
    const en = formData.translations?.en;
    if (!en) return toast("English content is empty", "error");
    setFormData((p: any) => ({ ...p, translations: { ...p.translations, [activeTab]: JSON.parse(JSON.stringify(en)) } }));
    toast(`English content copied to ${activeTab.toUpperCase()} – now translate it`);
  };

  // itinerary
  const itinerary: any[] = tr().itinerary || [];
  const setItinerary = (arr: any[]) => setTr("itinerary", arr.map((d, i) => ({ ...d, days: [i + 1] })));
  const addDay = () => setItinerary([...itinerary, { title: `Day ${String(itinerary.length + 1).padStart(2, "0")} - `, description: "", activities: [], overnight: "", image: "" }]);
  const updateDay = (i: number, patch: any) => setItinerary(itinerary.map((d, idx) => (idx === i ? { ...d, ...patch } : d)));
  const removeDay = (i: number) => setItinerary(itinerary.filter((_, idx) => idx !== i));
  const moveDay = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= itinerary.length) return;
    const copy = [...itinerary];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setItinerary(copy);
  };

  // ---------- submit ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tourId.trim()) return toast("Tour ID is required", "error");
    if (!Number(formData.price)) return toast("Price is required", "error");
    if (!formData.translations?.en?.title?.trim()) { setActiveTab("en"); return toast("English title is required", "error"); }

    // clean translations
    const translations: any = {};
    Object.entries(formData.translations || {}).forEach(([lang, v]: any) => {
      if (!v?.title?.trim() && !v?.overview?.trim()) return;
      translations[lang] = {
        ...v,
        included: cleanLines(v.included),
        excluded: cleanLines(v.excluded),
        vehicleInfo: cleanLines(v.vehicleInfo),
        itinerary: (v.itinerary || []).map((d: any, i: number) => ({ ...d, days: [i + 1], activities: cleanLines(d.activities) })),
      };
    });

    setSaving(true);
    try {
      const res = await fetch(editingId ? `/api/tours/${editingId}` : "/api/tours", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, translations }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed");
      toast(editingId ? "Tour updated" : "Tour created");
      closeModal();
      fetchTours();
    } catch (err: any) {
      toast(err.message, "error");
    }
    setSaving(false);
  };

  const quickUpdate = async (tour: any, patch: any, msg: string) => {
    const res = await fetch(`/api/tours/${tour._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (res.ok) { toast(msg); setTours((p) => p.map((t) => (t._id === tour._id ? { ...t, ...patch } : t))); }
    else toast("Update failed", "error");
  };

  const confirmDelete = async () => {
    const res = await fetch(`/api/tours/${deleteTarget._id}`, { method: "DELETE" });
    if (res.ok) { toast("Tour deleted"); setTours((p) => p.filter((t) => t._id !== deleteTarget._id)); }
    else toast("Delete failed", "error");
    setDeleteTarget(null);
  };

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-zinc-200">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-10 md:mt-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Manage Tours</h1>
          <p className="text-zinc-500 text-sm">{tours.length} tours · {tours.filter((t) => (t.status || "active") === "active").length} live on website</p>
        </div>
        <button onClick={openNew} className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-2xl flex gap-2 items-center font-bold">
          <Plus size={20} /> Add Tour
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tours…" className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none focus:border-orange-500/50" />
        </div>
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl border border-zinc-800 w-fit">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider ${filter === f ? "bg-orange-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-zinc-500 border border-dashed border-zinc-800 rounded-3xl">No tours found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((tour) => {
            const inactive = (tour.status || "active") === "inactive";
            const langs = Object.keys(tour.translations || {}).length;
            return (
              <div key={tour._id} className={`bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col ${inactive ? "opacity-60" : ""}`}>
                <div className="relative">
                  {tour.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tour.image} alt="" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="h-48 flex flex-col gap-2 items-center justify-center bg-zinc-800 text-zinc-600"><ImageIcon /><span className="text-xs">No image</span></div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${inactive ? "bg-zinc-700 text-zinc-300" : "bg-emerald-500 text-white"}`}>{inactive ? "Hidden" : "Live"}</span>
                    {tour.featured && <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500 text-white flex items-center gap-1"><Star size={10} /> Featured</span>}
                  </div>
                  {!!tour.gallery?.length && <span className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/70 px-2 py-1 rounded-full">{tour.gallery.length} photos</span>}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-white leading-snug">{tour.translations?.en?.title || tour.tourId}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 mt-2">
                    <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration || 1} day{tour.duration > 1 ? "s" : ""}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> min {tour.minimumPeople || 2}</span>
                    <span className="flex items-center gap-1"><Languages size={12} /> {langs}/14</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4">
                    <span className="text-orange-500 font-bold text-lg">${tour.price}</span>
                    <div className="flex gap-1">
                      <IconBtn title="Toggle featured" onClick={() => quickUpdate(tour, { featured: !tour.featured }, tour.featured ? "Removed from featured" : "Marked featured")}><Star size={16} className={tour.featured ? "text-amber-400 fill-amber-400" : ""} /></IconBtn>
                      <IconBtn title={inactive ? "Show on website" : "Hide from website"} onClick={() => quickUpdate(tour, { status: inactive ? "active" : "inactive" }, inactive ? "Tour is now live" : "Tour hidden")}>{inactive ? <EyeOff size={16} /> : <Eye size={16} />}</IconBtn>
                      <IconBtn title="Duplicate" onClick={() => openEdit(tour, true)}><Copy size={16} /></IconBtn>
                      <IconBtn title="Edit" onClick={() => openEdit(tour)}><Edit size={16} /></IconBtn>
                      <IconBtn title="Delete" danger onClick={() => setDeleteTarget(tour)}><Trash2 size={16} /></IconBtn>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center">
            <Trash2 className="mx-auto text-red-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Delete this tour?</h3>
            <p className="text-sm text-zinc-500 mb-6">“{deleteTarget.translations?.en?.title || deleteTarget.tourId}” will be removed permanently. Tip: use <b>Hide</b> if you only want it off the website.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-600 font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-start p-0 sm:p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-zinc-900 w-full max-w-4xl sm:rounded-3xl my-0 sm:my-6 border border-zinc-800">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 sm:rounded-t-3xl z-10">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Tour" : "Add Tour"}</h2>
              <button type="button" onClick={closeModal} className="text-zinc-500 hover:text-white"><X /></button>
            </div>

            <div className="p-6 space-y-8">
              {/* BASICS */}
              <Section title="Basics">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Tour ID (URL slug) *</label>
                    <input disabled={!!editingId} value={formData.tourId} onChange={(e) => set({ tourId: e.target.value })} placeholder="galle-one-day-tour" className={`${inputCls} ${editingId ? "opacity-50" : ""}`} /></div>
                  <div><label className={labelCls}>Tour type</label>
                    <input value={formData.tourType} onChange={(e) => set({ tourType: e.target.value })} placeholder="Private Day Tour" className={inputCls} /></div>
                  <div><label className={labelCls}>Duration (days)</label>
                    <input type="number" min={1} value={formData.duration} onChange={(e) => set({ duration: e.target.value })} className={inputCls} /></div>
                  <div className="flex items-end gap-6 pb-3">
                    <Toggle label="Live on website" checked={formData.status === "active"} onChange={(v) => set({ status: v ? "active" : "inactive" })} />
                    <Toggle label="Featured" checked={formData.featured} onChange={(v) => set({ featured: v })} />
                  </div>
                </div>
              </Section>

              {/* PRICING */}
              <Section title="Pricing & Group size (USD)">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><label className={labelCls}>Base price *</label><input type="number" value={formData.price} onChange={(e) => set({ price: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Price per person</label><input type="number" value={formData.pricePerPerson} onChange={(e) => set({ pricePerPerson: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Additional person</label><input type="number" value={formData.additionalPersonPrice} onChange={(e) => set({ additionalPersonPrice: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Minimum people</label><input type="number" min={1} value={formData.minimumPeople} onChange={(e) => set({ minimumPeople: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Maximum people</label><input type="number" value={formData.maxPeople} onChange={(e) => set({ maxPeople: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Minimum age</label><input type="number" value={formData.minAge} onChange={(e) => set({ minAge: e.target.value })} className={inputCls} /></div>
                </div>
              </Section>

              {/* IMAGES */}
              <Section title="Images">
                <ImageUploader label="Cover image" value={formData.image} onChange={(v: string) => set({ image: v })} onError={(m) => toast(m, "error")} />
                <div className="mt-6">
                  <ImageUploader label="Gallery (first image = most important)" multiple value={formData.gallery} onChange={(v: string[]) => set({ gallery: v })} onError={(m) => toast(m, "error")} />
                </div>
              </Section>

              {/* CONTENT */}
              <Section title="Content (per language)">
                <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} type="button" onClick={() => setActiveTab(l.code)} title={l.label}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase shrink-0 flex items-center gap-1.5 ${activeTab === l.code ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${langFilled(l.code) ? "bg-emerald-400" : "bg-zinc-600"}`} />{l.code}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-zinc-400 font-semibold">{LANGUAGES.find((l) => l.code === activeTab)?.label}</p>
                  {activeTab !== "en" && <button type="button" onClick={copyFromEnglish} className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"><Copy size={12} /> Copy from English</button>}
                </div>

                <div className="space-y-4">
                  <div><label className={labelCls}>Title {activeTab === "en" && "*"}</label><input value={tr().title || ""} onChange={(e) => setTr("title", e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Overview</label><textarea rows={4} value={tr().overview || ""} onChange={(e) => setTr("overview", e.target.value)} className={inputCls} /></div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><label className={labelCls}>Included (one per line)</label><textarea rows={6} value={toLines(tr().included)} onChange={(e) => setTr("included", fromLines(e.target.value))} className={inputCls} /></div>
                    <div><label className={labelCls}>Excluded (one per line)</label><textarea rows={6} value={toLines(tr().excluded)} onChange={(e) => setTr("excluded", fromLines(e.target.value))} className={inputCls} /></div>
                    <div><label className={labelCls}>Vehicle info (one per line)</label><textarea rows={6} value={toLines(tr().vehicleInfo)} onChange={(e) => setTr("vehicleInfo", fromLines(e.target.value))} className={inputCls} /></div>
                  </div>

                  {/* ITINERARY */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className={labelCls + " mb-0"}>Itinerary ({itinerary.length} day{itinerary.length !== 1 ? "s" : ""})</label>
                      <button type="button" onClick={addDay} className="text-xs font-bold bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-700 flex items-center gap-1"><Plus size={12} /> Add day</button>
                    </div>
                    <div className="space-y-4">
                      {itinerary.map((d, i) => (
                        <div key={i} className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-orange-600 px-2 py-1 rounded-full">Day {i + 1}</span>
                            <input value={d.title || ""} onChange={(e) => updateDay(i, { title: e.target.value })} placeholder="Day title" className={inputCls} />
                            <IconBtn title="Move up" onClick={() => moveDay(i, -1)}><ChevronUp size={16} /></IconBtn>
                            <IconBtn title="Move down" onClick={() => moveDay(i, 1)}><ChevronDown size={16} /></IconBtn>
                            <IconBtn title="Remove day" danger onClick={() => removeDay(i)}><Trash2 size={16} /></IconBtn>
                          </div>
                          <textarea rows={2} value={d.description || ""} onChange={(e) => updateDay(i, { description: e.target.value })} placeholder="Description" className={inputCls} />
                          <div className="grid md:grid-cols-2 gap-3">
                            <textarea rows={4} value={toLines(d.activities)} onChange={(e) => updateDay(i, { activities: fromLines(e.target.value) })} placeholder="Activities (one per line)" className={inputCls} />
                            <div className="space-y-3">
                              <input value={d.overnight || ""} onChange={(e) => updateDay(i, { overnight: e.target.value })} placeholder="Overnight stay" className={inputCls} />
                              <ImageUploader value={d.image || ""} onChange={(v: string) => updateDay(i, { image: v })} folder="itinerary" onError={(m) => toast(m, "error")} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="flex gap-3 p-6 border-t border-zinc-800 sticky bottom-0 bg-zinc-900 sm:rounded-b-3xl">
              <button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-500 disabled:opacity-60 px-8 py-3 rounded-xl flex-1 font-bold flex items-center justify-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}{saving ? "Saving…" : editingId ? "Save changes" : "Create tour"}
              </button>
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-4 pb-2 border-b border-zinc-800">{title}</h3>
      {children}
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button type="button" title={title} onClick={onClick} className={`p-2 rounded-lg shrink-0 transition ${danger ? "text-zinc-500 hover:bg-red-500/15 hover:text-red-400" : "text-zinc-500 hover:bg-zinc-800 hover:text-white"}`}>
      {children}
    </button>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2 text-sm text-zinc-300">
      <span className={`w-10 h-6 rounded-full p-0.5 transition ${checked ? "bg-orange-600" : "bg-zinc-700"}`}>
        <span className={`block w-5 h-5 rounded-full bg-white transition ${checked ? "translate-x-4" : ""}`} />
      </span>
      {label}
    </button>
  );
}
