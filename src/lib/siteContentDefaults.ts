import type { Localized } from "./autoTranslate";

const L = (en: string): Localized => ({ en });
const CLD = "https://res.cloudinary.com/dj5mylqf1/video/upload";

const hero = (path: string, title: string, subtitle: string) => ({
  id: path,
  type: "video" as const,
  enabled: true,
  src: `${CLD}/${path}`,
  title: L(title),
  subtitle: L(subtitle),
});

/** What the website shows today – used to pre-fill the admin editor the first time. */
export const DEFAULT_HERO = {
  items: [
    hero("v1783181658/286459_large_idzt2a.mp4", "Mirissa Beach", "Golden sunsets & whale watching paradise"),
    hero("v1783182985/191283-889685028_medium_rwgv8o.mp4", "Sigiriya Rock Fortress", "Ancient wonder of Sri Lanka"),
    hero("v1778170579/ella_kez34u.mp4", "Ella Scenic Train", "World's most beautiful train ride"),
    hero("v1783185896/Ocean_Beach_Waves._Free_Stock_Video_-_Pixabay_p1hnsn.mp4", "Coastal Waves", "Endless ocean views along the shoreline"),
    hero("v1783185801/Sri_Lanka_Ceylon_18_Bends._Free_Stock_Video_-_Pixabay_wftxyr.mp4", "The Eighteen Bends", "Winding mountain roads through tea country"),
    hero("v1783185656/Tower_Landmark_Sunrise._Free_Stock_Video_-_Pixabay_x7bisu.mp4", "Sunrise Over the City", "Iconic landmarks lit by first light"),
    hero("v1783185415/Sri_Lanka_Videos__Download_66_Free_4K_HD_Stock_Footage_Clips_-_Pixabay_rhnxs3.mp4", "Island Highlights", "A glimpse of Sri Lanka's natural beauty"),
    hero("v1783185215/Bridge_Old_Bridge_River._Free_Stock_Video_-_Pixabay_kswiko.mp4", "Historic River Bridge", "Timeless crossings over Sri Lanka's rivers"),
    hero("v1783184326/242272_m0xkut.mov", "Elephants in Sri Lanka", "Discover the island's natural wonders"),
    hero("v1783184040/211328_gj1fd0.mov", "Scenic Sri Lanka", "Discover the island's hidden beauty"),
  ],
};

const g = (n: string, alt: string, caption: string) => ({ id: n, enabled: true, src: `/gallery/${n}`, alt: L(alt), caption: L(caption) });

export const DEFAULT_GALLERY = {
  items: [
    g("gallery-01.jpeg", "Sigiriya Rock Fortress", "Climb the iconic Sigiriya Rock Fortress"),
    g("gallery-02.jpeg", "Kandy Temple of the Tooth", "Sacred Temple of the Tooth in Kandy"),
    g("gallery-03.jpeg", "Ella Nine Arch Bridge", "Famous Nine Arch Bridge in Ella"),
    g("gallery-04.jpeg", "Mirissa Beach", "Relax at Mirissa Beach"),
    g("gallery-05.jpeg", "Udawalawe Safari", "Wildlife Safari Experience"),
    g("gallery-06.jpeg", "Luxury Hotel in Habarana", "Comfortable stay in Habarana"),
    g("gallery-07.jpeg", "Kandy Hotel View", "Beautiful hill country accommodation"),
    g("gallery-08.jpeg", "Ella Mountain View", "Mountain sunrise in Ella"),
    g("gallery-09.jpeg", "Beach Hotel Mirissa", "Beachfront hotel in Mirissa"),
    g("gallery-10.jpeg", "Negombo Lagoon", "Negombo Lagoon Boat Tour"),
    g("gallery-11.jpeg", "Dambulla Cave Temple", "Ancient Dambulla Cave Temple"),
    g("gallery-12.jpeg", "Ella Rock View", "Hiking Ella Rock"),
    g("gallery-13.jpeg", "Yala Safari Jeep", "Yala National Park Safari"),
    g("gallery-14.jpeg", "Pasikuda Beach", "Crystal clear waters of Pasikuda"),
    g("gallery-15.jpeg", "Pigeon Island", "Snorkeling at Pigeon Island"),
  ],
  heading: { label: L("GALLERY"), title: L("Travel Moments") },
};

export const DEFAULT_TAILOR = {
  image: "/tailor-made-sri-lanka.jpg",
  label: L("Tailor Made Tours"),
  heading: L("Design Your Perfect"),
  desc: L("Personalize every detail of your Sri Lankan adventure. Our experts will craft a unique itinerary just for you."),
  subtext1: L("Discover Sri Lanka your way — journeys designed entirely around you."),
  subtext2: L("Romantic honeymoon, family adventure, or exclusive luxury escape — our specialists craft seamless itineraries with exclusive access."),
  buttonPrimary: L("Design My Journey"),
  buttonSecondary: L("Talk to a specialist →"),
  tags: [L("Avg. 14 Days"), L("100% Private"), L("Fully Guided")],
};

export const DEFAULTS: Record<string, any> = { hero: DEFAULT_HERO, gallery: DEFAULT_GALLERY, tailorMade: DEFAULT_TAILOR };
