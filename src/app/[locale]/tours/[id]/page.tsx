import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function TourDetailsPage({ params }: Props) {
  const { locale, id } = await params;

  // 1. Database එකට සම්බන්ධ වීම
  await connectDB();

  // 2. tourId එක මගින් දත්ත සෙවීම
  const tourRaw = await Tour.findOne({ tourId: id }).lean();
  
  if (!tourRaw) notFound();

  // 3. Serialization Fix: ObjectId වැනි සංකීර්ණ දත්ත සරල Plain Objects බවට පත් කිරීම
  // Client Components (BookingForm) වලට දත්ත යැවීමේදී මෙය අත්‍යවශ්‍ය වේ.
  const tourPlain = JSON.parse(JSON.stringify(tourRaw));

  // 4. අදාළ භාෂාවට අදාළ දත්ත තෝරාගැනීම (Fallback to English)
  const translation = tourPlain.translations?.[locale] || tourPlain.translations?.["en"];
  
  // භාෂා ගොනු (messages JSON) වලින් පරිවර්තන ලබාගැනීම
  const t = await getTranslations({ locale, namespace: 'tours' });

  // 5. අවසාන දත්ත Object එක සකස් කිරීම
  const tour = {
    ...tourPlain,
    ...translation, // title, overview, itinerary, included, excluded මෙතැනට එයි
  };

  const itinerary = tour.itinerary ?? [];

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-sans">

      {/* ── Hero Section ── */}
      <section className="relative h-[90vh] min-h-150 overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover brightness-[0.85]"
            priority
            quality={90}
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-800" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/80" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-16 pb-10 max-lg:px-10 max-sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-amber-400" />
              <h1 className="text-[10px] font-medium tracking-[0.3em] uppercase text-amber-300">
                 {t('tagline')}
              </h1>
            </div>
            <h1 className="font-serif text-4xl lg:text-7xl font-semibold text-white leading-tight max-w-4xl tracking-tight max-sm:text-3xl">
              {tour.title}
            </h1>
          </div>

          {/* Stats Bar */}
          <div className="bg-black/50 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-16 max-lg:px-10 max-sm:px-6">
              <div className="flex flex-wrap divide-x divide-white/20">
                {[
                  { label: t('duration'), value: `${tour.duration} ${tour.duration === 1 ? t('day') : t('days')}` },
                  { label: t('priceFrom'), value: tour.price ? `$${tour.price}` : '—' },
                  { label: t('maxGroup'), value: tour.maxPeople ? `${tour.maxPeople} ${t('pax')}` : `10 ${t('pax')}` },
                  { label: t('minAge'), value: tour.minAge ? `${tour.minAge}+` : '12+' },
                ].map((item, i) => (
                  <div key={i} className="px-8 py-5 max-sm:px-5 max-sm:py-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-white leading-none">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-12 py-20 max-lg:px-8 max-sm:px-5 max-sm:py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16">

          {/* Left Column */}
          <div className="space-y-16">

            {/* Overview */}
            {tour.overview && (
              <section>
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-600 mb-6">
                  {t('overview')}
                </p>
                <p className="text-lg leading-relaxed text-stone-600 font-light">
                  {tour.overview}
                </p>
              </section>
            )}

            {/* Included / Excluded Grid */}
            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-stone-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('included')}
                </h3>
                <ul className="space-y-3">
                  {tour.included?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                      <span className="text-emerald-500 mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-stone-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {t('notIncluded')}
                </h3>
                <ul className="space-y-3">
                  {tour.excluded?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                      <span className="text-red-400 mt-0.5">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Itinerary Section */}
            {itinerary.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-12">
                  <h2 className="font-serif text-4xl font-semibold text-stone-900">{t('itinerary')}</h2>
                  <span className="text-stone-400 text-sm">({itinerary.length} {t('days')})</span>
                </div>

                <div className="space-y-10 border-l-2 border-stone-100 ml-4 pl-8">
                  {itinerary.map((day: any, index: number) => (
                    <div key={index} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-10.25 top-0 w-5 h-5 rounded-full bg-white border-4 border-orange-500 group-hover:scale-125 transition-transform" />
                      
                      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group-hover:shadow-xl transition-all">
                         <div className="grid md:grid-cols-[250px_1fr]">
                            <div className="relative h-48 md:h-full min-h-48">
                               <Image 
                                  src={day.image || '/placeholder-tour.jpg'} 
                                  alt={`Day ${index + 1}`} 
                                  fill 
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 250px"
                               />
                            </div>
                            <div className="p-8">
                               <span className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2 block">
                                 {t('day')} {index + 1}
                               </span>
                               <h3 className="text-xl font-bold text-stone-900 mb-4">{day.title}</h3>
                               <p className="text-stone-500 text-sm leading-relaxed mb-6 italic">{day.description}</p>
                               
                               {day.activities && (
                                 <div className="flex flex-wrap gap-2">
                                   {day.activities.map((act: string, ai: number) => (
                                     <span key={ai} className="bg-stone-50 text-stone-600 px-3 py-1.5 rounded-lg text-[11px] font-medium border border-stone-100">
                                       + {act}
                                     </span>
                                   ))}
                                 </div>
                                )}

                                {day.overnight && (
                                  <div className="mt-6 pt-4 border-t border-stone-50 flex items-center gap-2 text-emerald-700 font-bold text-xs">
                                    <span>🌙</span> {day.overnight}
                                  </div>
                                )}
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Booking Form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              {/* මෙතැනට tourPlain එක යැවීමට මතක තබාගන්න */}
              <BookingForm tour={tour} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}