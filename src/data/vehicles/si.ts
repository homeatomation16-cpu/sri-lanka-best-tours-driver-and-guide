// ================= COMMON DATA (SINHALA) =================

const commonDriverSi = {
  experience: "වසර 10 ක පළපුරුද්ද",
  languages: [
    "ඉංග්‍රීසි",
    "සිංහල",
    "දෙමළ",
    "චීන",
    "ජපන්",
    "කොරියානු",
    "රුසියානු",
    "ප්‍රංශ",
    "ජර්මන්",
  ],
};

const commonOverviewSi =
  "ශ්‍රී ලංකාව තුළ වෘත්තීය මට්ටමේ පෞද්ගලික රියදුරු සේවාවක් ලබා ගන්න. සංචාරක චාරිකා, දර්ශන නැරඹීම, එක්දින විනෝද චාරිකා, සංස්කෘතික සහ උරුමයන් නැරඹීමේ චාරිකා සහ වනජීවී සෆාරි සඳහා ලබා ගත හැකිය. අපගේ වාහන ඉතා හොඳින් නඩත්තු කර ඇති අතර අපගේ රියදුරන් දේශීය මාර්ග පිළිබඳ මනා දැනුමක් ඇති ප්‍රවීණයන් වේ.";

const commonPaymentPolicySi = [
  "පළමු දිනයේ සම්පූර්ණ ගෙවීම හෝ ධාවනය කරන දුර ප්‍රමාණය අනුව දෛනික ගෙවීම",
  "අවම වෙන්කරවා ගැනීමේ කාලය: දින 3",
  "දිනකට කිලෝමීටර් 170 ක් ඇතුළත් වේ",
  "අමතර ධාවනය සඳහා අමතර ගාස්තු අය කෙරේ",
];

// ================= VEHICLES (SINHALA) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "හොන්ඩා ෆිට් ෂටල් (Honda Fit Shuttle)",
    type: "මෝටර් රථ",
    price: "$55",
    passengers: 4,
    fuel: "හයිබ්‍රිඩ් (Hybrid)",
    transmission: "ඔටෝ (Auto)",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "වායු සමනය කළ (A/C)",
      "සුවපහසු ආසන",
      "ඉන්ධන පිරිමැසුම්දායක",
      "නගර සංචාර සඳහා වඩාත් සුදුසුයි",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "ටොයෝටා ප්‍රියස් (Toyota Prius)",
    type: "මෝටර් රථ",
    price: "$80",
    passengers: 3,
    fuel: "හයිබ්‍රිඩ් (Hybrid)",
    transmission: "ඔටෝ (Auto)",
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
      "පරිසර හිතකාමී හයිබ්‍රිඩ් තාක්ෂණය",
      "ඉතා සුමට ධාවනය",
      "වායු සමනය කළ (A/C)",
      "සුවපහසු ඇතුළත සැකසුම",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "ටොයෝටා ඇක්සියෝ (Toyota Axio)",
    type: "මෝටර් රථ",
    price: "$60",
    passengers: 4,
    fuel: "හයිබ්‍රිඩ් (Hybrid)",
    transmission: "ඔටෝ (Auto)",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "ඉහළ ඉන්ධන කාර්යක්ෂමතාව",
      "නිස්කලංක ධාවනය",
      "වායු සමනය කළ (A/C)",
      "නගරයේ ගමන් බිමන් සඳහා ඉතා හොඳයි",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "හොන්ඩා ග්‍රේස් (Honda Grace)",
    type: "මෝටර් රථ",
    price: "$65",
    passengers: 4,
    fuel: "හයිබ්‍රිඩ් (Hybrid)",
    transmission: "ඔටෝ (Auto)",
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
      "සුඛෝපභෝගී අභ්‍යන්තරය",
      "නිශ්ශබ්ද හයිබ්‍රිඩ් ධාවනය",
      "වායු සමනය කළ (A/C)",
      "සුවපහසු දිගු ගමන්",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "ටොයෝටා KDH හයි-රූෆ් (Toyota KDH Highroof)",
    type: "වෑන් රථ",
    price: "$110",
    passengers: 10,
    fuel: "ඩීසල් (Diesel)",
    transmission: "මැනුවල් (Manual)",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "උසින් වැඩි වහලය (High roof)",
      "ගමන් මලු සඳහා වැඩි ඉඩක්",
      "සංචාර සඳහා සකස් කළ",
      "පවුලේ සංචාර සඳහා වඩාත් සුදුසුයි",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "ටොයෝටා KDH ෆ්ලැට්-රූෆ් VIP (VIP Van)",
    type: "වෑන් රථ",
    price: "$130",
    passengers: 8,
    fuel: "ඩීසල් (Diesel)",
    transmission: "මැනුවල් (Manual)",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "VIP ආසන පහසුකම්",
      "සුවපහසු අභ්‍යන්තර සැකසුම",
      "ඉහළ ප්‍රමිතිය",
      "පෞද්ගලික විශේෂ සංචාර සඳහා ඉතා හොඳයි",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "ටොයෝටා කෝස්ටර් (Toyota Coaster Bus)",
    type: "බස් රථ",
    price: "$180",
    passengers: 25,
    fuel: "ඩීසල් (Diesel)",
    transmission: "මැනුවල් (Manual)",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "පූර්ණ වායු සමනය කළ (Full A/C)",
      "සුවපහසු ආසන",
      "ගමන් මලු සඳහා විශාල ඉඩක්",
      "කණ්ඩායම් සංචාර සඳහා වඩාත් සුදුසුයි",
    ],
    driver: commonDriverSi,
    overview: commonOverviewSi,
    paymentPolicy: commonPaymentPolicySi,
  },
];