// ================= COMMON DATA (ITALIAN) =================

const commonDriverIt = {
  experience: "10 anni",
  languages: [
    "Inglese",
    "Singalese",
    "Tamil",
    "Cinese",
    "Giapponese",
    "Coreano",
    "Russo",
    "Francese",
    "Tedesco",
  ],
};

const commonOverviewIt =
  "Noleggia un autista privato professionista in Sri Lanka. Disponibile per tour completi, visite guidate, escursioni giornaliere, tour culturali e del patrimonio e safari naturalistici. I nostri veicoli sono ben mantenuti e i nostri autisti sono esperti dei percorsi locali.";

const commonPaymentPolicyIt = [
  "Pagamento completo il primo giorno OPPURE pagamento giornaliero basato sul chilometraggio",
  "Prenotazione minima: 3 giorni",
  "170 km inclusi al giorno",
  "Si applicano costi per chilometraggio extra",
];

// ================= VEHICLES (ITALIAN) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Auto",
    price: "$55",
    passengers: 4,
    fuel: "Ibrido",
    transmission: "Automatico",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "Aria Condizionata",
      "Sedili comfort",
      "Efficienza nei consumi",
      "Ideale per tour in città",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Auto",
    price: "$80",
    passengers: 3,
    fuel: "Ibrido",
    transmission: "Automatico",
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
      "Ibrido eco-friendly",
      "Guida fluida",
      "Aria Condizionata",
      "Interni confortevoli",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Auto",
    price: "$60",
    passengers: 4,
    fuel: "Ibrido",
    transmission: "Automatico",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "Efficienza nei consumi",
      "Guida rilassante",
      "Aria Condizionata",
      "Perfetta per viaggi urbani",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Auto",
    price: "$65",
    passengers: 4,
    fuel: "Ibrido",
    transmission: "Automatico",
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
      "Interni di lusso",
      "Guida ibrida silenziosa",
      "Aria Condizionata",
      "Viaggio comfort",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Van",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manuale",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Tetto alto",
      "Ampio spazio per i bagagli",
      "Pronto per i tour",
      "Ideale per le famiglie",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Van",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manuale",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "Sedili VIP",
      "Design a tetto piatto",
      "Interni extra comfort",
      "Perfetta per tour privati",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Autobus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manuale",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Completamente climatizzato",
      "Sedili confortevoli",
      "Grande spazio per bagagli",
      "Ideale per tour di gruppo",
    ],
    driver: commonDriverIt,
    overview: commonOverviewIt,
    paymentPolicy: commonPaymentPolicyIt,
  },
];