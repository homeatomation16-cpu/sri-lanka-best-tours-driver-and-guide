"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, X, Languages, Check } from "lucide-react";

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
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("en");

  const [formData, setFormData] = useState<any>({
    tourId: "",
    price: "",
    duration: "",
    image: "",
    tourType: "",
    translations: {}
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
    setEditingId(tour._id); // ✅ important

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

  // 🔥 FINAL FIXED SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    const method = editingId ? "PUT" : "POST"; // ✅ FIX
    const url = editingId ? `/api/tours/${editingId}` : "/api/tours";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),      // ✅ FIX
        duration: Number(formData.duration) // ✅ FIX
      }),
    });

    setSaving(false);
    closeModal();
    fetchTours();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setActiveTab("en");
    setFormData({
      tourId: "",
      price: "",
      duration: "",
      image: "",
      tourType: "",
      translations: {}
    });
  };

  return (
    <div className="p-8 bg-[#09090b] min-h-screen text-zinc-200">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Manage Tours</h1>
          <p className="text-zinc-500 text-sm">Multilingual Content Management</p>
        </div>

        <button onClick={() => setShowModal(true)}
          className="bg-orange-600 px-6 py-3 rounded-2xl flex gap-2">
          <Plus size={20}/> Add Tour
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-orange-500"/>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {tours.map((tour: any) => (
            <div key={tour._id} className="bg-zinc-900 rounded-3xl overflow-hidden">

              {tour.image ? (
                <img src={tour.image} className="h-52 w-full object-cover"/>
              ) : (
                <div className="h-52 flex items-center justify-center bg-zinc-800">
                  <ImageIcon/>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-bold">
                  {tour.translations?.en?.title || tour.tourId}
                </h3>

                <div className="flex justify-between mt-3">
                  <span className="text-orange-500 font-bold">
                    ${tour.price}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(tour)}>
                      <Edit size={18}/>
                    </button>
                    <button onClick={() => handleDelete(tour._id)}>
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4">

          <form onSubmit={handleSubmit}
            className="bg-zinc-900 w-full max-w-3xl p-8 rounded-3xl space-y-6">

            <h2 className="text-xl font-bold">
              {editingId ? "Edit Tour" : "Add Tour"}
            </h2>

            {/* GLOBAL */}
            <input
              placeholder="Tour ID"
              value={formData.tourId}
              onChange={e => setFormData({...formData, tourId: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded"
            />

            {/* LANG TABS */}
            <div className="flex gap-2 overflow-x-auto">
              {LANGUAGES.map(l => (
                <button key={l.code} type="button"
                  onClick={() => setActiveTab(l.code)}
                  className={activeTab === l.code ? "text-orange-500" : ""}>
                  {l.code}
                </button>
              ))}
            </div>

            {/* TRANSLATION */}
            <input
              placeholder="Title"
              value={formData.translations[activeTab]?.title || ""}
              onChange={e => handleTranslationChange(activeTab, "title", e.target.value)}
              className="w-full p-3 bg-zinc-800 rounded"
            />

            <textarea
              placeholder="Overview"
              value={formData.translations[activeTab]?.overview || ""}
              onChange={e => handleTranslationChange(activeTab, "overview", e.target.value)}
              className="w-full p-3 bg-zinc-800 rounded"
            />

            <div className="flex gap-4">
              <button type="submit" disabled={saving}
                className="bg-orange-600 px-6 py-3 rounded flex-1">
                {saving ? "Saving..." : "Save"}
              </button>

              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}