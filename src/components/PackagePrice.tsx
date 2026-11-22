"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { PACKAGE_PRICES_EN } from "@/data/packageprices/en";

const USD_RATE = 300; // ඔයාගේ වර්තමාන Rate එක මෙතනට දාන්න
/** Rows shown before "See more". */
const PREVIEW_ROWS = 5;

export default function PackagePrice() {
  const t = useTranslations("rates");
  const [expanded, setExpanded] = useState(false);

  // LKR වලින් තියෙන මිල USD වලට හරවන function එක
  const convertToUSD = (lkr: number) =>
    (lkr / USD_RATE).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const rows = expanded ? PACKAGE_PRICES_EN : PACKAGE_PRICES_EN.slice(0, PREVIEW_ROWS);
  const hasMore = PACKAGE_PRICES_EN.length > PREVIEW_ROWS;
  const price = "inline-block rounded-full px-2 py-0.5 text-xs font-bold sm:px-2.5 sm:py-1 sm:text-sm";

  return (
    <section className="bg-white px-3 py-6 sm:px-4 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-center sm:mb-10">
          <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a853] sm:mb-3 sm:text-xs sm:tracking-[0.3em]">{t("subtitle")}</p>
          <h2 className="font-serif text-2xl font-bold text-[#1a1209] sm:text-4xl">{t("title")}</h2>
          <div className="mx-auto mt-3 h-1 w-14 bg-[#d4a853] sm:mt-5 sm:w-20" />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-lg shadow-orange-100/40">
          <table className="w-full border-collapse bg-white text-left">
            <thead>
              <tr className="bg-[#1a1209] font-sans text-[10px] uppercase tracking-wider text-white sm:text-[11px] sm:tracking-widest">
                <th className="px-3 py-3 font-semibold sm:px-3 sm:py-4">{t("headers.destination")}</th>
                <th className="px-1.5 py-3 text-center font-semibold sm:px-3 sm:py-4">{t("headers.car")}</th>
                <th className="px-1.5 py-3 text-center font-semibold sm:px-3 sm:py-4">{t("headers.van")}</th>
                <th className="px-1.5 py-3 text-center font-semibold sm:px-3 sm:py-4">{t("headers.bus")}</th>
                <th className="hidden px-3 py-4 font-semibold md:table-cell">{t("headers.duration")}</th>
                <th className="hidden px-3 py-4 font-semibold md:table-cell">{t("headers.distance")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-orange-50/40">
                  <td className="px-3 py-2.5 sm:px-3 sm:py-4">
                    <span className="block font-serif text-sm font-bold leading-tight text-gray-800 sm:text-base">{t(`destinations.${item.id}`)}</span>
                    {/* phones: duration and distance under the name instead of two extra columns */}
                    <span className="mt-0.5 block text-[10px] text-gray-500 md:hidden">
                      {item.estimatedDuration} · {item.mileageKm} {t("units.km")}
                    </span>
                  </td>
                  <td className="px-1.5 py-2.5 text-center sm:px-3 sm:py-4"><span className={`${price} bg-orange-50 text-orange-600`}>{convertToUSD(item.car)}</span></td>
                  <td className="px-1.5 py-2.5 text-center sm:px-3 sm:py-4"><span className={`${price} bg-amber-50 text-amber-600`}>{convertToUSD(item.van)}</span></td>
                  <td className="px-1.5 py-2.5 text-center sm:px-3 sm:py-4"><span className={`${price} bg-red-50 text-red-600`}>{convertToUSD(item.bus)}</span></td>
                  <td className="hidden px-3 py-4 md:table-cell"><span className="font-sans text-xs italic text-gray-500">{item.estimatedDuration}</span></td>
                  <td className="hidden px-3 py-4 md:table-cell"><span className="font-sans text-sm font-medium text-gray-600">{item.mileageKm} {t("units.km")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hasMore && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d4a853]/60 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#a07830] transition-colors hover:bg-[#d4a853] hover:text-[#1a1209] sm:text-sm"
            >
              {expanded ? t("seeLess") : `${t("seeMore")} (${PACKAGE_PRICES_EN.length - PREVIEW_ROWS})`}
              <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        <p className="mt-4 text-center font-sans text-[9px] uppercase tracking-wider text-gray-400 sm:mt-6 sm:text-[10px] sm:tracking-widest">
          * All prices are subject to current exchange rates and include highway tolls where specified.
        </p>
      </div>
    </section>
  );
}
