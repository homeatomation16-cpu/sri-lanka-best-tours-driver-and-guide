// ================= COMMON DATA (TAMIL) =================

const commonDriverTa = {
  experience: "10 வருட அனுபவம்",
  languages: [
    "ஆங்கிலம்",
    "சிங்களம்",
    "தமிழ்",
    "சீனம்",
    "ஜப்பானிய மொழி",
    "கொரிய மொழி",
    "ரஷ்ய மொழி",
    "பிரஞ்சு",
    "ஜெர்மன்",
  ],
};

const commonOverviewTa =
  "இலங்கையில் ஒரு தொழில்முறை தனியார் ஓட்டுநரை வாடகைக்கு அமர்த்துங்கள். சுற்றுப்பயணங்கள், சுற்றிப் பார்த்தல், ஒரு நாள் உல்லாசப் பயணங்கள், கலாச்சார மற்றும் பாரம்பரிய சுற்றுப்பயணங்கள் மற்றும் வனவிலங்கு சபாரிகளுக்குக் கிடைக்கும். எமது வாகனங்கள் சிறப்பாக பராமரிக்கப்படுகின்றன, மேலும் எமது ஓட்டுநர்கள் உள்ளூர் வழிகளில் நிபுணத்துவம் பெற்றவர்கள்.";

const commonPaymentPolicyTa = [
  "முதல் நாளில் முழு செலுத்துகை அல்லது மைலேஜ் அடிப்படையில் தினசரி செலுத்துகை",
  "குறைந்தபட்ச முன்பதிவு: 3 நாட்கள்",
  "ஒரு நாளைக்கு 170 கி.மீ உள்ளடங்கும்",
  "கூடுதல் மைலேஜிற்கு கூடுதல் கட்டணம் விதிக்கப்படும்",
];

// ================= VEHICLES (TAMIL) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "ஹோண்டா ஃபிட் ஷட்டில் (Honda Fit Shuttle)",
    type: "கார்",
    price: "$55",
    passengers: 4,
    fuel: "ஹைப்ரிட்",
    transmission: "ஆட்டோ",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "குளிர்சாதன வசதி (A/C)",
      "வசதியான இருக்கைகள்",
      "குறைந்த எரிபொருள் பயன்பாடு",
      "நகர சுற்றுப்பயணங்களுக்கு சிறந்தது",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "டொயோட்டா பிரியஸ் (Toyota Prius)",
    type: "கார்",
    price: "$80",
    passengers: 3,
    fuel: "ஹைப்ரிட்",
    transmission: "ஆட்டோ",
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
      "சூழல் நட்பு ஹைப்ரிட்",
      "மென்மையான ஓட்டம்",
      "குளிர்சாதன வசதி (A/C)",
      "வசதியான உட்புறம்",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "டொயோட்டா ஆக்சியோ (Toyota Axio)",
    type: "கார்",
    price: "$60",
    passengers: 4,
    fuel: "ஹைப்ரிட்",
    transmission: "ஆட்டோ",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "எரிபொருள் திறன் மிக்கது",
      "நிதானமான பயணம்",
      "குளிர்சாதன வசதி (A/C)",
      "நகர பயணங்களுக்கு ஏற்றது",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "ஹோண்டா கிரேஸ் (Honda Grace)",
    type: "கார்",
    price: "$65",
    passengers: 4,
    fuel: "ஹைப்ரிட்",
    transmission: "ஆட்டோ",
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
      "ஆடம்பரமான உட்புறம்",
      "சத்தமற்ற ஹைப்ரிட் ஓட்டம்",
      "குளிர்சாதன வசதி (A/C)",
      "வசதியான பயணம்",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "டொயோட்டா KDH ஹைரூஃப் (Toyota KDH Highroof)",
    type: "வேன்",
    price: "$110",
    passengers: 10,
    fuel: "டீசல்",
    transmission: "மேனுவல்",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "உயரமான கூரை (High roof)",
      "பெரிய லக்கேஜ் வசதி",
      "சுற்றுப்பயணத்திற்கு தயார்",
      "குடும்பங்களுக்கு ஏற்றது",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "டொயோட்டா KDH விஐபி வேன் (VIP Van)",
    type: "வேன்",
    price: "$130",
    passengers: 8,
    fuel: "டீசல்",
    transmission: "மேனுவல்",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "விஐபி இருக்கைகள்",
      "தட்டையான கூரை வடிவமைப்பு",
      "அதிக வசதியான உட்புறம்",
      "தனியார் சுற்றுப்பயணங்களுக்கு சிறந்தது",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "டொயோட்டா கோஸ்டர் ஏசி பஸ் (Toyota Coaster Bus)",
    type: "பஸ்",
    price: "$180",
    passengers: 25,
    fuel: "டீசல்",
    transmission: "மேனுவல்",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "முழுமையான குளிர்சாதன வசதி",
      "வசதியான இருக்கைகள்",
      "பெரிய லக்கேஜ் வசதி",
      "குழு சுற்றுப்பயணங்களுக்கு ஏற்றது",
    ],
    driver: commonDriverTa,
    overview: commonOverviewTa,
    paymentPolicy: commonPaymentPolicyTa,
  },
];