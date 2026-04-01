// ================= COMMON DATA (PORTUGUESE) =================

const commonDriverPt = {
  experience: "10 Anos",
  languages: [
    "Inglês",
    "Cingalês",
    "Tâmil",
    "Chinês",
    "Japonês",
    "Coreano",
    "Russo",
    "Francês",
    "Alemão",
  ],
};

const commonOverviewPt =
  "Contrate um motorista particular profissional no Sri Lanka. Disponível para viagens de ida e volta, passeios turísticos, excursões de um dia, passeios culturais e de patrimônio e safaris de vida selvagem. Nossos veículos são bem mantidos e nossos motoristas são especialistas em rotas locais.";

const commonPaymentPolicyPt = [
  "Pagamento integral no primeiro dia OU pagamento diário baseado na quilometragem",
  "Reserva mínima: 3 dias",
  "170 km incluídos por dia",
  "Taxas extras de quilometragem se aplicam",
];

// ================= VEHICLES (PORTUGUESE) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Carro",
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
      "Ar Condicionado",
      "Assentos confortáveis",
      "Eficiente em combustível",
      "Ideal para passeios na cidade",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Carro",
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
      "Condução suave",
      "Ar Condicionado",
      "Interior confortável",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Carro",
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
      "Eficiente em combustível",
      "Viagem suave",
      "Ar Condicionado",
      "Perfeito para viagens urbanas",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Carro",
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
      "Interior de luxo",
      "Condução híbrida silenciosa",
      "Ar Condicionado",
      "Viagem confortável",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Van",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Teto alto",
      "Grande espaço para bagagem",
      "Pronto para passeios",
      "Ideal para famílias",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Van",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "Assentos VIP",
      "Design de teto plano",
      "Interior extra confortável",
      "Perfeito para tours privados",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Ônibus Toyota Coaster AC",
    type: "Ônibus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manual",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Ar Condicionado central",
      "Assentos confortáveis",
      "Grande espaço para bagagem",
      "Ideal para tours em grupo",
    ],
    driver: commonDriverPt,
    overview: commonOverviewPt,
    paymentPolicy: commonPaymentPolicyPt,
  },
];