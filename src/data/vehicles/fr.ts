// ================= COMMON DATA (FRENCH) =================

const commonDriverFr = {
  experience: "10 ans",
  languages: [
    "Anglais",
    "Cinghalais",
    "Tamoul",
    "Chinois",
    "Japonais",
    "Coréen",
    "Russe",
    "Français",
    "Allemand",
  ],
};

const commonOverviewFr =
  "Louez un chauffeur privé professionnel au Sri Lanka. Disponible pour des circuits complets, des visites guidées, des excursions d'une journée, des visites culturelles et du patrimoine, ainsi que des safaris animaliers. Nos véhicules sont bien entretenus et nos chauffeurs sont experts des routes locales.";

const commonPaymentPolicyFr = [
  "Paiement complet le premier jour OU paiement quotidien basé sur le kilométrage",
  "Réservation minimum : 3 jours",
  "170 km inclus par jour",
  "Des frais de kilométrage supplémentaire s'appliquent",
];

// ================= VEHICLES (FRENCH) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Voiture",
    price: "$55",
    passengers: 4,
    fuel: "Hybride",
    transmission: "Automatique",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "Climatisation",
      "Sièges confortables",
      "Économie de carburant",
      "Idéal pour les visites en ville",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Voiture",
    price: "$80",
    passengers: 3,
    fuel: "Hybride",
    transmission: "Automatique",
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
      "Hybride écologique",
      "Conduite souple",
      "Climatisation",
      "Intérieur confortable",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Voiture",
    price: "$60",
    passengers: 4,
    fuel: "Hybride",
    transmission: "Automatique",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "Économe en carburant",
      "Trajet fluide",
      "Climatisation",
      "Parfait pour les déplacements urbains",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Voiture",
    price: "$65",
    passengers: 4,
    fuel: "Hybride",
    transmission: "Automatique",
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
      "Intérieur de luxe",
      "Conduite hybride silencieuse",
      "Climatisation",
      "Voyage tout confort",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Van",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manuelle",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Toit surélevé",
      "Grand espace pour bagages",
      "Prêt pour les circuits",
      "Idéal pour les familles",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Van",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manuelle",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "Sièges VIP",
      "Toit plat",
      "Intérieur extra confort",
      "Parfait pour les tours privés",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Bus Toyota Coaster AC",
    type: "Bus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manuelle",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Entièrement climatisé",
      "Sièges confortables",
      "Grand espace bagages",
      "Idéal pour les groupes",
    ],
    driver: commonDriverFr,
    overview: commonOverviewFr,
    paymentPolicy: commonPaymentPolicyFr,
  },
];