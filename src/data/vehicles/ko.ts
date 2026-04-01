// ================= COMMON DATA (KOREAN) =================

const commonDriverKo = {
  experience: "10년",
  languages: [
    "영어",
    "싱할라어",
    "타밀어",
    "중국어",
    "일본어",
    "한국어",
    "러시아어",
    "프랑스어",
    "독일어",
  ],
};

const commonOverviewKo =
  "스리랑카에서 전문 프라이빗 드라이버를 예약하세요. 라운드 투어, 관광, 일일 투어, 문화 및 유산 투어, 야생동물 사파리 등 다양한 여정에 이용 가능합니다. 철저히 관리된 차량과 현지 경로에 능숙한 드라이버가 안전한 여행을 약속합니다.";

const commonPaymentPolicyKo = [
  "첫날 전액 지불 또는 주행 거리 기준 일일 지불",
  "최소 예약 기간: 3일",
  "하루 170km 포함",
  "추가 주행 거리 요금 적용",
];

// ================= VEHICLES (KOREAN) =================

export const vehicles = [
  // 1. HONDA FIT SHUTTLE
  {
    id: "honda-fit",
    name: "혼다 피트 셔틀",
    type: "승용차",
    price: "$55",
    passengers: 4,
    fuel: "하이브리드",
    transmission: "자동",
    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],
    features: [
      "에어컨 완비",
      "편안한 좌석",
      "우수한 연비",
      "시내 관광에 최적",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 2. TOYOTA PRIUS
  {
    id: "toyota-prius",
    name: "토요타 프리우스",
    type: "승용차",
    price: "$80",
    passengers: 3,
    fuel: "하이브리드",
    transmission: "자동",
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
      "친환경 하이브리드",
      "부드러운 주행",
      "에어컨 완비",
      "쾌적한 실내",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 3. TOYOTA AXIO
  {
    id: "toyota-axio",
    name: "토요타 악시오",
    type: "승용차",
    price: "$60",
    passengers: 4,
    fuel: "하이브리드",
    transmission: "자동",
    image: "/toyota-axio/toyota-axio-1.jpeg",
    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],
    features: [
      "연비 효율성",
      "정숙한 승차감",
      "에어컨 완비",
      "도시 여행에 적합",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 4. HONDA GRACE
  {
    id: "honda-grace",
    name: "혼다 그레이스",
    type: "승용차",
    price: "$65",
    passengers: 4,
    fuel: "하이브리드",
    transmission: "자동",
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
      "고급스러운 실내",
      "조용한 하이브리드 주행",
      "에어컨 완비",
      "편안한 여행",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 5. TOYOTA KDH HIGHROOF VAN
  {
    id: "toyota-kdh",
    name: "토요타 KDH 하이루프",
    type: "밴",
    price: "$110",
    passengers: 10,
    fuel: "디젤",
    transmission: "수동",
    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],
    features: [
      "높은 천장",
      "넓은 수하물 공간",
      "투어 맞춤형",
      "가족 여행에 적합",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 6. TOYOTA KDH FLATROOF VIP VAN
  {
    id: "kdh-vip-flatroof",
    name: "토요타 KDH 플랫루프 VIP 밴",
    type: "밴",
    price: "$130",
    passengers: 8,
    fuel: "디젤",
    transmission: "수동",
    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],
    features: [
      "VIP 시트",
      "플랫루프 디자인",
      "최고의 안락한 실내",
      "프라이빗 투어에 최적",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },

  // 7. TOYOTA COASTER AC BUS
  {
    id: "toyota-coaster",
    name: "토요타 코스터 AC 버스",
    type: "버스",
    price: "$180",
    passengers: 25,
    fuel: "디젤",
    transmission: "수동",
    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],
    features: [
      "풀 에어컨 시스템",
      "편안한 좌석",
      "대용량 수하물 공간",
      "단체 투어에 최적",
    ],
    driver: commonDriverKo,
    overview: commonOverviewKo,
    paymentPolicy: commonPaymentPolicyKo,
  },
];