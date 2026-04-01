"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { EXCURSIONS } from "../../../data/excursions";

export default function ExcursionsPage() {
  const t = useTranslations("excursions");
  const tCat = useTranslations("excursionPage.categories"); // Categories පරිවර්තනය සඳහා

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = ["All", ...new Set(EXCURSIONS.map((i) => i.category))];

  const filtered = EXCURSIONS.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  )
    .filter((item) => (filter === "All" ? true : item.category === filter))
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <main className="min-h-screen bg-[#faf7f2] font-serif">
      {/* HERO */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden text-center">
        <Image
          src="/excursions-cover.jpg"
          alt="Sri Lanka Excursions"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-white">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#d4a853]">
            {t("label")}
          </p>
          <h1
            className="mb-5 text-5xl font-bold md:text-7xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {t("title")}
          </h1>
          <div className="mb-5 h-px w-20 bg-[#d4a853]" />
          <p className="max-w-md font-sans text-sm font-light text-gray-200 md:text-base">
            {t("subtitle")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#faf7f2] to-transparent" />
      </section>

      {/* SEARCH + FILTER + SORT */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-60 rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#d4a853]"
          />
          
          {/* Category Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#d4a853]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? t("allCategories") : tCat(cat)}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#d4a853]"
          >
            <option value="default">{t("sortLabel")}</option>
            <option value="az">{t("sortAZ")}</option>
            <option value="za">{t("sortZA")}</option>
          </select>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6">
          {filtered.map((item, index) => (
            <Link
              key={item.id}
              href={`/excursions/${item.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1209]/80 via-[#1a1209]/20 to-transparent" />
              </div>
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1209]/70 font-sans text-[10px] font-bold text-[#d4a853] backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="mb-1.5 h-px w-5 bg-[#d4a853] transition-all duration-300 group-hover:w-10" />
                <p className="font-sans text-xs font-semibold text-white sm:text-sm">
                  {/* මෙතන item.title එක කෙලින්ම එන්නේ data file එකෙන් නිසා ඒක භාෂාව අනුව වෙනස් වේවි */}
                  {item.title}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 font-sans text-[10px] font-medium uppercase tracking-widest text-[#d4a853] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {t("explore")} →
                </span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4a853] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER TAGLINE */}
      <div className="pb-14 text-center">
        <div className="mx-auto h-px w-20 bg-[#d4a853]/40" />
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-[#9e8e7e]">
          {t("footerTagline")}
        </p>
      </div>
    </main>
  );
}