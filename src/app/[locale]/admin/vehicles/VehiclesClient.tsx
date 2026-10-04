"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { useToast } from "@/components/admin/Toast";

const LANGS = ["en","si","ru","fr","de","it","es","ja","zh","ar","hi","ko","pt","ta"];

export default function VehiclesClient() {
  const toast = useToast();

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
    type: "",
    fuel: "",
    transmission: "",
    image: "",
    gallery: [] as string[],
    driver: { name: "", phone: "" },
    status: "active",
    translations: {}
  });

  // 🔹 FETCH
  const fetchVehicles = async () => {
    setLoading(true);
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(Array.isArray(data) ? data : []);
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
      type: v.type || "",
      fuel: v.fuel || "",
      transmission: v.transmission || "",
      image: v.image || "",
      gallery: v.gallery || [],
      driver: { name: v.driver?.name || "", phone: v.driver?.phone || "" },
      status: v.status || "active",
      translations: v.translations || {}
    });

    setShowModal(true);
  };

  // 🔹 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete vehicle?")) return;

    const r = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    toast(r.ok ? "Vehicle deleted" : "Delete failed", r.ok ? "success" : "error");
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
      const j = await res.json().catch(() => ({}));
      toast(j.error || "Error saving vehicle", "error");
      return;
    }

    toast(editingId ? "Vehicle updated" : "Vehicle created");
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
      type: "",
      fuel: "",
      transmission: "",
      image: "",
      gallery: [],
      driver: { name: "", phone: "" },
      status: "active",
      translations: {}
    });
  };

  const toggleStatus = async (v: any) => {
    const status = v.status === "inactive" ? "active" : "inactive";
    const res = await fetch(`/api/vehicles/${v._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, status }),
    });
    if (res.ok) {
      toast(status === "active" ? "Vehicle is now live" : "Vehicle hidden");
      setVehicles((p) => p.map((x) => (x._id === v._id ? { ...x, status } : x)));
    } else toast("Update failed", "error");
  };

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-zinc-200">

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
              className={`bg-zinc-900 p-5 rounded-2xl border border-zinc-800 ${v.status === "inactive" ? "opacity-60" : ""}`}>

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
                <button title={v.status === "inactive" ? "Show on website" : "Hide from website"} onClick={() => toggleStatus(v)}>
                  {v.status === "inactive" ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>

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
        <div className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-start p-4 overflow-y-auto">

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

            <div className="grid grid-cols-3 gap-3">
              <input placeholder="Type (Van, Car…)" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="p-3 bg-zinc-800 rounded-xl" />
              <input placeholder="Fuel" value={formData.fuel} onChange={e => setFormData({...formData, fuel: e.target.value})} className="p-3 bg-zinc-800 rounded-xl" />
              <input placeholder="Transmission" value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} className="p-3 bg-zinc-800 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Driver name" value={formData.driver?.name || ""} onChange={e => setFormData({...formData, driver: {...formData.driver, name: e.target.value}})} className="p-3 bg-zinc-800 rounded-xl" />
              <input placeholder="Driver phone" value={formData.driver?.phone || ""} onChange={e => setFormData({...formData, driver: {...formData.driver, phone: e.target.value}})} className="p-3 bg-zinc-800 rounded-xl" />
            </div>

            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-zinc-800 rounded-xl">
              <option value="active">Live on website</option>
              <option value="inactive">Hidden</option>
            </select>

            {/* IMAGES */}
            <ImageUploader label="Main image" value={formData.image} folder="vehicles" onChange={(v: string) => setFormData({...formData, image: v})} onError={(m) => toast(m, "error")} />
            <ImageUploader label="Gallery" multiple value={formData.gallery} folder="vehicles" onChange={(v: string[]) => setFormData({...formData, gallery: v})} onError={(m) => toast(m, "error")} />

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