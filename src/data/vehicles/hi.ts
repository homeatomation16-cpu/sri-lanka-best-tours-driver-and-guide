// ================= COMMON DATA (HINDI) =================

const commonDriverHi = {
  experience: "10 वर्ष",
  languages: [
    "अंग्रेजी",
    "सिंहली",
    "तमिल",
    "चीनी",
    "जापानी",
    "कोरियाई",
    "रूसी",
    "फ्रेंच",
    "जर्मन",
  ],
};

const commonOverviewHi =
  "श्रीलंका में एक पेशेवर निजी ड्राइवर किराए पर लें। राउंड टूर, दर्शनीय स्थलों की यात्रा, एक दिवसीय भ्रमण, संस्कृति और विरासत यात्रा और वन्यजीव सफारी के लिए उपलब्ध। हमारे वाहन अच्छी तरह से रखरखाव किए गए हैं और हमारे ड्राइवर स्थानीय रास्तों के विशेषज्ञ हैं।";

const commonPaymentPolicyHi = [
  "पहले दिन पूर्ण भुगतान या माइलेज के आधार पर दैनिक भुगतान",
  "न्यूनतम बुकिंग: 3 दिन",
  "प्रति दिन 170 किमी शामिल",
  "अतिरिक्त माइलेज शुल्क लागू",
];

// ================= VEHICLES (HINDI) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "होंडा फिट शटल",
    type: "कार",
    price: "$55",
    passengers: 4,
    fuel: "हाइब्रिड",
    transmission: "ऑटोमैटिक",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "एयर कंडीशनिंग",
      "आरामदायक सीटें",
      "ईंधन कुशल",
      "शहर के दौरों के लिए आदर्श",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "टोयोटा प्रियस",
    type: "कार",
    price: "$80",
    passengers: 3,
    fuel: "हाइब्रिड",
    transmission: "ऑटोमैटिक",
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
      "पर्यावरण अनुकूल हाइब्रिड",
      "सुगम ड्राइविंग",
      "एयर कंडीशनिंग",
      "आरामदायक इंटीरियर",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "टोयोटा एक्सियो",
    type: "कार",
    price: "$60",
    passengers: 4,
    fuel: "हाइब्रिड",
    transmission: "ऑटोमैटिक",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "ईंधन कुशल",
      "सुगम सवारी",
      "एयर कंडीशनिंग",
      "शहर की यात्रा के लिए उपयुक्त",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "होंडा ग्रेस",
    type: "कार",
    price: "$65",
    passengers: 4,
    fuel: "हाइब्रिड",
    transmission: "ऑटोमैटिक",
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
      "लक्जरी इंटीरियर",
      "शांत हाइब्रिड ड्राइव",
      "एयर कंडीशनिंग",
      "आरामदायक यात्रा",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "टोयोटा KDH हाईरूफ",
    type: "वैन",
    price: "$110",
    passengers: 10,
    fuel: "डीजल",
    transmission: "मैनुअल",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "ऊंची छत",
      "सामान के लिए बड़ा स्थान",
      "यात्रा के लिए तैयार",
      "परिवार के अनुकूल",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "टोयोटा KDH फ्लैटरूफ VIP वैन",
    type: "वैन",
    price: "$130",
    passengers: 8,
    fuel: "डीजल",
    transmission: "मैनुअल",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "वीआईपी बैठने की व्यवस्था",
      "फ्लैट रूफ डिजाइन",
      "अतिरिक्त आरामदायक इंटीरियर",
      "निजी यात्राओं के लिए बिल्कुल सही",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "टोयोटा कोस्टर एसी बस",
    type: "बस",
    price: "$180",
    passengers: 25,
    fuel: "डीजल",
    transmission: "मैनुअल",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "पूर्ण वातानुकूलित (AC)",
      "आरामदायक सीटें",
      "सामान के लिए बड़ा स्थान",
      "समूह यात्राओं के लिए आदर्श",
    ],
    driver: commonDriverHi,
    overview: commonOverviewHi,
    paymentPolicy: commonPaymentPolicyHi,
  },
];