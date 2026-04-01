"use client";

import { useTranslations } from "next-intl";
import { PACKAGE_PRICES_EN } from "@/data/packageprices/en";

const USD_RATE = 300; // ඔයාගේ වර්තමාන Rate එක මෙතනට දාන්න

export default function PackagePrice() {
  const t = useTranslations("rates");

  // LKR වලින් තියෙන මිල USD වලට හරවන function එක
  const convertToUSD = (lkr: number) => {
    return (lkr / USD_RATE).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-[#d4a853] font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1209] font-serif">
            {t("title")}
          </h2>
          <div className="mt-6 mx-auto h-1 w-20 bg-[#d4a853]" />
        </div>

        {/* Pricing Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-2xl shadow-orange-100/50">
          <table className="min-w-full border-collapse bg-white text-left">
            <thead>
              <tr className="bg-[#1a1209] text-white font-sans text-[11px] uppercase tracking-widest">
                <th className="px-6 py-5 font-semibold">{t("headers.destination")}</th>
                <th className="px-6 py-5 font-semibold text-center">{t("headers.car")}</th>
                <th className="px-6 py-5 font-semibold text-center">{t("headers.van")}</th>
                <th className="px-6 py-5 font-semibold text-center">{t("headers.bus")}</th>
                <th className="px-6 py-5 font-semibold">{t("headers.duration")}</th>
                <th className="px-6 py-5 font-semibold">{t("headers.distance")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PACKAGE_PRICES_EN.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="group transition-colors hover:bg-orange-50/40"
                >
                  {/* Destination Name - Translated using ID */}
                  <td className="px-6 py-5">
                    <span className="block font-serif text-base font-bold text-gray-800">
                      {t(`destinations.${item.id}`)}
                    </span>
                  </td>

                  {/* Pricing Columns */}
                  <td className="px-6 py-5 text-center">
                    <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">
                      {convertToUSD(item.car)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600">
                      {convertToUSD(item.van)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
                      {convertToUSD(item.bus)}
                    </span>
                  </td>

                  {/* Duration & Distance */}
                  <td className="px-6 py-5">
                    <span className="font-sans text-xs text-gray-500 italic">
                      {item.estimatedDuration}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-sans text-sm font-medium text-gray-600">
                      {item.mileageKm} {t("units.km")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 text-center">
          <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">
            * All prices are subject to current exchange rates and include highway tolls where specified.
          </p>
        </div>
      </div>
    </section>
  );
}