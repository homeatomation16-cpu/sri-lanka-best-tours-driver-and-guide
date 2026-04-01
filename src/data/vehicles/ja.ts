// ================= COMMON DATA (JAPANESE) =================

const commonDriverJa = {
  experience: "10年",
  languages: [
    "英語",
    "シンハラ語",
    "タミル語",
    "中国語",
    "日本語",
    "韓国語",
    "ロシア語",
    "フランス語",
    "ドイツ語",
  ],
};

const commonOverviewJa =
  "スリランカでのプロのプライベートドライバーを予約しましょう。周遊ツアー、観光、日帰り旅行、文化・遺産ツアー、野生動物サファリにご利用いただけます。車両はメンテナンスが行き届いており、ドライバーは現地のルートに精通しています。";

const commonPaymentPolicyJa = [
  "初日に全額支払い、または走行距離に応じた日払い",
  "最低予約期間：3日間",
  "1日あたり170kmを含む",
  "追加走行距離料金が適用されます",
];

// ================= VEHICLES (JAPANESE) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "ホンダ フィットシャトル",
    type: "乗用車",
    price: "$55",
    passengers: 4,
    fuel: "ハイブリッド",
    transmission: "オートマ",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "エアコン完備",
      "快適なシート",
      "低燃費",
      "市内観光に最適",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "トヨタ プリウス",
    type: "乗用車",
    price: "$80",
    passengers: 3,
    fuel: "ハイブリッド",
    transmission: "オートマ",
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
      "環境に優しいハイブリッド",
      "スムーズな走行",
      "エアコン完備",
      "快適なインテリア",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "トヨタ カローラアクシオ",
    type: "乗用車",
    price: "$60",
    passengers: 4,
    fuel: "ハイブリッド",
    transmission: "オートマ",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "燃費性能に優れる",
      "静かな乗り心地",
      "エアコン完備",
      "都市部での移動に最適",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "ホンダ グレイス",
    type: "乗用車",
    price: "$65",
    passengers: 4,
    fuel: "ハイブリッド",
    transmission: "オートマ",
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
      "豪華な内装",
      "静かなハイブリッド走行",
      "エアコン完備",
      "快適な旅をお約束",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "トヨタ ハイエース KDH ハイルーフ",
    type: "バン",
    price: "$110",
    passengers: 10,
    fuel: "ディーゼル",
    transmission: "マニュアル",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "ハイルーフ",
      "広い荷物スペース",
      "ツアー対応",
      "ファミリー・団体向け",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "トヨタ ハイエース KDH 標準ルーフ VIP仕様",
    type: "バン",
    price: "$130",
    passengers: 8,
    fuel: "ディーゼル",
    transmission: "マニュアル",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "VIPシート",
      "標準ルーフデザイン",
      "最高級の快適な内装",
      "プライベートツアーに最適",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "トヨタ コースター ACバス",
    type: "バス",
    price: "$180",
    passengers: 25,
    fuel: "ディーゼル",
    transmission: "マニュアル",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "フルエアコン完備",
      "快適な座席",
      "大容量の荷物スペース",
      "団体ツアーに最適",
    ],
    driver: commonDriverJa,
    overview: commonOverviewJa,
    paymentPolicy: commonPaymentPolicyJa,
  },
];