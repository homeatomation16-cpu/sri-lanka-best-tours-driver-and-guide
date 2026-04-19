"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

const LANGS = ["en","si","ru","fr","de","it","es","ja","zh","ar","hi","ko","pt","ta"];

export default function VehiclesClient() {

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState("en");

  const [formData, setFormData] = useState<any>({
    vehicleId: "",
    name: "",
    price: "",
    passengers: "",
    image: "",
    translations: {}
  });

  // 🔹 FETCH
  const fetchVehicles = async () => {
    setLoading(true);
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 🔹 EDIT
  const handleEdit = (v: any) => {
    setEditingId(v._id);

    setFormData({
      vehicleId: v.vehicleId,
      name: v.name,
      price: v.price,
      passengers: v.passengers,
      image: v.image,
      translations: v.translations || {}
    });

    setShowModal(true);
  };

  // 🔹 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete vehicle?")) return;

    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    fetchVehicles();
  };

  // 🔹 TRANSLATION
  const handleTranslationChange = (lang: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations?.[lang],
          [field]: value
        }
      }
    }));
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSaving(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/vehicles/${editingId}` : "/api/vehicles";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        passengers: Number(formData.passengers),
      })
    });

    setSaving(false);

    if (!res.ok) {
      alert("Error saving vehicle");
      return;
    }

    closeModal();
    fetchVehicles();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setActiveLang("en");
    setFormData({
      vehicleId: "",
      name: "",
      price: "",
      passengers: "",
      image: "",
      translations: {}
    });
  };

  return (
    <div className="p-8 bg-[#09090b] min-h-screen text-zinc-200">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Vehicles Admin</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 px-6 py-3 rounded-xl flex gap-2 font-semibold"
        >
          <Plus size={18}/> Add Vehicle
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-orange-500"/>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {vehicles.map(v => (
            <div key={v._id}
              className="bg-zinc-900 p-5 rounded-2xl hover:scale-[1.02] transition">

              {v.image && (
                <img
                  src={v.image}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
              )}

              <h2 className="font-bold text-lg text-white">
                {v.translations?.en?.name || v.name}
              </h2>

              <p className="text-orange-500 font-bold mt-2">
                ${v.price}
              </p>

              <div className="flex gap-3 mt-4">
                <button onClick={() => handleEdit(v)}>
                  <Edit size={18}/>
                </button>

                <button onClick={() => handleDelete(v._id)}>
                  <Trash2 size={18}/>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-start p-4 overflow-y-auto">

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 p-8 rounded-3xl w-full max-w-xl space-y-5 max-h-[90vh] overflow-y-auto"
          >

            <h2 className="text-xl font-bold">
              {editingId ? "Edit Vehicle" : "Add Vehicle"}
            </h2>

            {/* GLOBAL */}
            <input
              placeholder="Vehicle ID"
              value={formData.vehicleId}
              onChange={e => setFormData({...formData, vehicleId: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            <input
              type="number"
              placeholder="Passengers"
              value={formData.passengers}
              onChange={e => setFormData({...formData, passengers: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            {/* IMAGE */}
            <input
              placeholder="Image URL"
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            {formData.image && (
              <img
                src={formData.image}
                className="w-full h-40 object-cover rounded-xl"
              />
            )}

            {/* LANG SWITCH */}
            <div className="flex gap-2 overflow-x-auto">
              {LANGS.map(l => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`px-2 py-1 rounded ${
                    activeLang === l
                      ? "bg-orange-600 text-white"
                      : "bg-zinc-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* TRANSLATIONS */}
            <input
              placeholder="Title"
              value={formData.translations?.[activeLang]?.name || ""}
              onChange={e => handleTranslationChange(activeLang, "name", e.target.value)}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            <textarea
              placeholder="Overview"
              value={formData.translations?.[activeLang]?.overview || ""}
              onChange={e => handleTranslationChange(activeLang, "overview", e.target.value)}
              className="w-full p-3 bg-zinc-800 rounded-xl"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-orange-600 px-6 py-3 rounded-xl flex-1 font-bold"
              >
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