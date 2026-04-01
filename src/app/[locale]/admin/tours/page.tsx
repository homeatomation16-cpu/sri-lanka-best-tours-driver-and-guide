"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, X, Languages, Check } from "lucide-react";

// අපි සපෝට් කරන භාෂා 14
const LANGUAGES = [
  { code: "en", label: "English" }, { code: "si", label: "Sinhala" },
  { code: "ru", label: "Russian" }, { code: "fr", label: "French" },
  { code: "de", label: "German" }, { code: "it", label: "Italian" },
  { code: "es", label: "Spanish" }, { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" }, { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" }, { code: "ko", label: "Korean" },
  { code: "pt", label: "Portuguese" }, { code: "ta", label: "Tamil" }
];

export default function ToursAdmin() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // දැනට එඩිට් කරන භාෂාව (Default: English)
  const [activeTab, setActiveTab] = useState("en");

  // Form එකේ දත්ත structure එක (DB Schema එකට ගැලපෙන ලෙස)
  const [formData, setFormData] = useState<any>({
    tourId: "", // slug එක (e.g. galle-tour)
    price: "",
    duration: "",
    image: "",
    tourType: "",
    translations: {} // මෙතැනට තමයි භාෂා 14 දත්ත වැටෙන්නේ
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const res = await fetch("/api/tours");
    const data = await res.json();
    setTours(data);
    setLoading(false);
  };

  // එක් එක් භාෂාවට අදාළ දත්ත වෙනස් කිරීම
  const handleTranslationChange = (lang: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: value
        }
      }
    }));
  };

  const handleEdit = (tour: any) => {
    setEditingId(tour._id);
    setFormData({
      tourId: tour.tourId,
      price: tour.price,
      duration: tour.duration,
      image: tour.image || "",
      tourType: tour.tourType || "",
      translations: tour.translations || {}
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await fetch(`/api/tours/${id}`, { method: "DELETE" });
      fetchTours();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `/api/tours/${editingId}` : "/api/tours";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchTours();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setActiveTab("en");
    setFormData({ tourId: "", price: "", duration: "", image: "", tourType: "", translations: {} });
  };

  return (
    <div className="p-8 bg-[#09090b] min-h-screen text-zinc-200">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Manage Tours</h1>
          <p className="text-zinc-500 text-sm mt-1">Multilingual Content Management</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20 active:scale-95"
        >
          <Plus size={20} /> Add New Tour
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour: any) => (
            <div key={tour._id} className="bg-zinc-900/50 border border-zinc-800 rounded-4xl overflow-hidden group hover:border-zinc-700 transition-all shadow-xl">
              <div className="h-52 bg-zinc-800 flex items-center justify-center relative">
                {tour.image ? <img src={tour.image} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-zinc-700" />}
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest border border-orange-500/20">
                  {tour.duration} Days
                </div>
              </div>
              <div className="p-7">
                {/* කාඩ් එකේ පෙන්වන්නේ English Title එක */}
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {tour.translations?.en?.title || tour.tourId}
                </h3>
                <div className="flex justify-between items-center pt-5 border-t border-zinc-800/50">
                  <span className="text-xl font-serif font-bold text-orange-500">${tour.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(tour)} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(tour._id)} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-500 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- ADD/EDIT MULTILINGUAL MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-900 w-full max-w-4xl rounded-[40px] my-10 p-8 border border-zinc-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <Languages className="text-orange-500" /> {editingId ? "Edit Tour Package" : "Create New Tour Package"}
              </h2>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white bg-zinc-800 p-2 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* --- GLOBAL FIELDS (භාෂාවට පොදු දත්ත) --- */}
              <div className="bg-zinc-800/30 p-6 rounded-3xl border border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">Global Settings (Same for all languages)</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase text-zinc-500 ml-2">Tour ID (Slug - no spaces)</label>
                    <input type="text" required className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white outline-none focus:border-orange-500"
                      value={formData.tourId} onChange={e => setFormData({...formData, tourId: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 ml-2">Price ($)</label>
                    <input type="number" className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white outline-none focus:border-orange-500"
                      value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 ml-2">Duration (Days)</label>
                    <input type="number" className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white outline-none focus:border-orange-500"
                      value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                  </div>
                </div>
                <div>
                    <label className="text-[10px] uppercase text-zinc-500 ml-2">Image URL</label>
                    <input type="text" className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white outline-none focus:border-orange-500"
                      value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>

              {/* --- TRANSLATION TABS (භාෂා තේරීම) --- */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setActiveTab(lang.code)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2
                        ${activeTab === lang.code ? 'bg-orange-600 border-orange-600 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {lang.label}
                      {formData.translations[lang.code]?.title && <Check size={12} className="text-white" />}
                    </button>
                  ))}
                </div>

                {/* --- TRANSLATABLE FIELDS (භාෂාව අනුව වෙනස් වන දත්ත) --- */}
                <div className="bg-zinc-950/50 p-6 rounded-3xl border border-zinc-800 border-dashed animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <p className="text-sm font-bold text-zinc-300">Editing Content in: <span className="text-orange-500">{LANGUAGES.find(l => l.code === activeTab)?.label}</span></p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase text-zinc-500 ml-2">Tour Title ({activeTab})</label>
                      <input 
                        type="text" 
                        placeholder={`Title in ${activeTab}...`}
                        className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-2xl text-white outline-none focus:border-orange-500"
                        value={formData.translations[activeTab]?.title || ""}
                        onChange={e => handleTranslationChange(activeTab, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-zinc-500 ml-2">Overview / Description ({activeTab})</label>
                      <textarea 
                        rows={5}
                        placeholder={`Description in ${activeTab}...`}
                        className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-2xl text-white outline-none focus:border-orange-500 resize-none"
                        value={formData.translations[activeTab]?.overview || ""}
                        onChange={e => handleTranslationChange(activeTab, "overview", e.target.value)}
                      ></textarea>
                    </div>
                    <p className="text-[9px] text-zinc-600 italic">* Itinerary, Included/Excluded list එක දැනට පරණ විදිහටම DB එකට වැටේ. අවශ්‍ය නම් මෙතැනටද fields එකතු කළ හැක.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-zinc-800">
                <button type="button" onClick={closeModal} className="flex-1 py-4 text-zinc-500 font-bold hover:text-zinc-300 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-orange-600 text-white rounded-[20px] font-bold shadow-lg shadow-orange-900/40 hover:bg-orange-700 transition-all transform active:scale-95">
                  {editingId ? "Update All Languages" : "Save Tour Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}