// ================= COMMON DATA (GERMAN) =================

const commonDriverDe = {
  experience: "10 Jahre",
  languages: [
    "Englisch",
    "Singhalesisch",
    "Tamil",
    "Chinesisch",
    "Japanisch",
    "Koreanisch",
    "Russisch",
    "Französisch",
    "Deutsch",
  ],
};

const commonOverviewDe =
  "Mieten Sie einen professionellen privaten Fahrer in Sri Lanka. Verfügbar für Rundreisen, Besichtigungen, Tagesausflüge, Kultur- und Erbe-Touren sowie Wildtier-Safaris. Unsere Fahrzeuge sind bestens gewartet und unsere Fahrer sind Experten für lokale Routen.";

const commonPaymentPolicyDe = [
  "Vollständige Zahlung am ersten Tag ODER tägliche Zahlung basierend auf den Kilometern",
  "Mindestbuchung: 3 Tage",
  "170 km pro Tag inklusive",
  "Zusätzliche Kilometergebühren fallen an",
];

// ================= VEHICLES (GERMAN) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Auto",
    price: "$55",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Automatik",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "Klimaanlage",
      "Komfortsitze",
      "Kraftstoffeffizient",
      "Ideal für Stadttouren",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Auto",
    price: "$80",
    passengers: 3,
    fuel: "Hybrid",
    transmission: "Automatik",
    image: "/toyota-prius/toyota-prius-10.jpg",
    gallery: [
      "/toyota-prius/toyota-prius-1.jpg",
      "/toyota-prius/toyota-prius-2.jpg",
      "/toyota-prius/toyota-prius-3.jpg",
      "/toyota-prius/toyota-prius-4.jpg",
      "/toyota-prius/toyota-prius-5.jpg",
      "/toyota-prius/toyota-prius-6.jpg",
      "/toyota-prius/toyota-prius-7.jpg",
      "/toyota-prius/toyota-prius-8.jpg",
      "/toyota-prius/toyota-prius-9.jpg",
      "/toyota-prius/toyota-prius-10.jpg",
    ],
    features: [
      "Umweltfreundlicher Hybrid",
      "Sanftes Fahrverhalten",
      "Klimaanlage",
      "Komfortables Interieur",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Auto",
    price: "$60",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Automatik",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "Kraftstoffeffizient",
      "Ruhige Fahrt",
      "Klimaanlage",
      "Perfekt für Stadtfahrten",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Auto",
    price: "$65",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Automatik",
    image: "/honda-grace/honda-grace-1.jpeg",
    gallery: [
      "/honda-grace/honda-grace-1.jpeg",
      "/honda-grace/honda-grace-2.jpeg",
      "/honda-grace/honda-grace-3.jpeg",
      "/honda-grace/honda-grace-4.jpeg",
      "/honda-grace/honda-grace-5.jpeg",
      "/honda-grace/honda-grace-6.jpeg",
    ],
    features: [
      "Luxuriöses Interieur",
      "Geräuscharmer Hybridantrieb",
      "Klimaanlage",
      "Komfortables Reisen",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Kleinbus",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manuell",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Hochdach",
      "Viel Platz für Gepäck",
      "Bereit für Rundreisen",
      "Familienfreundlich",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Kleinbus",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manuell",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "VIP-Bestuhlung",
      "Flachdach-Design",
      "Besonders komfortables Interieur",
      "Perfekt für private Touren",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Bus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manuell",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Vollklimatisiert",
      "Bequeme Sitze",
      "Viel Stauraum für Gepäck",
      "Ideal für Gruppentouren",
    ],
    driver: commonDriverDe,
    overview: commonOverviewDe,
    paymentPolicy: commonPaymentPolicyDe,
  },
];