// Text for the Privacy, Terms, Cookie and FAQ pages (English for every language).
// Facts here describe how this site actually works; review with the business owner before relying on them legally.

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };
export type LegalDoc = { path: string; eyebrow: string; title: string; summary: string; updated: string; sections: LegalSection[] };

const UPDATED = "22 November 2026";

export const PRIVACY: LegalDoc = {
  path: "/privacy-policy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  summary: "What we collect when you plan or book a private tour with us, why we need it and how you can control it.",
  updated: UPDATED,
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Sri Lanka Best Tours Driver & Guide is a private chauffeur and tour service based in Sri Lanka. This policy covers this website and the enquiries and bookings made through it. The contact details at the end of this page reach the person responsible for your data.",
      ],
    },
    {
      heading: "Information we collect",
      list: [
        "Details you give us in booking, tailor-made and contact forms: name, email address, WhatsApp or phone number, country, travel dates, number of adults and children (and children's ages), pickup location, accommodation and activity preferences, and any message you write.",
        "Your email address and a one-time code when you verify a booking request by email.",
        "Account details if you create an account or sign in, so you can see your requests and bookings.",
        "Anonymous visit statistics: the page viewed, language, referring site and a random browser id kept in your browser's local storage. We do not store your IP address for these statistics.",
      ],
    },
    {
      heading: "How we use it",
      list: [
        "To answer your enquiry, prepare a quote and plan your itinerary.",
        "To confirm and run your tour: assigning a vehicle and driver-guide, arranging pickups and keeping in touch before and during the trip.",
        "To check that a booking request really comes from you (email verification).",
        "To understand which pages are useful and improve the website.",
        "To meet legal, accounting and tax obligations.",
      ],
      paragraphs: ["We do not sell your personal information and we do not use it for third-party advertising."],
    },
    {
      heading: "Sharing your information",
      paragraphs: [
        "We share only what is needed to deliver your tour: for example your name, pickup details and dates with the driver-guide assigned to you, and with hotels or activity providers you ask us to book. When you choose to continue a booking on WhatsApp, the message you send is handled by WhatsApp under its own privacy policy. We use hosting, database and email service providers to run the website; they process data on our behalf only.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Enquiries that do not become bookings are kept for up to 24 months so we can answer follow-up questions. Booking records are kept for as long as accounting and tax rules require. You can ask us to delete your information sooner where the law allows.",
      ],
    },
    {
      heading: "Your rights",
      list: [
        "Ask for a copy of the personal information we hold about you.",
        "Ask us to correct or update it.",
        "Ask us to delete it, or to stop using it for a particular purpose.",
        "Withdraw consent you have given, at any time.",
      ],
      paragraphs: ["Contact us using the details below and we will reply within 30 days."],
    },
    {
      heading: "Security",
      paragraphs: [
        "The website uses encrypted connections (HTTPS), sign-in is protected, and access to booking records is limited to the people who need them to run your tour. No online service can be completely secure, so please do not send card numbers or passport scans through our forms.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Our services are booked by adults. We only hold information about children (such as their ages) when a parent or guardian provides it to plan a family trip.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: ["We may update this policy when our services change. The date at the top of the page shows the latest version."],
    },
  ],
};

export const TERMS: LegalDoc = {
  path: "/terms-and-conditions",
  eyebrow: "Legal",
  title: "Terms & Conditions",
  summary: "The terms that apply when you use this website and book a private tour, transfer or excursion with us.",
  updated: UPDATED,
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        "These terms apply between you and Sri Lanka Best Tours Driver & Guide when you use this website or book our services. By sending a booking request you confirm that you have read them and that you are at least 18 years old.",
      ],
    },
    {
      heading: "Booking requests and confirmation",
      list: [
        "A request sent through the website is not a confirmed booking. We review availability and reply with a confirmation or quote.",
        "Your booking is confirmed only when we confirm it to you in writing (email or WhatsApp).",
        "Please check your dates, names, pickup location and number of travellers in our confirmation and tell us straight away if anything is wrong.",
      ],
    },
    {
      heading: "Prices and payment",
      list: [
        "Prices on the website are shown in US dollars as estimates. Prices in other currencies are approximate conversions.",
        "The final price is the one in our written confirmation. It depends on the route, number of days, vehicle and number of travellers.",
        "No prepayment is taken on this website. Any deposit or payment method is agreed with you when we confirm the booking.",
        "Unless your confirmation says otherwise, tour prices include the private vehicle, driver-guide, fuel, highway tolls and parking. Entrance tickets, meals, activities and personal expenses are not included.",
      ],
    },
    {
      heading: "Changes and cancellations",
      list: [
        "Tell us as early as possible if you need to change or cancel. We will always try to adjust your itinerary.",
        "Any cancellation charges, for example where hotels or activities have already been paid for on your behalf, are explained in your booking confirmation before you accept it.",
        "We may change a route, vehicle or timing for safety reasons, because of weather, road conditions or events outside our control. If we have to cancel, you will receive a full refund of anything paid to us for the cancelled service.",
      ],
    },
    {
      heading: "During your tour",
      list: [
        "Please be ready at the agreed pickup time and place. Long waits may affect the rest of the day's plan.",
        "Seat belts must be worn, and children need suitable seats — tell us their ages when booking so we can arrange them.",
        "Daily driving hours are planned for safety. Your driver-guide may refuse a request that would break traffic laws or put passengers at risk.",
        "Smoking and illegal substances are not allowed in our vehicles. Damage caused deliberately or through misuse may be charged.",
      ],
    },
    {
      heading: "Travel documents and insurance",
      paragraphs: [
        "You are responsible for valid passports, visas (including Sri Lanka's ETA), health requirements and travel insurance. We recommend insurance that covers medical costs, cancellation and personal belongings.",
      ],
    },
    {
      heading: "Our responsibility",
      paragraphs: [
        "We provide our services with reasonable care and skill. We are not responsible for services supplied by third parties such as hotels, airlines, trains or activity operators, or for delays and losses caused by events outside our reasonable control. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      heading: "Website use",
      paragraphs: [
        "Photos, text and design on this website belong to us or are used with permission (see Photo credits). Please do not copy them for commercial use. We try to keep information accurate but descriptions, opening times and prices of attractions may change.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: ["These terms are governed by the laws of Sri Lanka. If a problem arises, please contact us first — most issues can be solved quickly by talking to us."],
    },
  ],
};

