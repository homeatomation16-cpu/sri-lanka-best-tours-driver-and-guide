import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  await connectDB();
  // tourId එක මගින් දත්ත සෙවීම
  const tourRaw = await Tour.findOne({ tourId: id }).lean();
  
  if (!tourRaw) notFound();

  // translations එකෙන් locale එකට අදාළ දත්ත ගැනීම
  const tourData = (tourRaw as any).translations?.[locale] || (tourRaw as any).translations?.["en"];
  const t = await getTranslations({ locale, namespace: 'tours' });

  // UI එකට අවශ්‍ය විදිහට object එක සකස් කරමු
  const tour = {
    ...tourRaw,
    ...tourData, // title, overview, itinerary, etc. මෙතැනට එයි
  };

  const itinerary = tour.itinerary ?? [];

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-sans">
      {/* ── Hero ── */}
      <section className="relative h-[90vh] min-h-150 overflow-hidden pt-20">
         {/* ... ඔයාගේ දැනට තියෙන Hero UI එකම පාවිච්චි කරන්න ... */}
         {/* image එකේ sizes prop එක අමතක කරන්න එපා */}
         <Image 
            src={tour.image} 
            alt={tour.title} 
            fill 
            className="object-cover" 
            sizes="100vw" 
            priority 
         />
         {/* ... ඉතිරි UI දත්ත (Title, Stats bar, etc.) ... */}
      </section>

      <div className="max-w-7xl mx-auto px-12 py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-14">
            {/* Overview */}
            <section>
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-orange-600 mb-4">{t('overview')}</p>
              <p className="text-base leading-relaxed text-stone-600">{tour.overview}</p>
            </section>

            {/* Itinerary ලූප් එකේදී tour.itinerary පාවිච්චි කරන්න */}
            {/* ... */}
          </div>

          <div className="lg:col-span-1">
             <BookingForm tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
}