"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { Edit2, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useContact } from "@/components/ContactProvider";
import { getGroupPrice, getMaximumPeople } from "@/utils/tourPricing";
import { formatUsd } from "@/lib/tourPricingCore";

interface Tour {
  title: string;
  tourId?: string;
  duration?: number;
  price?: number;
  pricePerPerson?: number;
  additionalPersonPrice?: number;
  maxPeople?: number;
  groupPrices?: { persons: number; price: number; vehicle?: string }[];
}

interface BookingFormProps {
  tour: Tour;
  /** Other lengths of the same tour (same category, with a price list), as on the live site. */
  lengths?: { tourId: string; days: number }[];
  /** Stick to the top while scrolling (off when something is shown below the form). */
  sticky?: boolean;
}

const MAX_CHILD_AGE = 17;
const MAX_CHILD_AGES = 10;

/** Last day of the trip: start date + (days - 1), as yyyy-mm-dd. */
function tripEndDate(start: string, days?: number) {
  if (!start || !days) return "";
  const date = new Date(`${start}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + Math.max(0, days - 1));
  return date.toISOString().slice(0, 10);
}

export default function BookingForm({ tour, lengths = [], sticky = true }: BookingFormProps) {
  const contact = useContact();
  const t = useTranslations("booking");
  const tTours = useTranslations("tours");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    date: "",
    endDate: "",
    adults: "2",
    children: "0",
    pickupLocation: "",
    notes: "",
  });
  const [childrenAges, setChildrenAges] = useState<string[]>([]);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [priceNotice, setPriceNotice] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  // Price estimate: the whole-group price for adults + children (live-site price list)
  const count = (value: string) => Math.max(0, Math.floor(Number(value) || 0));
  const adults = count(form.adults);
  const children = count(form.children);
  const persons = adults + children;
  const priced = Boolean(tour.groupPrices?.length);
  const maxPersons = getMaximumPeople(tour);
  const priceRow = priced && persons >= 1 && persons <= maxPersons ? getGroupPrice(tour, persons) : undefined;
  const days = tour.duration || 1;
  // Exact group total in cents; the per-person figure is display only (rounded to the cent)
  const totalCents = priceRow ? Math.round(priceRow.price * 100) : 0;
  const perPersonText = priceRow && persons > 0 ? formatUsd(Math.round(totalCents / persons)) : "";

  // Resend Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Fill the end date from the start date and the tour's length
      if (key === "date" && tour.duration) next.endDate = tripEndDate(value, tour.duration);
      return next;
    });
  };

  const setChildAge = (index: number, value: string) => {
    setChildrenAges((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // OTP යැවීම සහ Resend කිරීමේ පොදු Function එක
  const handleSendOtp = async () => {
    if (!form.name || !form.email) {
      alert("Please enter your name and email first.");
      return;
    }
    if (!form.date) {
      alert(`${t("startDate")} *`);
      return;
    }
    if (adults < 1) {
      alert(t("minimumPeopleError", { count: 1 }));
      return;
    }
    const agesNeeded = Math.min(children, MAX_CHILD_AGES);
    if (childrenAges.slice(0, agesNeeded).filter((age) => age !== "" && age !== undefined).length < agesNeeded) {
      alert(`${t("childrenAges")} *`);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: form.email, action: "send" }),
      });
      const data = await res.json();

      if (data.success) {
        setShowOtpField(true);
        setStatus("idle");
        setTimer(60); // තත්පර 60කට පසු Resend කළ හැක
        setOtp(""); // පරණ OTP එක තිබුනේ නම් එය ඉවත් කරයි
      } else {
        throw new Error(data.error || "Failed to send OTP");
      }
    } catch (error: any) {
      setStatus("error");
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!otp || otp.length < 6) {
      alert("Please enter a valid 6-digit verification code.");
      return;
    }

    setStatus("sending");
    try {
      // OTP Verification
      const verifyRes = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: form.email, otp, action: "verify" }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        alert(verifyData.error || "Invalid or Expired OTP.");
        setStatus("idle");
        return;
      }

      const ages = childrenAges.slice(0, Math.min(children, MAX_CHILD_AGES)).map(Number);

      // Booking Submission
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          date: form.date,
          endDate: form.endDate,
          adults,
          children,
          childrenAges: ages,
          pickupLocation: form.pickupLocation,
          notes: form.notes,
          people: persons,
          // The server works out the price itself from tourId + people; quotedTotal only lets it tell us if the price changed
          tourId: tour.tourId,
          quotedTotal: priceRow?.price,
          itemName: tour.title,
          bookingType: "Tour",
        }),
      });

      const data = await res.json();
      if (res.status === 409 && data.error === "priceChanged") {
        setPriceNotice(t("priceChanged", { price: formatUsd(data.quote.totalCents) }));
        setShowOtpField(false);
        setStatus("idle");
        router.refresh();
        return;
      }
      if (!data.success) throw new Error();
      const confirmed = data.booking as { totalPrice?: number; vehicle?: string } | undefined;

      // Final WhatsApp Redirection
      const lines = [
        "Booking Request (Verified ✅)",
        "",
        `Tour: ${tour.title}`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Country: ${form.country}`,
        `Dates: ${form.date}${form.endDate ? ` – ${form.endDate}` : ""}`,
        `Adults: ${adults}`,
        `Children: ${children}${ages.length ? ` (ages ${ages.join(", ")})` : ""}`,
        confirmed?.totalPrice ? `Price: ${formatUsd(Math.round(confirmed.totalPrice * 100))} USD for ${persons} travellers (${confirmed.vehicle ?? ""})` : "Price: on request",
        `Pickup: ${form.pickupLocation}`,
        `Message: ${form.notes}`,
      ];

      // 'whatsappme' variable එක නිවැරදිව භාවිතා කිරීම
      window.open(`${contact.whatsappme}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-white/[0.07] border border-stone-700 text-white px-2.5 py-2 sm:px-4 sm:py-3 text-sm outline-none focus:border-orange-500 rounded-md transition-all";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1 sm:mb-2 max-sm:truncate";

  return (
    <div className={`bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl ${sticky ? "sticky top-8" : ""}`}>
      <div className="bg-orange-700 px-4 py-3 sm:p-7 text-white">
        <h3 className="text-base sm:text-xl font-bold font-serif leading-snug">{tour.title}</h3>
        <p className="text-xs opacity-80 uppercase tracking-tighter mt-0.5 sm:mt-1">{t("reserveYour")}</p>
      </div>

      <div className="p-4 sm:p-8 space-y-3 sm:space-y-5">
        {!showOtpField ? (
          // STEP 1: Details Entry
          <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:gap-5">
              <div>
                <label className={labelClass}>{t("fullName")} *</label>
                <input className={inputClass} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder={t("namePlaceholder")} autoComplete="name" />
              </div>
              <div>
                <label className={labelClass}>{t("country")}</label>
                <input className={inputClass} value={form.country} onChange={(e) => handleChange("country", e.target.value)} autoComplete="country-name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:gap-5">
              <div className="min-w-0">
                <label className={labelClass}>{t("email")} *</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder={t("emailPlaceholder")} autoComplete="email" />
              </div>
              <div className="min-w-0">
                <label className={labelClass}>{t("whatsapp")}</label>
                <PhoneInput defaultCountry="LK" value={form.phone} onChange={(v) => handleChange("phone", v || "")} className={`phone-input-dark ${inputClass} flex items-center gap-1.5 py-0! sm:py-0!`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div>
                <label className={labelClass}>{t("startDate")} *</label>
                <input className={`${inputClass} scheme-dark`} type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t("endDate")}</label>
                <input className={`${inputClass} scheme-dark`} type="date" value={form.endDate} min={form.date || undefined} onChange={(e) => handleChange("endDate", e.target.value)} />
              </div>
            </div>
            {/* tour length, adults and children share one row */}
            <div className={`grid gap-2.5 sm:gap-4 ${lengths.length > 1 && tour.tourId ? "grid-cols-[1.3fr_1fr_1fr] sm:grid-cols-2 sm:[&>:first-child]:col-span-2" : "grid-cols-2"}`}>
              {lengths.length > 1 && tour.tourId && (
                <div>
                  <label className={labelClass} htmlFor="tourLength">{t("tourLength")}</label>
                  <select
                    id="tourLength"
                    className={`${inputClass} scheme-dark`}
                    value={tour.tourId}
                    onChange={(e) => router.push(`/tours/${e.target.value}#book`)}
                  >
                    {lengths.map((option) => (
                      <option key={option.tourId} value={option.tourId} className="bg-stone-900">
                        {t("daysOption", { days: option.days })}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className={labelClass}>{t("adults")} *</label>
                <input className={inputClass} type="number" min={1} max={100} value={form.adults} onChange={(e) => handleChange("adults", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t("children")}</label>
                <input className={inputClass} type="number" min={0} max={100} value={form.children} onChange={(e) => handleChange("children", e.target.value)} />
              </div>
            </div>

            {children > 0 && (
              <fieldset className="grid grid-cols-2 gap-3">
                <legend className={`${labelClass} col-span-2`}>{t("childrenAges")} *</legend>
                {Array.from({ length: Math.min(children, MAX_CHILD_AGES) }, (_, i) => (
                  <select
                    key={i}
                    aria-label={t("childAge", { n: i + 1 })}
                    className={`${inputClass} scheme-dark`}
                    value={childrenAges[i] ?? ""}
                    onChange={(e) => setChildAge(i, e.target.value)}
                  >
                    <option value="" className="bg-stone-900">{t("childAge", { n: i + 1 })}</option>
                    {Array.from({ length: MAX_CHILD_AGE + 1 }, (_, age) => (
                      <option key={age} value={age} className="bg-stone-900">
                        {age === 0 ? t("underOne") : t("ageYears", { age })}
                      </option>
                    ))}
                  </select>
                ))}
              </fieldset>
            )}

            {/* Price estimate (only tours with a price list, like the live site) */}
            {priced && persons >= 1 && (
              <div className="border border-orange-500/20 bg-orange-500/10 rounded-lg px-3.5 py-3 sm:p-5 text-xs sm:text-sm text-stone-300" aria-live="polite">
                {priceRow ? (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">{t("estimate")}</p>
                    <p className="mt-0.5 sm:mt-1 font-serif text-xl sm:text-3xl font-bold text-white">{formatUsd(totalCents)}</p>
                    <p className="mt-1">
                      {t("estimateTotal", { count: persons, days })}
                      {priceRow.vehicle && <> · {t("vehicleLabel", { vehicle: priceRow.vehicle })}</>}
                    </p>
                    {persons > 1 && <p className="mt-0.5 text-stone-400 max-sm:hidden">{t("perPersonApprox", { price: perPersonText })}</p>}
                    <p className="mt-1.5 sm:mt-3 text-[10px] sm:text-[11px] text-stone-500">{t("estimateNote")}</p>
                  </>
                ) : (
                  <p>{t("largeGroup", { max: maxPersons })}</p>
                )}
              </div>
            )}
            {priceNotice && <p role="alert" className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">{priceNotice}</p>}
            {!priced && tour.price === 0 && <p className="text-sm font-semibold text-white">{tTours("priceOnRequest")}</p>}

            <div>
              <label className={labelClass}>{t("pickup")}</label>
              <input className={inputClass} value={form.pickupLocation} onChange={(e) => handleChange("pickupLocation", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{t("message")}</label>
              <textarea rows={2} className={`${inputClass} min-h-14 sm:min-h-24`} value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} placeholder={t("notesPlaceholder")} />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={status === "sending"}
              className="w-full py-3 sm:py-4 bg-orange-700 hover:bg-orange-600 text-white rounded-md font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Sending OTP..." : "Get Verification Code"}
            </button>
          </>
        ) : (
          // STEP 2: OTP Verification
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-orange-500 shrink-0" size={18} />
              <div className="flex-1">
                <p className="text-xs text-stone-300">
                  Code sent to <span className="text-white font-bold">{form.email}</span>
                </p>
                <button
                  onClick={() => {
                    setShowOtpField(false);
                    setOtp("");
                    setStatus("idle");
                  }}
                  className="text-[10px] text-orange-500 font-bold uppercase mt-1 flex items-center gap-1 hover:underline"
                >
                  <Edit2 size={10} /> Edit Details
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Verification Code</label>
              <input
                className={`${inputClass} text-center text-2xl tracking-[8px] font-bold border-orange-500/50`}
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "sending" || status === "sent"}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Verifying..." : status === "sent" ? "Verified! ✅" : "Confirm Booking"}
            </button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-[10px] text-stone-500">
                  Resend code available in <span className="text-orange-500 font-bold">{timer}s</span>
                </p>
              ) : (
                <button onClick={handleSendOtp} className="text-[10px] text-orange-500 font-bold uppercase flex items-center gap-1 mx-auto hover:text-orange-400 transition-colors">
                  <RefreshCw size={12} className={status === "sending" ? "animate-spin" : ""} /> Resend New OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-3 sm:pt-4 border-t border-white/5 flex flex-wrap justify-center gap-4 text-[10px] text-stone-500 uppercase font-bold tracking-tighter">
          <span className="flex items-center gap-1">
            <CheckCircle size={10} /> No Prepayment
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={10} /> Fast Response
          </span>
        </div>
      </div>
    </div>
  );
}