export const COOKIES: LegalDoc = {
  path: "/cookie-policy",
  eyebrow: "Legal",
  title: "Cookie Policy",
  summary: "The small number of cookies and browser storage items this website uses, and how to control them.",
  updated: UPDATED,
  sections: [
    {
      heading: "What cookies are",
      paragraphs: [
        "Cookies are small text files a website saves in your browser. Similar technologies, such as local storage, keep small pieces of information on your device. We use only a few, mainly to make the site work and remember your choices.",
      ],
    },
    {
      heading: "Cookies we use",
      list: [
        "NEXT_LOCALE — remembers the language you chose. Essential; removed when you close your browser.",
        "site_theme — remembers light or dark mode. Preference; kept for up to 1 year.",
        "sl_customer — keeps you signed in to your traveller account. Essential; set only when you sign in and removed when you sign out or it expires (after 30 days).",
        "Staff sign-in cookies (next-auth) — used only on the admin area by our team, never for visitors.",
      ],
    },
    {
      heading: "Browser storage we use",
      list: [
        "A random visitor id (vid) in local storage, used for anonymous page-view counts. It contains no personal information and is not shared with advertisers.",
      ],
    },
    {
      heading: "Third-party content",
      paragraphs: [
        "Some pages show an embedded Google Map. When it loads, Google may set its own cookies under the Google privacy policy. Links to WhatsApp, Facebook, Instagram, YouTube and TripAdvisor take you to those services, which apply their own cookie rules. We do not use advertising or cross-site tracking cookies.",
      ],
    },
    {
      heading: "Managing cookies",
      paragraphs: [
        "You can block or delete cookies in your browser settings. If you block essential cookies, language selection and sign-in may not work. Clearing your browser's site data also removes the local storage items listed above.",
      ],
    },
  ],
};

export const FAQ_DOC = {
  path: "/faq",
  eyebrow: "Help",
  title: "Frequently Asked Questions",
  summary: "Quick answers about booking a private driver-guide, prices, vehicles and travelling around Sri Lanka.",
  updated: UPDATED,
};

export const FAQ_GROUPS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Booking",
    items: [
      { q: "How do I book a tour?", a: "Open a tour, excursion or the Tailor-Made Tours page, fill in the form and verify your email with the code we send. We then confirm availability and the final price by email or WhatsApp. You can also message us on WhatsApp directly." },
      { q: "Do I have to pay in advance?", a: "No prepayment is taken on the website. Any deposit and the payment method are agreed with you when we confirm your booking." },
      { q: "How quickly will you reply?", a: "We usually reply within a few hours and always within 24 hours. WhatsApp is the fastest way to reach us." },
      { q: "Can you change a tour to suit us?", a: "Yes. Every tour is private, so the route, pace, hotels and activities can be adjusted. Use the Tailor-Made Tours form to build a trip from scratch." },
      { q: "How do I change or cancel a booking?", a: "Contact us as early as possible by email or WhatsApp. Any charges are explained in your booking confirmation; see our Terms & Conditions for details." },
    ],
  },
  {
    heading: "Prices",
    items: [
      { q: "What is included in the price?", a: "Tour prices normally include a private air-conditioned vehicle, your English-speaking chauffeur-guide, fuel, highway tolls and parking. Hotels are included only when your quote says so. Entrance tickets, meals and activities are paid separately unless stated." },
      { q: "Why is the price on the website an estimate?", a: "The final price depends on the exact route, number of days, vehicle and travellers. We confirm it in writing before you accept the booking." },
      { q: "Can I see prices in my own currency?", a: "Yes. Use the currency converter button on the screen to convert a US dollar price into your currency. Bookings are quoted in US dollars." },
    ],
  },
  {
    heading: "Vehicles & drivers",
    items: [
      { q: "What vehicles do you use?", a: "Air-conditioned cars for couples and small families, vans for groups and coaches for larger parties. See the Vehicles page for each model and how many people it carries." },
      { q: "Is the driver also a guide?", a: "Yes. Our chauffeur-guides are licensed, speak English and know the routes, history and best stops." },
      { q: "Can you provide child seats?", a: "Yes, on request. Tell us the children's ages when you book so the right seats are ready." },
      { q: "Do you offer airport transfers?", a: "Yes. We meet you at Bandaranaike International Airport (CMB) and can also arrange transfers on your departure day. The price table on each excursion page shows fixed rates from the airport." },
    ],
  },
  {
    heading: "Travelling in Sri Lanka",
    items: [
      { q: "When is the best time to visit?", a: "Sri Lanka is a year-round destination. The south and west coasts are best from November to April, and the east coast from May to September. We plan routes around the season." },
      { q: "Do I need a visa?", a: "Most visitors need an Electronic Travel Authorization (ETA) before arrival. Please check the official requirements for your passport before you travel." },
      { q: "Is it safe to travel with a private driver?", a: "Yes. A private driver-guide lets you travel at your own pace with someone who knows local roads, customs and weather, and who can help if plans need to change." },
    ],
  },
];
