// ================= COMMON DATA (ARABIC) =================

const commonDriver = {
  experience: "10 سنوات",
  languages: [
    "الإنجليزية",
    "السينهالية",
    "التاميلية",
    "الصينية",
    "اليابانية",
    "الكورية",
    "الروسية",
    "الفرنسية",
    "الألمانية",
  ],
};

const commonOverview =
  "استأجر سائقًا خاصًا محترفًا في سريلانكا. متوفر للجولات السياحية، ومشاهدة المعالم، والرحلات اليومية، وجولات التراث والثقافة، ورحلات السفاري البرية. مركباتنا مصانة جيدًا وسائقونا خبراء في الطرق المحلية.";

const commonPaymentPolicy = [
  "الدفع الكامل في اليوم الأول أو الدفع اليومي حسب المسافة المقطوعة",
  "الحد الأدنى للحجز: 3 أيام",
  "تشمل 170 كم في اليوم الواحد",
  "تطبق رسوم إضافية على المسافات الزائدة",
];

// ================= VEHICLES (ARABIC) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "هوندا فيت شاتل",
    type: "سيارة",
    price: "$55",
    passengers: 4,
    fuel: "هجين (Hybrid)",
    transmission: "أوتوماتيك",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "تكييف هواء",
      "مقاعد مريحة",
      "كفاءة في استهلاك الوقود",
      "مثالية لجولات المدينة",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "تويوتا بريوس",
    type: "سيارة",
    price: "$80",
    passengers: 3,
    fuel: "هجين (Hybrid)",
    transmission: "أوتوماتيك",
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
      "هجين صديق للبيئة",
      "قيادة سلسة",
      "تكييف هواء",
      "تصميم داخلي مريح",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "تويوتا أكسيو",
    type: "سيارة",
    price: "$60",
    passengers: 4,
    fuel: "هجين (Hybrid)",
    transmission: "أوتوماتيك",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "كفاءة في استهلاك الوقود",
      "قيادة مريحة",
      "تكييف هواء",
      "مثالية للتنقل داخل المدينة",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "هوندا جريس",
    type: "سيارة",
    price: "$65",
    passengers: 4,
    fuel: "هجين (Hybrid)",
    transmission: "أوتوماتيك",
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
      "تصميم داخلي فاخر",
      "قيادة هجين هادئة",
      "تكييف هواء",
      "سفر مريح",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "تويوتا KDH سقف عالي",
    type: "فان",
    price: "$110",
    passengers: 10,
    fuel: "ديزل",
    transmission: "يدوي",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "سقف مرتفع",
      "مساحة واسعة للأمتعة",
      "جاهزة للجولات السياحية",
      "مناسبة للعائلات",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "تويوتا KDH سقف مسطح VIP",
    type: "فان",
    price: "$130",
    passengers: 8,
    fuel: "ديزل",
    transmission: "يدوي",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "مقاعد VIP",
      "تصميم سقف مسطح",
      "تصميم داخلي فائق الراحة",
      "مثالية للجولات الخاصة",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "حافلة تويوتا كوستر مكيفة",
    type: "حافلة",
    price: "$180",
    passengers: 25,
    fuel: "ديزل",
    transmission: "يدوي",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "تكييف هواء كامل",
      "مقاعد مريحة",
      "مساحة كبيرة للأمتعة",
      "مثالية للمجموعات",
    ],
    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },
];

export default vehicles;