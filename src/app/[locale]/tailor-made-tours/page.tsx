"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check, Sparkles, ArrowRight, Phone, Mail, MapPin, Coffee, Hotel, Users } from "lucide-react";
import { contact } from "@/data/contact";

const initialForm = {
  travelWith: "", // Alone, Couple, Family, Friends
  vehicleType: "", 
  transportMethod: "", 
  holidayType: [] as string[],
  accommodation: "3star",
  mealPlan: "",
  adults: 2,
  children: 0,
  startDate: "",
  endDate: "",
  name: "",
  email: "",
  whatsapp: "",
  requirements: ""
};

export default function TailorMadePage() {
  const t = useTranslations("tailorMade");
  
  const [form, setForm] = useState(initialForm);
  const [estimatedDays, setEstimatedDays] = useState(0);

  useEffect(() => {
    if (form.startDate && form.endDate) {
      const diff = Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / 86400000) + 1;
      setEstimatedDays(diff > 0 ? diff : 0);
    }
  }, [form.startDate, form.endDate]);

  const setField = (field: string, value: any) => setForm(s => ({ ...s, [field]: value }));

  const toggleHoliday = (id: string) => {
    setForm(s => {
      const set = new Set(s.holidayType);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...s, holidayType: Array.from(set) };
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const holidayNames = form.holidayType.map(id => t(`activities.${id}`)).join(", ");
    
    // Constructing message using translated values
    const message = `🌴 *${t("label")} Request* ✅\n\n` +
      `*Name:* ${form.name}\n` +
      `*Vehicle:* ${form.vehicleType ? t(`vehicles.${form.vehicleType.toLowerCase()}`) : "—"}\n` +
      `*Accomm:* ${t(`accTypes.${form.accommodation}`)}\n` +
      `*Meals:* ${form.mealPlan ? t(`meals.${form.mealPlan}`) : "—"}\n` +
      `*Duration:* ${estimatedDays} Days\n` +
      `*Interests:* ${holidayNames}`;

    window.open(`${contact.whatsappme}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-[#FDFBFA] min-h-screen font-sans text-stone-900 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/cover.jpg" alt="Sri Lanka Luxury" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80 z-10" />
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="relative z-20 text-center text-white px-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-6">
            <Sparkles size={16} className="text-[#C9922A]" />
            <span className="text-xs font-bold tracking-widest uppercase">{t("label")}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-extrabold leading-tight">
            {t("heading")} <span className="text-[#C9922A]">Perfect</span>
          </h1>
          <p className="mt-4 text-stone-300 max-w-xl mx-auto text-sm md:text-base font-light">
            {t("desc")}
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 -mt-12 relative z-30">
        
        {/* Form Section */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-stone-200/50 border border-stone-100"
        >
          <form onSubmit={handleWhatsAppSubmit} className="space-y-16">
            
            {/* Step 1: Preferences */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-stone-900 text-[#C9922A] rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg shadow-stone-200">1</div>
                <h2 className="text-2xl font-bold tracking-tight">{t("step1")}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vehicle Type */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400">{t("vehicleType")}</label>
                  <div className="flex gap-2">
                    {['car', 'van', 'bus'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setField("vehicleType", v)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all uppercase ${form.vehicleType === v ? 'border-[#C9922A] bg-[#FEF9EE] text-[#C9922A]' : 'border-stone-50 bg-stone-50 text-stone-500'}`}
                      >
                        {t(`vehicles.${v}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Method */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400">{t("transportMethod")}</label>
                  <select 
                    className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9922A]/20"
                    onChange={e => setField("transportMethod", e.target.value)}
                  >
                    <option value="">Select...</option>
                    {['private', 'self', 'public', 'combo'].map(m => (
                      <option key={m} value={m}>{t(`methods.${m}`)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Step 2: Interests */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-stone-900 text-[#C9922A] rounded-2xl flex items-center justify-center text-lg font-bold">2</div>
                <h2 className="text-2xl font-bold tracking-tight">{t("step2")}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "nature", icon: "🦁" }, { id: "culture", icon: "🏛️" }, { id: "beach", icon: "🏖️" },
                  { id: "trekking", icon: "⛰️" }, { id: "activity", icon: "🎯" }, { id: "boat", icon: "⛵" },
                  { id: "train", icon: "🚂" }, { id: "factory", icon: "🏭" }, { id: "watersports", icon: "🏄" },
                  { id: "diving", icon: "🤿" }, { id: "whales", icon: "🐋" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleHoliday(opt.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${form.holidayType.includes(opt.id) ? 'border-[#C9922A] bg-[#FEF9EE]' : 'border-stone-50 bg-stone-50'}`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-sm font-semibold">{t(`activities.${opt.id}`)}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Accommodation */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-stone-900 text-[#C9922A] rounded-2xl flex items-center justify-center text-lg font-bold">3</div>
                <h2 className="text-2xl font-bold tracking-tight">{t("step3")}</h2>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400">
                    <Hotel size={14} /> {t("accommodation")}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['3star', '4star', '5star', 'own'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setField("accommodation", type)}
                        className={`py-4 rounded-xl border-2 font-bold text-xs transition-all ${form.accommodation === type ? 'border-[#C9922A] bg-[#FEF9EE] text-[#C9922A]' : 'border-stone-50 bg-stone-50 text-stone-500'}`}
                      >
                        {t(`accTypes.${type}`)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400">
                    <Coffee size={14} /> {t("mealPlan")}
                  </label>
                  <select 
                    className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none"
                    onChange={e => setField("mealPlan", e.target.value)}
                  >
                    <option value="">Select...</option>
                    {['roomOnly', 'bb', 'hb', 'fb', 'allInc'].map(m => (
                      <option key={m} value={m}>{t(`meals.${m}`)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Step 4: Details */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-stone-900 text-[#C9922A] rounded-2xl flex items-center justify-center text-lg font-bold">4</div>
                <h2 className="text-2xl font-bold tracking-tight">{t("step5")}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">{t("startDate")}</label>
                  <input type="date" className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl" onChange={e => setField("startDate", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">{t("endDate")}</label>
                  <input type="date" className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl" onChange={e => setField("endDate", e.target.value)} />
                </div>
                
                <input type="text" placeholder={t("phName")} className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl md:col-span-2" required onChange={e => setField("name", e.target.value)} />
                <input type="email" placeholder={t("phEmail")} className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl md:col-span-2" required onChange={e => setField("email", e.target.value)} />
                
                <div className="md:col-span-2">
                  <PhoneInput defaultCountry="LK" className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl" onChange={v => setField("whatsapp", v)} placeholder="WhatsApp Number" />
                </div>
                <textarea 
                  placeholder="Special requests..." 
                  className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl md:col-span-2 h-32"
                  onChange={e => setField("requirements", e.target.value)}
                ></textarea>
              </div>
            </section>

            <button type="submit" className="w-full py-6 bg-stone-900 hover:bg-[#C9922A] text-white rounded-3xl font-bold text-sm tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl">
              {t("btnSubmit")} <ArrowRight size={20} />
            </button>

          </form>
        </motion.div>

        {/* Sidebar Summary */}
        <aside className="space-y-8">
          <div className="bg-stone-900 text-white rounded-4xl p-8 sticky top-24 overflow-hidden shadow-2xl">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C9922A] rounded-full blur-[80px] opacity-20"></div>
             <h4 className="text-[#C9922A] text-xs font-black tracking-widest uppercase mb-8 flex items-center gap-2">
                <MapPin size={14} /> Journey Summary
             </h4>
             <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-stone-400 text-xs">Duration</span>
                  <span className="font-bold">{estimatedDays > 0 ? `${estimatedDays} ${t("tours.days")}` : "—"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-stone-400 text-xs">Vehicle</span>
                  <span className="font-bold">{form.vehicleType ? t(`vehicles.${form.vehicleType.toLowerCase()}`) : "—"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-stone-400 text-xs">Accomm.</span>
                  <span className="font-bold uppercase">{t(`accTypes.${form.accommodation}`)}</span>
                </div>
             </div>
             <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10 italic text-[11px] text-stone-400">
               "We will craft your perfect journey and contact you within 24 hours."
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}