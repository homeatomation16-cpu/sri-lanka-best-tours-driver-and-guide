// ================= COMMON DATA (SPANISH) =================

const commonDriverEs = {
  experience: "10 años",
  languages: [
    "Inglés",
    "Cingalés",
    "Tamil",
    "Chino",
    "Japonés",
    "Coreano",
    "Ruso",
    "Francés",
    "Alemán",
  ],
};

const commonOverviewEs =
  "Contrate un conductor privado profesional en Sri Lanka. Disponible para recorridos de ida y vuelta, turismo, excursiones de un día, recorridos culturales y de patrimonio, y safaris de vida silvestre. Nuestros vehículos están bien mantenidos y nuestros conductores son expertos en rutas locales.";

const commonPaymentPolicyEs = [
  "Pago total el primer día O pago diario basado en el kilometraje",
  "Reserva mínima: 3 días",
  "170 km incluidos por día",
  "Se aplican cargos por kilometraje adicional",
];

// ================= VEHICLES (SPANISH) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Coche",
    price: "$55",
    passengers: 4,
    fuel: "Híbrido",
    transmission: "Automático",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "Aire acondicionado",
      "Asientos confortables",
      "Eficiente en combustible",
      "Ideal para recorridos por la ciudad",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Coche",
    price: "$80",
    passengers: 3,
    fuel: "Híbrido",
    transmission: "Automático",
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
      "Híbrido ecológico",
      "Conducción suave",
      "Aire acondicionado",
      "Interior confortable",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Coche",
    price: "$60",
    passengers: 4,
    fuel: "Híbrido",
    transmission: "Automático",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "Eficiente en combustible",
      "Viaje suave",
      "Aire acondicionado",
      "Perfecto para viajes urbanos",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Coche",
    price: "$65",
    passengers: 4,
    fuel: "Híbrido",
    transmission: "Automático",
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
      "Interior de lujo",
      "Conducción híbrida silenciosa",
      "Aire acondicionado",
      "Viaje confortable",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Furgoneta",
    price: "$110",
    passengers: 10,
    fuel: "Diésel",
    transmission: "Manual",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Techo alto",
      "Amplio espacio para equipaje",
      "Lista para recorridos",
      "Ideal para familias",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Furgoneta",
    price: "$130",
    passengers: 8,
    fuel: "Diésel",
    transmission: "Manual",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "Asientos VIP",
      "Diseño de techo plano",
      "Interior extra confortable",
      "Perfecta para tours privados",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Autobús",
    price: "$180",
    passengers: 25,
    fuel: "Diésel",
    transmission: "Manual",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Aire acondicionado completo",
      "Asientos cómodos",
      "Gran espacio para equipaje",
      "Ideal para tours en grupo",
    ],
    driver: commonDriverEs,
    overview: commonOverviewEs,
    paymentPolicy: commonPaymentPolicyEs,
  },
];