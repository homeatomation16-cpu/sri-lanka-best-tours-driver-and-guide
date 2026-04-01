// ================= COMMON DATA (RUSSIAN) =================

const commonDriverRu = {
  experience: "10 лет",
  languages: [
    "Английский",
    "Сингальский",
    "Тамильский",
    "Китайский",
    "Японский",
    "Корейский",
    "Русский",
    "Французский",
    "Немецкий",
  ],
};

const commonOverviewRu =
  "Арендуйте профессионального частного водителя на Шри-Ланке. Доступно для экскурсионных туров, осмотра достопримечательностей, однодневных поездок, культурных туров и сафари по дикой природе. Наши автомобили находятся в отличном техническом состоянии, а водители — эксперты по местным маршрутам.";

const commonPaymentPolicyRu = [
  "Полная оплата в первый день ИЛИ ежедневная оплата в зависимости от пробега",
  "Минимальное бронирование: 3 дня",
  "Включено 170 км в день",
  "Применяется дополнительная плата за превышение лимита км",
];

// ================= VEHICLES (RUSSIAN) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Легковой автомобиль",
    price: "$55",
    passengers: 4,
    fuel: "Гибрид",
    transmission: "Автомат",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "Кондиционер",
      "Комфортные сиденья",
      "Экономичный расход топлива",
      "Идеально для городских туров",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Легковой автомобиль",
    price: "$80",
    passengers: 3,
    fuel: "Гибрид",
    transmission: "Автомат",
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
      "Экологичный гибрид",
      "Плавный ход",
      "Кондиционер",
      "Комфортный интерьер",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Легковой автомобиль",
    price: "$60",
    passengers: 4,
    fuel: "Гибрид",
    transmission: "Автомат",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "Экономичный расход",
      "Тихая езда",
      "Кондиционер",
      "Отлично для городских поездок",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Легковой автомобиль",
    price: "$65",
    passengers: 4,
    fuel: "Гибрид",
    transmission: "Автомат",
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
      "Люксовый интерьер",
      "Бесшумный гибридный привод",
      "Кондиционер",
      "Комфортные путешествия",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Микроавтобус",
    price: "$110",
    passengers: 10,
    fuel: "Дизель",
    transmission: "Механика",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "Высокая крыша",
      "Большое багажное отделение",
      "Готов к турам",
      "Подходит для семей",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Микроавтобус",
    price: "$130",
    passengers: 8,
    fuel: "Дизель",
    transmission: "Механика",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "VIP сиденья",
      "Дизайн с плоской крышей",
      "Экстра-комфортный интерьер",
      "Идеально для частных туров",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Автобус",
    price: "$180",
    passengers: 25,
    fuel: "Дизель",
    transmission: "Механика",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "Полное кондиционирование",
      "Удобные кресла",
      "Много места для багажа",
      "Идеально для групповых туров",
    ],
    driver: commonDriverRu,
    overview: commonOverviewRu,
    paymentPolicy: commonPaymentPolicyRu,
  },
];