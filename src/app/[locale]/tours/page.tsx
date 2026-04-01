import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  await connectDB();
  // Database එකෙන් සියලුම active tours ලබා ගැනීම
  const toursRaw = await Tour.find({ status: "active" }).lean();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">{t("heading")}</h1>
        <p className="text-lg opacity-90">{t("season")}</p>
      </div>

      {/* Tours List */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        {toursRaw.map((tour: any) => {
          // අදාළ භාෂාවට අදාළ දත්ත තෝරා ගැනීම (Fallback to English)
          const data = tour.translations?.[locale] || tour.translations?.["en"];

          return (
            <div
              key={tour._id.toString()}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative md:w-1/3 h-64 md:h-auto">
                <Image src={tour.image} alt={data?.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>

              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
                      {tour.duration} {t("days")}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{data?.title}</h2>
                  <p className="text-gray-600 mb-4">{t("seasonDesc")}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-500">{t("from")} USD</p>
                    <p className="text-2xl font-bold text-orange-600">${tour.price?.toFixed(2)}</p>
                  </div>
                  <Link
                    href={`/${locale}/tours/${tour.tourId}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}