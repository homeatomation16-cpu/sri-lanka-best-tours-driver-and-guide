export const TOURS = [
  /* =====================================================
     1 DAY TOURS (Tagesausflüge)
  ===================================================== */
  {
    id: "galle-one-day-tour",
    title: "Galle Tagestour",
    image: "/tours/galle-one-day-tour.jpg",
    price: 80,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Private Tagestour",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie die Galle Tagestour mit 'Sri Lanka Tours Driver'. Sri Lanka ist ein wunderbares tropisches Land. Unsere Fahrer sind erfahrene, englischsprachige professionelle Touristenfahrer. Mieten Sie einen persönlichen Fahrer mit Privatwagen für Ihre Reise und genießen Sie eine komfortable und unvergessliche Fahrt nach Galle und zur Südküste.",

    vehicleInfo: [
      "1 - 3 Personen ← Privatwagen",
      "4 - 10 Personen ← KDH Van",
      "11 - 20 Personen ← Minibus",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Abholung & Rücktransfer",
      "Kraftstoff & Parkgebühren",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Galle",
        image: "/tours/galle.jpg",
        description:
          "Genießen Sie eine malerische Fahrt entlang der südlichen Küstenstraße mit mehreren Sightseeing-Stopps.",
        activities: [
          "Stopp am Bentota-Strand",
          "Madu-Fluss-Bootsafari (Optional)",
          "Besuch der Schildkröten-Aufzuchtstation",
          "Galle Holländisches Fort",
          "Leuchtturm von Galle",
          "Shopping & Café-Zeit",
        ],
        overnight: "Rückkehr nach Colombo / Negombo",
      },
    ],
  },
  {
    id: "kandy-one-day-tour",
    title: "Kandy Tagestour",
    image: "/tours/kandy-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Private Tagestour",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie die Kandy Tagestour mit 'Sri Lanka Tours Driver'. Mieten Sie einen persönlichen Fahrer mit Privatwagen und genießen Sie eine komfortable und unvergessliche Fahrt in die Kulturhauptstadt Sri Lankas — Kandy.",

    vehicleInfo: [
      "1 - 3 Personen ← Privatwagen",
      "4 - 10 Personen ← KDH Van",
      "11 - 20 Personen ← Minibus",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Abholung & Rücktransfer",
      "Kraftstoff & Parkgebühren",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Genießen Sie eine malerische Fahrt nach Kandy mit kulturellen und naturkundlichen Erlebnissen unterwegs.",
        activities: [
          "Pinnawala Elefantenwaisenhaus (Optional)",
          "Gewürzgartenbesuch in Mawanella",
          "Teefabrik & Teeverkostung",
          "Spaziergang am Kandy-See",
          "Tempel der Heiligen Zahnreliquie",
          "Kulturelle Tanzshow (Optional)",
        ],
        overnight: "Rückkehr nach Colombo / Negombo",
      },
    ],
  },
  {
    id: "sigiriya-one-day-tour",
    title: "Sigiriya Tagestour",
    image: "/tours/sigiriya-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Private Tagestour",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie die Sigiriya Tagestour mit 'Sri Lanka Tours Driver'. Genießen Sie eine komfortable und unvergessliche Fahrt zur ikonischen Sigiriya-Felsfestung und zu nahegelegenen Attraktionen.",

    vehicleInfo: [
      "1 - 3 Personen ← Privatwagen",
      "4 - 10 Personen ← KDH Van",
      "11 - 20 Personen ← Minibus",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Abholung & Rücktransfer",
      "Kraftstoff & Parkgebühren",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Sigiriya",
        image: "/tours/sigiriya.jpg",
        description:
          "Genießen Sie eine malerische Fahrt nach Sigiriya mit kulturellen und naturkundlichen Erlebnissen unterwegs.",
        activities: [
          "Pinnawala Elefantenwaisenhaus (Optional)",
          "Dambulla-Höhlentempel",
          "Besteigung der Sigiriya-Felsfestung",
          "Dorftour mit traditionellem Mittagessen (Optional)",
          "Besteigung des Pidurangala-Felsens (Optional)",
        ],
        overnight: "Rückkehr nach Colombo / Negombo",
      },
    ],
  },
  {
    id: "Udawalawa-Safari-one-day-tour",
    title: "Udawalawe Tagestour",
    image: "/tours/udawalawa-safari-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Private Tagestour",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie die Udawalawe Tagestour mit 'Sri Lanka Tours Driver'. Genießen Sie eine komfortable und unvergessliche Fahrt zum Udawalawe Nationalpark, einem der besten Wildlife-Safari-Ziele Sri Lankas.",

    vehicleInfo: [
      "1 - 3 Personen ← Privatwagen",
      "4 - 10 Personen ← KDH Van",
      "11 - 20 Personen ← Minibus",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Abholung & Rücktransfer",
      "Kraftstoff & Parkgebühren",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Udawalawe",
        image: "/tours/udawalawa-safari-one-day-tour.jpg",
        description:
          "Genießen Sie eine malerische Fahrt nach Udawalawe voller faszinierender Wildtiere.",
        activities: [
          "Elefanten-Transitheim in Udawalawe (Fütterungszeiten)",
          "Jeep-Safari im Udawalawe Nationalpark",
          "Fahrt durch Ratnapura (Stadt der Edelsteine)",
        ],
        overnight: "Rückkehr nach Colombo / Negombo",
      },
    ],
  },

  /* =====================================================
     05 DAYS TOURS
  ===================================================== */
  {
    id: "05-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "5-Tage-Südtour",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 283.5,
    image: "/tours/05-days-down-south-tour.jpg",

    overview:
      "Diese 5-tägige Südtour umfasst Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella und Mirissa oder Hikkaduwa. Erleben Sie Kultur, Wildlife-Safari, Hügelland-Zugreise und wunderschöne Südküstenstrände mit einem professionellen englischsprachigen Fahrerführer.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote: "567 $ für 2 Personen - VIP Luxuswagen (mit Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff",
      "Parkgebühren",
      "24-Stunden-Notdienst",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahntickets (Maut)",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Zugticket(s)",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Flughafen / Colombo nach Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Abholung vom Flughafen oder Hotel",
          "Hiriwadunna Dorftour mit Kochkurs",
          "Ökopark-Safari ODER Pidurangala-Sonnenuntergang",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [2],
        title: "Tag 02 – Habarana nach Kandy",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Polonnaruwa Antikes Königreich",
          "Dambulla-Höhlentempel",
          "Matale Hindu-Tempel",
          "Spaziergang am Kandy-See",
          "Kandy Kulturshow",
          "Zahntempel",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [3],
        title: "Tag 03 – Kandy nach Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Teefabrikbesuch",
          "Ramboda-Wasserfälle",
          "Stadt Nuwara Eliya",
          "Zugreise Nanu Oya nach Ella",
          "Kleiner Adams Peak",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [4],
        title: "Tag 04 – Ella nach Mirissa / Hikkaduwa",
        image: "/tours/yala.jpg",
        activities: [
          "Neun-Bogen-Brücke",
          "Ravana-Wasserfall",
          "Elefanten-Transitheim",
          "Udawalawe Nationalpark-Safari",
        ],
        overnight: "Übernachtung in Mirissa oder Hikkaduwa",
      },
      {
        days: [5],
        title: "Tag 05 – Strand nach Colombo / Flughafen",
        image: "/tours/colombo.jpg",
        activities: [
          "Walbeobachtung (Saisonal)",
          "Galle Holländisches Fort",
          "Schildkrötenschutzzentrum",
          "Madu-Flusssafari",
          "Colombo-Stadtrundfahrt",
        ],
        drop: "Transfer zum Flughafen oder Hotel in Colombo",
      },
    ],
  },
  {
    id: "05-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "5-Tage-Südtour mit Hotels",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 382.5,
    image: "/tours/05-days-down-south-tour-with-hotels.jpg",

    overview:
      "Diese 5-tägige Südtour mit Hotels umfasst Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella und Mirissa oder Hikkaduwa. Das Paket beinhaltet ausgewählte Hotelunterkünfte mit Frühstück, Privatfahrzeug und professionellen englischsprachigen Fahrerführer.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "765 $ für 2 Personen - VIP Luxuswagen (mit Fahrer) und Sterne-Hotel mit Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Ihre Unterkunft mit Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff & Parkgebühren",
      "24-Stunden-Notdienst",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahntickets (Maut)",
    ],

    excluded: [
      "Eintritts- & Aktivitätsgebühren",
      "Zugticket(s)",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Flughafen / Colombo nach Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Abholung vom Flughafen oder Hotel",
          "Hiriwadunna Dorftour mit Kochkurs",
          "Ökopark-Safari ODER Pidurangala-Sonnenuntergang",
        ],
        overnight: "Übernachtung im Go Go Green - Habarana (Mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Habarana nach Kandy",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Polonnaruwa Antikes Königreich",
          "Dambulla-Höhlentempel",
          "Dambulla Gemüsemarkt",
          "Matale Hindu-Tempel",
          "Spaziergang am Kandy-See",
          "Kandy Kulturshow",
          "Zahntempel",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [3],
        title: "Tag 03 – Kandy nach Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Glenloch Teefabrikbesuch",
          "Ramboda-Wasserfälle",
          "Stadtrundfahrt Nuwara Eliya",
          "Zugreise Nanu Oya nach Ella (Blauer Zug)",
          "Kleiner Adams Peak",
        ],
        overnight: "Übernachtung im Sunray Homestay - Ella",
      },
      {
        days: [4],
        title: "Tag 04 – Ella nach Mirissa / Hikkaduwa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Neun-Bogen-Brücke",
          "Ella Rock Aussichtspunkt ODER Ravana-Höhle & Buduruwagala",
          "Ravana-Wasserfall",
          "Elefanten-Transitheim",
          "Udawalawe Nationalpark-Safari",
        ],
        overnight:
          "Übernachtung im N34 - Mirissa ODER Finlanka Hotel - Hikkaduwa (Mit Pool)",
      },
      {
        days: [5],
        title: "Tag 05 – Abreise nach Colombo / Flughafen",
        image: "/tours/colombo.jpg",
        options: [
          {
            title: "Option 01 – Ab Mirissa",
            activities: [
              "Walbeobachtung (Saisonal)",
              "Coconut Tree Hill",
              "Schildkrötenschutzzentrum",
              "Colombo-Stadtrundfahrt",
            ],
          },
          {
            title: "Option 02 – Ab Hikkaduwa",
            activities: [
              "Galle Holländisches Fort",
              "Japanische Friedenspagode",
              "Hikkaduwa-Strand",
              "Madu-Flusssafari",
              "Colombo-Stadtrundfahrt",
            ],
          },
        ],
        drop: "Transfer zum Flughafen oder Hotel in Colombo",
      },
    ],
  },
  {
    id: "05-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "5-Tage-Ostküstentour",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 340.0,
    image: "/tours/05-days-east-coast-tour.jpg",

    overview:
      "Diese 5-tägige Ostküstentour umfasst Kandy, Habarana, Polonnaruwa, Pasikuda, Trincomalee und Negombo. Erleben Sie kulturelles Erbe, antike Städte, Wildlife-Safari und entspannte Ostküstenstrände.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote: "680 $ für 2 Personen - VIP Luxuswagen (mit Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff & Parkgebühren",
      "24-Stunden-Service",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahntickets (Maut)",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Abholung vom Flughafen oder Hotel",
          "Pinnawala Elefantenwaisenhaus",
          "Spaziergang am Kandy-See",
          "Kandy Kulturshow",
          "Tempel der Heiligen Zahnreliquie",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [2],
        title: "Tag 02 – Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Matale Hindu-Tempel",
          "Dambulla-Höhlentempel",
          "Dambulla Gemüsemarkt",
          "Dorftour mit Kochkurs & Mittagessen",
          "Ökopark-Safari ODER Pidurangala-Sonnenuntergang",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Polonnaruwa Antikes Königreich",
          "Pasikuda-Strand (Kalkudah-Strand)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [4],
        title: "Tag 04 – Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        activities: [
          "Marble Beach",
          "Koneswaram-Tempel",
          "Fort Frederick",
          "Pigeon Island Nationalpark",
          "Nilaveli-Strand",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [5],
        title: "Tag 05 – Trincomalee nach Negombo / Colombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Negombo Lagunenrundfahrt ODER Colombo-Stadtrundfahrt",
        ],
        drop: "Transfer zum Bandaranaike Internationalen Flughafen oder Hotel",
      },
    ],
  },
  {
    id: "05-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "5-Tage-Ostküstentour mit Hotels",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/05-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Diese 5-tägige Ostküstentour mit Hotels umfasst Kandy, Habarana, Polonnaruwa, Pasikuda, Trincomalee und Negombo. Das Paket beinhaltet ausgewählte Hotelunterkünfte mit Frühstück, Privatfahrzeug und Fahrerführer.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "800 $ für 2 Personen - VIP Luxuswagen (mit Fahrer) und Sterne-Hotels mit Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Ihre Unterkunft mit Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff & Parkgebühren",
      "24-Stunden-Service",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahntickets (Maut)",
    ],

    excluded: [
      "Eintritts- & Aktivitätsgebühren",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Colombo / Negombo nach Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Abholung vom Flughafen oder Hotel",
          "Pinnawala Elefantenwaisenhaus",
          "Spaziergang am Kandy-See",
          "Kandy Kulturshow",
          "Tempel der Heiligen Zahnreliquie",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [2],
        title: "Tag 02 – Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Matale Hindu-Tempel",
          "Dambulla-Höhlentempel",
          "Dambulla Gemüsemarkt",
          "Dorftour mit Kochkurs & Mittagessen",
          "Ökopark-Safari ODER Pidurangala-Sonnenuntergang",
        ],
        overnight: "Übernachtung im Go Go Green - Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Polonnaruwa Antikes Königreich",
          "Pasikuda-Strand (Kalkudah-Strand)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [4],
        title: "Tag 04 – Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        activities: [
          "Marble Beach",
          "Koneswaram-Tempel",
          "Fort Frederick",
          "Pigeon Island Nationalpark",
          "Nilaveli-Strand",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [5],
        title: "Tag 05 – Trincomalee nach Negombo / Colombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Negombo Lagunenrundfahrt ODER Colombo-Stadtrundfahrt",
        ],
        drop:
          "Transfer zum Bandaranaike Internationalen Flughafen oder Hotel in Negombo / Colombo",
      },
    ],
  },

  /* =====================================================
     08 DAYS TOURS
  ===================================================== */
  {
    id: "08-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "8-Tage-Südtour",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 335.0,
    image: "/tours/08-days-down-south-tour.jpg",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie ein fantastisches Tourpaket mit uns. Diese 8-tägige Tour umfasst Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa und Colombo.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote: "670 $ für 2 Personen - VIP Luxuswagen (mit Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff & Parkgebühren",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Zugticket(s)",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Negombo",
        image: "/tours/negombo.jpg",
        description: "Abholung vom Flughafen oder Hotel in Colombo/Negombo",
        activities: [
          "Negombo Fischmarkt",
          "Negombo Holländisches Fort",
          "Negombo Lagunenrundfahrt",
        ],
        overnight: "Übernachtung in Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Pinnawala Elefantenwaisenhaus",
          "Dorftour mit Sri-Lanka-Mittagessen",
          "Ökopark-Wildsafari ODER Pidurangala-Sonnenuntergang",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Polonnaruwa Antikes Königreich",
          "Dambulla-Höhlentempel",
          "Zahntempel",
          "Kulturelle Tanzshow",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Teefabrikbesuch",
          "Ramboda-Wasserfälle",
          "Zugreise",
          "Kleiner Adams Peak",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [5],
        title: "Tag 05 – Route wählen",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "Option 01 – Ella nach Yala",
            activities: [
              "Neun-Bogen-Brücke",
              "Ravana-Wasserfall",
              "Buduruwagala-Felstempel",
            ],
            overnight: "Übernachtung in Yala",
          },
          {
            title: "Option 02 – Ella nach Mirissa",
            activities: [
              "Neun-Bogen-Brücke",
              "Udawalawe-Safari",
            ],
            overnight: "Übernachtung in Mirissa",
          },
        ],
        note: "Der nächste Tag hängt von der gewählten Option ab.",
      },
      {
        days: [6],
        title: "Tag 06 – Gewählte Route fortsetzen",
        image: "/tours/mirissa.jpg",
        options: [
          {
            title: "Option 01 – Yala nach Mirissa",
            activities: [
              "Yala Morgensafari",
              "Goyambokka-Strand",
            ],
            overnight: "Übernachtung in Mirissa",
          },
          {
            title: "Option 02 – Mirissa nach Hikkaduwa",
            activities: [
              "Walbeobachtung",
              "Galle Holländisches Fort",
            ],
            overnight: "Übernachtung in Hikkaduwa",
          },
        ],
      },
      {
        days: [7],
        title: "Tag 07 – Hikkaduwa",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "Strandfreizeit",
          "Schnorcheln",
          "Surfen",
        ],
        overnight: "Übernachtung in Hikkaduwa",
      },
      {
        days: [8],
        title: "Tag 08 – Abreise",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Madu-Flusssafari",
          "Colombo-Stadtrundfahrt",
        ],
        drop: "Transfer zum Flughafen oder Hotel",
      },
    ],
  },
  {
    id: "08-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "8 Tage Höhepunkte im Süden mit Hotels",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 475.0,
    image: "/tours/08-days-down-south-tour-with-hotels.jpg",

    overview:
      "Diese detaillierte 8-tägige Rundreise führt Sie zu den absoluten Highlights im Süden Sri Lankas. Von der Geschichte in Habarana über die kühlen Teeberge in Ella bis hin zu den goldenen Stränden von Mirissa und Hikkaduwa – erleben Sie die Vielfalt der Insel mit dem Komfort ausgewählter Hotels inklusive Frühstück.",
    included: [
      "Klimatisiertes Privatfahrzeug",
      "Englischsprachiger professioneller Fahrer",
      "Hotelunterkunft mit Frühstück",
      "Unterkunft und Verpflegung des Fahrers",
      "Treibstoff und Parkgebühren",
      "SIM-Karte und Trinkwasser",
      "Mautgebühren",
    ],
    excluded: [
      "Eintrittsgelder und Aktivitätsgebühren",
      "Mittag- und Abendessen",
      "Zugtickets",
    ],
    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft & Negombo",
        image: "/tours/negombo.jpg",
        activities: ["Abholung vom Flughafen", "Erkundung der Lagune von Negombo"],
        overnight: "Übernachtung im New Queen's Palace - Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Aufbruch nach Habarana",
        image: "/tours/habarana.jpg",
        activities: ["Authentische Dorftour", "Wildlife-Safari am Nachmittag"],
        overnight: "Übernachtung im Go Go Green - Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Die Königsstadt Kandy",
        image: "/tours/kandy.jpg",
        activities: ["Besichtigung des Zahntempels", "Kulturelle Tanzshow"],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Das Bergland von Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Malerische Zugfahrt durch die Teeberge",
          "Wanderung zum Little Adam's Peak",
        ],
        overnight: "Übernachtung im Sunray Homestay - Ella",
      },
      {
        days: [5],
        title: "Tag 05 – Wilde Natur in Yala",
        image: "/tours/yala.jpg",
        activities: ["Jeep-Safari im Yala-Nationalpark"],
        overnight: "Übernachtung in der Boutique Villa - Yala",
      },
      {
        days: [6],
        title: "Tag 06 – Strandparadies Mirissa",
        image: "/tours/mirissa.jpg",
        activities: ["Entspannung am Strand", "Coconut Tree Hill Fotostopp"],
        overnight: "Übernachtung im N34 - Mirissa",
      },
      {
        days: [7],
        title: "Tag 07 – Küstenzauber in Hikkaduwa",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "Schnorcheln im Korallengarten",
          "Besuch des holländischen Forts in Galle",
        ],
        overnight: "Übernachtung im Finlanka Hotel - Hikkaduwa",
      },
      {
        days: [8],
        title: "Tag 08 – Colombo & Abreise",
        image: "/tours/colombo-airport.jpg",
        activities: ["Stadtrundfahrt in Colombo", "Transfer zum Flughafen"],
        drop: "Flughafen / Hotel in Colombo",
      },
    ],
  },
  {
    id: "08-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "8-Tage-Ostküstentour",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 510.0,
    image: "/tours/08-days-east-coast-tour.jpg",

    overview:
      "Entdecken Sie in 8 Tagen die unberührten Strände der Ostküste, tauchen Sie in die reiche Kultur ein und erleben Sie die atemberaubende Natur des Hügellands. Diese Tour bietet eine perfekte Mischung aus Abenteuer und Entspannung, ideal für Reisende, die ihre Unterkünfte gerne selbst wählen.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
    },

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff & Autobahngebühren",
      "Parkgebühren",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Mineralwasserflaschen",
    ],

    excluded: [
      "Ihre Unterkunft & Mahlzeiten",
      "Eintritts- & Aktivitätsgebühren",
      "Zugticket(s)",
      "Persönliche Ausgaben",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Negombo",
        image: "/tours/negombo.jpg",
        activities: ["Abholung vom Flughafen", "Erkundung der Lagune von Negombo"],
        overnight: "Übernachtung in Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Nine Arch Bridge",
          "Besuch der Ravana-Wasserfälle",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Besichtigung des Zahntempels",
          "Spaziergang am Kandy-See",
          "Kulturelle Tanzshow",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Habarana",
        image: "/tours/habarana.jpg",
        activities: ["Authentische Dorftour", "Wildlife-Safari am Nachmittag"],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [5],
        title: "Tag 05 – Pasikuda",
        image: "/tours/pasikuda.jpg",
        activities: [
          "Entspannung am Pasikuda-Strand (Kalkudah)",
          "Wassersportmöglichkeiten",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [6],
        title: "Tag 06 – Trincomalee",
        image: "/tours/trincomalee.jpg",
        activities: ["Strandzeit", "Koneswaram-Tempel", "Besuch von Fort Frederick"],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [7],
        title: "Tag 07 – Trincomalee-Erkundung",
        image: "/tours/trincomalee.jpg",
        activities: ["Schnorchelausflug zur Pigeon Island", "Nilaveli-Strand"],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [8],
        title: "Tag 08 – Abreise",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Stadtrundfahrt in Colombo (je nach Zeit)",
          "Transfer zum Flughafen",
        ],
        drop: "Flughafen / Hotel in Colombo",
      },
    ],
  },
  {
    id: "08-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "8-Tage-Ostküstentour mit Hotels",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 630.0,
    image: "/tours/08-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Erleben Sie eine unvergessliche 8-tägige Reise durch Sri Lanka. Diese Tour führt Sie von Negombo über die malerischen Hügel von Ella und Kandy bis hin zu den goldenen Sandstränden von Pasikuda und Trincomalee an der Ostküste. Das Paket beinhaltet erstklassige Hotelunterkünfte mit Frühstück und einen professionellen privaten Fahrer.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "1.260 $ für 2 Personen – VIP-Luxuswagen (mit Fahrer & Guide) und ausgewählte Sterne-Hotels inklusive Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Hotelunterkünfte inklusive Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Notfallservice",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
      "Eintrittsgelder & Aktivitäten laut Programm",
      "Zugtickets",
    ],

    excluded: [
      "Mittag- und Abendessen",
      "Persönliche Ausgaben",
      "Trinkgelder",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen oder Hotel und Erkundung der Küstenstadt Negombo.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune",
        ],
        overnight: "Übernachtung im New Queen's Palace - Negombo (mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Von Negombo nach Ella",
        image: "/tours/ella.jpg",
        description: "Fahrt in das zentrale Hochland mit Abenteuern in der Natur.",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Besuch der Ravana-Wasserfälle",
          "Wanderung zum Little Adam's Peak",
          "Nine Arch Bridge in Demodara",
        ],
        overnight: "Übernachtung im Sunray Homestay - Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Von Ella nach Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Berühmte Zugfahrt durch die Berge und Besuch der Kulturhauptstadt.",
        activities: [
          "Zugfahrt von Ella nach Nanu Oya (der 'Blaue Zug')",
          "Stadtbesichtigung Nuwara Eliya",
          "Ramboda-Wasserfälle",
          "Teefabrik-Besichtigung & Verkostung",
          "Spaziergang am Kandy-See",
          "Kulturelle Tanzshow",
          "Zahntempel in Kandy",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Von Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        description:
          "Entdeckung der Geschichte und Wildnis im Herzen der Insel.",
        activities: [
          "Hindu-Tempel in Matale",
          "Goldener Tempel von Dambulla",
          "Gemüsemarkt in Dambulla",
          "Dorftour mit Kochkurs & traditionellem Mittagessen",
          "Safari im Eco Park ODER Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung im Go Go Green - Habarana (mit Pool)",
      },
      {
        days: [5],
        title: "Tag 05 – Von Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        description: "Historische Stätten und Weiterreise an die Ostküste.",
        activities: [
          "Sigiriya-Felsfestung",
          "Antikes Königreich Polonnaruwa",
          "Entspannung am Pasikuda-Strand (Kalkudah)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [6],
        title: "Tag 06 – Von Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Erkundung der Küste und Fahrt nach Trincomalee.",
        activities: [
          "Wassersport & Strandzeit",
          "Britischer Kriegsfriedhof",
          "Uppuveli-Strand",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [7],
        title: "Tag 07 – Trincomalee Erkundung",
        image: "/tours/trincomalee.jpg",
        description:
          "Entdeckung der religiösen und natürlichen Schätze von Trincomalee.",
        activities: [
          "Marble Beach",
          "Koneswaram-Tempel",
          "Fort Frederick",
          "Pigeon Island Nationalpark",
          "Nilaveli-Strand",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [8],
        title: "Tag 08 – Abreise",
        image: "/tours/colombo-airport.jpg",
        description: "Ende der Tour und Transfer zu Ihrem nächsten Ziel.",
        activities: [
          "Lagunentour in Negombo ODER Stadtrundfahrt in Colombo",
        ],
        drop: "Transfer zum Flughafen oder Ihrem Hotel in Colombo/Negombo",
      },
    ],
  },

  /* =====================================================
     10 DAYS TOURS
  ===================================================== */
  {
    id: "10-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "10-Tage-Südtour",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/10-days-down-south-tour.jpg",

    overview:
      "Diese 10-tägige Südtour umfasst Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa und Colombo mit Kultur, Hügeln, Wildtieren und Stränden.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote: "800 $ für 2 Personen - VIP Luxuswagen (mit Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff",
      "Parkgebühren",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Wasserflaschen",
      "Autobahntickets (Maut)",
    ],

    excluded: [
      "Ihre Unterkunft",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
      "Zugticket(s)",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Habarana",
        image: "/tours/habarana.jpg",
        description: "Abholung vom Flughafen oder Hotel & Fahrt nach Habarana",
        activities: [
          "Negombo Fischmarkt",
          "Pidurangala Sonnenuntergang",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [2],
        title: "Tag 02 – Sigiriya & Polonnaruwa",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Sigiriya-Felsfestung (7 Uhr)",
          "Polonnaruwa Antikes Königreich per Fahrrad",
          "Hiriwadunna Dorftour mit Kochkurs & Mittagessen",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Dambulla-Höhlentempel",
          "Nalanda Gedige Tempel",
          "Matale Hindu-Tempel",
          "Kandy Kulturshow",
          "Zahntempel Kandy",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Ramboda-Wasserfälle",
          "Teefabrik & Teeplantage",
          "Stadtrundgang zu Fuß",
        ],
        overnight: "Übernachtung in Nuwara Eliya",
      },
      {
        days: [5],
        title: "Tag 05 – Horton Plains & Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Horton Plains (5 Uhr)",
          "Zugreise Nanu Oya nach Ella",
          "Neun-Bogen-Brücke",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [6],
        title: "Tag 06 – Ella-Erkundung",
        image: "/tours/ella.jpg",
        activities: [
          "Kleiner Adams Peak",
          "Ravana-Höhle",
          "Ella Rock",
          "Geheimer Wasserfall",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [7],
        title: "Tag 07 – Yala",
        image: "/tours/yala.jpg",
        activities: [
          "Ravana-Wasserfälle",
          "Buduruwagala-Felstempel",
          "Yala Nationalpark-Safari",
        ],
        overnight: "Übernachtung in Yala",
      },
      {
        days: [8],
        title: "Tag 08 – Mirissa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Mirissa-Strand",
          "Weligama-Strand",
          "Unawatuna-Strand",
        ],
        overnight: "Übernachtung in Mirissa",
      },
      {
        days: [9],
        title: "Tag 09 – Mirissa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Walbeobachtung",
          "Strandfreizeit",
        ],
        overnight: "Übernachtung in Mirissa",
      },
      {
        days: [10],
        title: "Tag 10 – Colombo & Abreise",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Galle Holländisches Fort",
          "Schildkrötenschutzprojekt",
          "Colombo-Stadtrundfahrt",
          "Gangaramaya-Tempel",
          "Unabhängigkeitsplatz",
        ],
        drop: "Transfer zum Flughafen oder Hotel",
      },
    ],
  },
  {
    id: "10-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "10 Tage Höhepunkte im Süden mit Hotels",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 580.0,
    image: "/tours/10-days-down-south-tour-with-hotels.jpg",

    overview:
      "Besuchen Sie Sri Lanka und buchen Sie ein fantastisches 10-tägiges Tourpaket bei uns. Diese Reise umfasst Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa und Colombo. Erleben Sie die perfekte Mischung aus Kultur, Hochland, Wildtieren und Stränden mit dem Komfort ausgewählter Hotelunterkünfte inklusive Frühstück.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestens 2 Personen für diese Route erforderlich",
      vipNote:
        "1.160 $ für 2 Personen – VIP-Luxuswagen (mit Fahrer & Guide) und ausgewählte Sterne-Hotels inklusive Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Hotelunterkünfte inklusive Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Notfallservice",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
      "Eintrittsgelder & Aktivitäten laut Programm",
      "Zugtickets",
    ],

    excluded: [
      "Mittag- und Abendessen",
      "Persönliche Ausgaben",
      "Trinkgelder",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft & Habarana",
        image: "/tours/habarana.jpg",
        description: "Abholung vom Flughafen oder Hotel und Fahrt nach Habarana.",
        activities: [
          "Fischmarkt in Negombo",
          "Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung im Go Go Green – Habarana (mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Sigiriya & Polonnaruwa",
        image: "/tours/sigiriya.jpg",
        description: "Entdeckung des Kulturdreiecks und des ländlichen Lebens.",
        activities: [
          "Aufstieg zur Sigiriya-Felsfestung (07:00 Uhr)",
          "Radtour durch das antike Königreich Polonnaruwa",
          "Hiriwadunna Dorftour mit Kochkurs & traditionellem Mittagessen",
        ],
        overnight: "Übernachtung im Go Go Green – Habarana",
      },
      {
        days: [3],
        title: "Tag 03 – Die Königsstadt Kandy",
        image: "/tours/kandy.jpg",
        description: "Fahrt in die Kulturhauptstadt und Besuch heiliger Stätten.",
        activities: [
          "Dambulla Höhlentempel",
          "Nalanda Gedige Tempel",
          "Hindu-Tempel in Matale",
          "Kulturelle Tanzshow in Kandy",
          "Zahntempel in Kandy",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge – Kandy",
      },
      {
        days: [4],
        title: "Tag 04 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description: "Erkundung von 'Little England' und den weiten Teeplantagen.",
        activities: [
          "Ramboda-Wasserfälle",
          "Besuch einer Teefabrik & Teeplantage",
          "Stadtrundgang durch Nuwara Eliya",
        ],
        overnight: "Übernachtung im Lu Chalet – Nuwara Eliya",
      },
      {
        days: [5],
        title: "Tag 05 – Horton Plains & Ella",
        image: "/tours/ella.jpg",
        description: "Frühmorgendliche Wanderung und die berühmte Zugreise.",
        activities: [
          "Horton Plains Nationalpark (05:00 Uhr)",
          "Zugfahrt von Nanu Oya nach Ella (der berühmte blaue Zug)",
          "Nine Arch Bridge in Demodara",
        ],
        overnight: "Übernachtung im Ella River Front – Ella",
      },
      {
        days: [6],
        title: "Tag 06 – Ella-Erkundung",
        image: "/tours/ella.jpg",
        description: "Ein Tag gewidmet der Natur und den Panoramablicken von Ella.",
        activities: [
          "Wanderung zum Little Adam's Peak",
          "Ravana-Höhle",
          "Wanderung zum Ella Rock",
          "Entdeckung des 'Geheimen Wasserfalls'",
        ],
        overnight: "Übernachtung im Ella River Front – Ella",
      },
      {
        days: [7],
        title: "Tag 07 – Wildnis in Yala",
        image: "/tours/yala.jpg",
        description: "Fahrt in den Dschungel für eine Wildlife-Safari.",
        activities: [
          "Ravana-Wasserfälle",
          "Buduruwagala-Felstempel",
          "Safari im Yala Nationalpark",
        ],
        overnight: "Übernachtung in der Boutique Villa – Yala",
      },
      {
        days: [8],
        title: "Tag 08 – Aufbruch nach Mirissa",
        image: "/tours/mirissa.jpg",
        description: "Weiterreise an die Südküste zu den goldenen Stränden.",
        activities: [
          "Entspannung am Mirissa-Strand",
          "Weligama-Strand",
          "Unawatuna-Strand",
        ],
        overnight: "Übernachtung im N34 – Mirissa",
      },
      {
        days: [9],
        title: "Tag 09 – Mirissa Strandzeit",
        image: "/tours/mirissa.jpg",
        description: "Ein Tag zum Entspannen oder für Meeresabenteuer.",
        activities: [
          "Walbeobachtung (am frühen Morgen)",
          "Freizeit am Strand",
        ],
        overnight: "Übernachtung im N34 – Mirissa",
      },
      {
        days: [10],
        title: "Tag 10 – Colombo & Abreise",
        image: "/tours/colombo.jpg",
        description: "Ende der Tour mit einer historischen Stadtbesichtigung.",
        activities: [
          "Holländisches Fort in Galle",
          "Schildkrötenschutzprojekt",
          "Stadtrundfahrt in Colombo",
          "Gangaramaya-Tempel",
          "Unabhängigkeitsplatz",
        ],
        drop: "Transfer zum Flughafen oder zu Ihrem Hotel in Colombo",
      },
    ],
  },
  {
    id: "10-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "10-Tage-Ostküstentour",
    duration: 10,
    maxPeople: 10,
    minAge: 16,
    price: 640.0,
    image: "/tours/10-days-east-coast-tour.jpg",

    overview:
      "Entdecken Sie in 10 Tagen die faszinierende Ostküste Sri Lankas, kombiniert mit bedeutenden Kulturerbestätten, dem malerischen Hügelland und spannenden Wildtiersafaris. Diese umfassende Tour führt Sie von Negombo über Ella und Nuwara Eliya bis hin zu den traumhaften Stränden von Pasikuda und Trincomalee. Genießen Sie volle Flexibilität mit Ihrem privaten, professionellen Fahrer.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestens 2 Personen für diese Route erforderlich",
      vipNote:
        "1.280 $ für 2 Personen – VIP-Luxuswagen (inklusive Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Unterstützung und Service",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
    ],

    excluded: [
      "Ihre persönlichen Unterkünfte & Mahlzeiten",
      "Eintrittsgelder & Aktivitäten",
      "Zugtickets",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen oder Hotel und Erkundung der Küstenstadt Negombo.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune von Negombo",
        ],
        overnight: "Übernachtung in Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Von Negombo nach Ella",
        image: "/tours/ella.jpg",
        description: "Fahrt in das Hochland mit actionreichen Stopps.",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Besuch der Ravana-Wasserfälle",
          "Wanderung zum Little Adam's Peak",
          "Nine Arch Bridge in Demodara",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Von Ella nach Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Zugreise nach Nuwara Eliya, dem 'Kleinen England' Sri Lankas.",
        activities: [
          "Zugfahrt von Ella nach Nanu Oya (Panoramastrecke)",
          "Victoria Park",
          "Stadtrundgang durch Nuwara Eliya",
          "Gregory Lake Freizeit",
          "Besuch der Pedro Teestations",
          "Seetha Amman Tempel",
        ],
        overnight: "Übernachtung in Nuwara Eliya",
      },
      {
        days: [4],
        title: "Tag 04 – Von Nuwara Eliya nach Kandy",
        image: "/tours/kandy.jpg",
        description: "Naturwunder am Morgen und Kultur in der Königsstadt.",
        activities: [
          "Horton Plains Nationalpark (Wanderung ab 06:00 Uhr)",
          "Baker's Wasserfall",
          "Ambewela Farm",
          "Ramboda-Wasserfälle",
          "Glenloch Teefabrik & Plantage",
          "Spaziergang am Kandy-See",
          "Kulturelle Tanzshow",
          "Zahntempel (Sri Dalada Maligawa)",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Von Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        description: "Reise in das kulturelle Dreieck Sri Lankas.",
        activities: [
          "Hindu-Tempel in Matale",
          "Goldener Höhlentempel von Dambulla",
          "Gemüsemarkt in Dambulla",
          "Dorftour mit Kochkurs & traditionellem Mittagessen",
          "Safari im Eco Park ODER Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [6],
        title: "Tag 06 – Von Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Besuch der historischen Highlights und Weiterreise ans Meer.",
        activities: [
          "Sigiriya-Felsfestung Aufstieg",
          "Antikes Königreich Polonnaruwa",
          "Entspannung am Pasikuda-Strand (Kalkudah)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [7],
        title: "Tag 07 – Erkundung von Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Ein Tag für Wassersport und die Geschichte von Batticaloa.",
        activities: [
          "Wassersport & Strandentspannung",
          "Historisches Fort von Batticaloa",
          "Neue Kallady-Brücke",
          "Leuchtturm von Batticaloa",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [8],
        title: "Tag 08 – Von Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Fahrt in den Norden der Ostküste nach Trincomalee.",
        activities: [
          "Marble Beach",
          "Britischer Kriegsfriedhof",
          "Uppuveli-Strand",
          "Besichtigung von Fort Frederick",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [9],
        title: "Tag 09 – Trincomalee & Pigeon Island",
        image: "/tours/trincomalee.jpg",
        description: "Ein ganzer Tag für Unterwasserabenteuer und Tempel.",
        activities: [
          "Schnorcheln im Pigeon Island Nationalpark",
          "Nilaveli-Strand",
          "Berühmter Koneswaram-Tempel",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [10],
        title: "Tag 10 – Abreise nach Colombo / Flughafen",
        image: "/tours/colombo.jpg",
        description: "Ende der Reise mit optionaler Stadtrundfahrt.",
        activities: [
          "Optionale Stadtbesichtigung in Colombo (je nach Abflugzeit)",
        ],
        drop:
          "Transfer zum Bandaranaike International Airport oder zu Ihrem Hotel in Colombo/Negombo",
      },
    ],
  },
  {
    id: "10-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "10-Tage-Ostküstentour mit Hotels",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 790.0,
    image: "/tours/10-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Erleben Sie Sri Lanka in seiner ganzen Pracht mit unserem exklusiven 10-Tage-Paket. Diese Reise führt Sie durch Negombo, Ella, Nuwara Eliya, Kandy, Habarana, Polonnaruwa, Pasikuda und Trincomalee. Genießen Sie höchsten Komfort mit einem VIP-Fahrzeug, einem professionellen Fahrer-Guide und erstklassigen Hotelunterkünften inklusive Frühstück.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "1.580 $ für 2 Personen – VIP-Luxuswagen (mit Fahrer & Guide) und ausgewählte Sterne-Hotels inklusive Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Hotelunterkünfte inklusive Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Notfallservice",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
      "Eintrittsgelder für alle genannten Sehenswürdigkeiten",
      "Zugtickets (Ella nach Nanu Oya)",
    ],

    excluded: [
      "Mittag- und Abendessen",
      "Persönliche Ausgaben",
      "Trinkgelder",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen oder Hotel und Erkundung der Küstenstadt Negombo.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune von Negombo",
        ],
        overnight: "Übernachtung im New Queen's Palace - Negombo (mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Von Negombo nach Ella",
        image: "/tours/ella.jpg",
        description: "Fahrt in das grüne Hochland mit Naturabenteuern.",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Ravana-Wasserfälle",
          "Wanderung zum Little Adam's Peak",
          "Berühmte Nine Arch Bridge",
        ],
        overnight: "Übernachtung im Sunray Homestay - Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Von Ella nach Kandy via Nuwara Eliya",
        image: "/tours/kandy.jpg",
        description:
          "Fahrt mit dem berühmten blauen Zug und Besuch der Teestadt Nuwara Eliya.",
        activities: [
          "Zugfahrt von Ella nach Nanu Oya",
          "Victoria Park",
          "Stadtrundgang durch Nuwara Eliya",
          "Entspannung am Gregory Lake",
          "Pedro Teeplantage",
          "Seetha Amman Tempel",
        ],
        overnight: "Übernachtung im Lu Chalet - Nuwara Eliya",
      },
      {
        days: [4],
        title: "Tag 04 – Von Nuwara Eliya nach Kandy",
        image: "/tours/kandy.jpg",
        description: "Naturwunder im Hochland und die kulturelle Hauptstadt Kandy.",
        activities: [
          "Horton Plains Nationalpark",
          "Baker's Wasserfall",
          "Ambewela Farm",
          "Ramboda-Wasserfälle",
          "Glenloch Teefabrik",
          "Spaziergang am Kandy-See",
          "Kulturelle Tanzshow",
          "Zahntempel in Kandy",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Von Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        description: "Eintauchen in die srilankische Kultur und Wildlife-Safari.",
        activities: [
          "Hindu-Tempel in Matale",
          "Goldener Tempel von Dambulla",
          "Gemüsemarkt in Dambulla",
          "Dorftour mit Kochkurs & traditionellem Mittagessen",
          "Safari im Eco Park ODER Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung im Go Go Green - Habarana (mit Pool)",
      },
      {
        days: [6],
        title: "Tag 06 – Von Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Besuch der antiken Stätten und Weiterreise an die ruhige Ostküste.",
        activities: [
          "Aufstieg zur Sigiriya-Felsfestung",
          "Antikes Königreich Polonnaruwa",
          "Entspannung am Pasikuda-Strand (Kalkudah)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [7],
        title: "Tag 07 – Erkundung von Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Ein Tag für Entspannung am Meer und koloniale Geschichte.",
        activities: [
          "Wassersport & Strandzeit",
          "Historisches Fort von Batticaloa",
          "Neue Kallady-Brücke",
          "Leuchtturm von Batticaloa",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [8],
        title: "Tag 08 – Von Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Fahrt nach Trincomalee, dem schönsten Naturhafen im Osten.",
        activities: [
          "Marble Beach",
          "Britischer Kriegsfriedhof",
          "Uppuveli-Strand",
          "Besichtigung von Fort Frederick",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [9],
        title: "Tag 09 – Trincomalee & Pigeon Island",
        image: "/tours/trincomalee.jpg",
        description:
          "Entdeckung der reichen Unterwasserwelt und historischer Tempel.",
        activities: [
          "Schnorcheln im Pigeon Island Nationalpark",
          "Nilaveli-Strand",
          "Berühmter Koneswaram-Tempel",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [10],
        title: "Tag 10 – Abreise",
        image: "/tours/colombo.jpg",
        description:
          "Ende der Tour mit einer optionalen Stadtführung in der Hauptstadt.",
        activities: [
          "Optionale Stadtrundfahrt in Colombo",
        ],
        drop: "Transfer zum Flughafen oder Ihrem Hotel in Colombo/Negombo",
      },
    ],
  },

  /* =====================================================
     12 DAYS TOURS
  ===================================================== */
  {
    id: "12-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "12-Tage-Südtour",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 465.0,
    image: "/tours/12-days-down-south-tour.jpg",

    overview:
      "12-tägige Südreise mit Negombo, Anuradhapura, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa und Colombo mit Kultur, Hügeln, Wildtieren und Stränden.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote: "930 $ für 2 Personen - VIP Luxuswagen (mit Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Kraftstoff",
      "Parkgebühren",
      "Lokale SIM-Karte (Kostenloses Datenvolumen)",
      "Wasserflaschen",
    ],

    excluded: [
      "Ihre Unterkunft",
      "Eintritts- & Aktivitätsgebühren",
      "Speisen & Getränke",
      "Zugticket(s)",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Negombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Abholung vom Flughafen",
          "Negombo-Stadterkundung",
          "Negombo Lagunenrundfahrt",
        ],
        overnight: "Übernachtung in Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        activities: [
          "Negombo Fischmarkt",
          "Sri Munneswaram Kovil",
          "Anuradhapura Antikes Königreich-Tour",
        ],
        overnight: "Übernachtung in Anuradhapura",
      },
      {
        days: [3],
        title: "Tag 03 – Habarana",
        image: "/tours/habarana.jpg",
        options: [
          {
            title: "Option 01",
            activities: [
              "Polonnaruwa Antikes Königreich",
              "Dorftour mit Kochkurs",
              "Pidurangala Sonnenuntergang",
            ],
          },
          {
            title: "Option 02",
            activities: [
              "Minneriya / Kaudulla / Ökopark-Safari",
            ],
          },
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [4],
        title: "Tag 04 – Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Sigiriya-Felsfestung",
          "Dambulla-Höhlentempel",
          "Gewürzgartenbesuch",
          "Kandy Kulturshow",
          "Zahntempel",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Peradeniya Botanischer Garten",
          "Ramboda-Wasserfall",
          "Teefabrikbesuch",
        ],
        overnight: "Übernachtung in Nuwara Eliya",
      },
      {
        days: [6],
        title: "Tag 06 – Nuwara Eliya Erkundung",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Hakgala Botanischer Garten",
          "Gregory Lake",
          "Stadtspaziergang",
        ],
        overnight: "Übernachtung in Nuwara Eliya",
      },
      {
        days: [7],
        title: "Tag 07 – Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Horton Plains",
          "Zugreise nach Ella",
          "Ella-Stadterkundung",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [8],
        title: "Tag 08 – Yala / Udawalawa",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "Option 01 – Yala",
            activities: [
              "Neun-Bogen-Brücke",
              "Ravana-Wasserfall",
              "Yala Nationalpark-Safari",
            ],
            overnight: "Übernachtung in Yala",
          },
          {
            title: "Option 02 – Udawalawa",
            activities: [
              "Kleiner Adams Peak",
              "Udawalawe-Safari",
            ],
            overnight: "Übernachtung in Udawalawe",
          },
        ],
      },
      {
        days: [9],
        title: "Tag 09 – Mirissa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Stranderholung",
          "Coconut Tree Hill",
        ],
        overnight: "Übernachtung in Mirissa",
      },
      {
        days: [10],
        title: "Tag 10 – Hikkaduwa",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "Walbeobachtung",
          "Galle Holländisches Fort",
        ],
        overnight: "Übernachtung in Hikkaduwa",
      },
      {
        days: [11],
        title: "Tag 11 – Colombo",
        image: "/tours/colombo.jpg",
        activities: [
          "Madu-Flusssafari",
          "Colombo-Stadtrundfahrt",
        ],
        overnight: "Übernachtung in Colombo",
      },
      {
        days: [12],
        title: "Tag 12 – Abreise",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Gangaramaya-Tempel",
          "Unabhängigkeitsplatz",
        ],
        drop: "Transfer zum Flughafen oder Hotel",
      },
    ],
  },
  {
    id: "12-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "12 Tage Große Südtour mit Hotels",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 680.0,
    image: "/tours/12-days-down-south-tour-with-hotels.jpg",

    overview:
      "Erleben Sie das ultimative Sri Lanka-Abenteuer mit unserer luxuriösen 12-tägigen Rundreise. Diese umfassende Tour deckt Anuradhapura, Habarana, Kandy, Nuwara Eliya, Ella, Yala und die traumhaften Strände des Südens ab. Wir bieten Ihnen absoluten Komfort in handverlesenen Hotels inklusive Frühstück, begleitet von einem professionellen Fahrer-Guide in einem VIP-Fahrzeug.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Luxus-Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "1.360 $ für 2 Personen – VIP-Luxuswagen (mit Fahrer & Guide) und ausgewählte Sterne-Hotels inklusive Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Hotelunterkünfte inklusive Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Notfallservice",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
      "Eintrittsgelder für alle genannten Sehenswürdigkeiten",
      "Zugtickets (Nanu Oya nach Ella)",
    ],

    excluded: [
      "Mittag- und Abendessen",
      "Persönliche Ausgaben",
      "Trinkgelder",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen und Erkundung der charmanten Küstenstadt Negombo.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune",
        ],
        overnight: "Übernachtung im New Queen's Palace - Negombo (mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Reise nach Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description:
          "Besuch der ersten antiken Hauptstadt Sri Lankas und ihrer heiligen Stätten.",
        activities: [
          "Sri Munneswaram Kovil Tempel",
          "Umfassende Tour durch das antike Königreich Anuradhapura",
        ],
        overnight: "Übernachtung in einem ausgewählten Hotel in Anuradhapura",
      },
      {
        days: [3],
        title: "Tag 03 – Von Anuradhapura nach Habarana",
        image: "/tours/habarana.jpg",
        description:
          "Aufbruch in das kulturelle Dreieck mit ländlichen Erlebnissen und Safari.",
        activities: [
          "Antikes Königreich Polonnaruwa",
          "Dorftour mit Kochkurs & traditionellem Mittagessen",
          "Safari im Minneriya Nationalpark ODER Eco Park",
        ],
        overnight: "Übernachtung im Go Go Green – Habarana (mit Pool)",
      },
      {
        days: [4],
        title: "Tag 04 – Weiterreise nach Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Aufstieg zum legendären Sigiriya-Felsen und Fahrt in die Kulturhauptstadt.",
        activities: [
          "Aufstieg zur Sigiriya-Felsfestung (am frühen Morgen)",
          "Goldener Höhlentempel von Dambulla",
          "Kulturelle Tanzshow in Kandy",
          "Besuch des Zahntempels in Kandy",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge – Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Nuwara Eliya ('Little England')",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Malerische Fahrt durch die Teeberge und vorbei an Wasserfällen.",
        activities: [
          "Botanischer Garten von Peradeniya",
          "Ramboda-Wasserfälle",
          "Teefabrik-Besichtigung mit Verkostung",
        ],
        overnight: "Übernachtung im Lu Chalet – Nuwara Eliya",
      },
      {
        days: [6],
        title: "Tag 06 – Erkundung von Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Ein Tag zur Entspannung in der kühlen Bergluft und Natur.",
        activities: [
          "Hakgala Botanischer Garten",
          "Freizeit am Gregory Lake",
          "Stadtrundgang durch das historische Zentrum",
        ],
        overnight: "Übernachtung im Lu Chalet – Nuwara Eliya",
      },
      {
        days: [7],
        title: "Tag 07 – Zugfahrt nach Ella",
        image: "/tours/ella.jpg",
        description: "Erleben Sie eine der schönsten Zugstrecken der Welt.",
        activities: [
          "Horton Plains Nationalpark (früh am Morgen)",
          "Panoramazugfahrt (Blauer Zug) von Nanu Oya nach Ella",
          "Erkundung des touristischen Zentrums von Ella am Abend",
        ],
        overnight: "Übernachtung im Ella River Front – Ella",
      },
      {
        days: [8],
        title: "Tag 08 – Wildlife-Safari (Yala oder Udawalawe)",
        image: "/tours/yala.jpg",
        description:
          "Besuch der Wahrzeichen von Ella und Fahrt in den Dschungel.",
        activities: [
          "Nine Arch Bridge",
          "Ravana-Wasserfall",
          "Safari im Yala Nationalpark (oder Udawalawe nach Wahl)",
        ],
        overnight: "Übernachtung in der Boutique Villa – Yala oder Udawalawe",
      },
      {
        days: [9],
        title: "Tag 09 – Entspannung in Mirissa",
        image: "/tours/mirissa.jpg",
        description: "Weiterreise an die Südküste zu den schönsten Stränden.",
        activities: [
          "Relaxen am goldenen Strand von Mirissa",
          "Coconut Tree Hill Fotostopp",
          "Genießen des Sonnenuntergangs",
        ],
        overnight: "Übernachtung im N34 – Mirissa",
      },
      {
        days: [10],
        title: "Tag 10 – Walbeobachtung & Galle Fort",
        image: "/tours/hikkaduwa.jpg",
        description: "Meeresabenteuer und Kolonialgeschichte in Galle.",
        activities: [
          "Wal- und Delfinbeobachtung (morgens)",
          "Historischer Rundgang durch das holländische Fort in Galle",
          "Weiterfahrt nach Hikkaduwa",
        ],
        overnight: "Übernachtung im Finlanka Hotel – Hikkaduwa",
      },
      {
        days: [11],
        title: "Tag 11 – Rückreise nach Colombo",
        image: "/tours/colombo.jpg",
        description:
          "Flusssafari und Stadtbesichtigung in der Wirtschaftsmetropole.",
        activities: [
          "Madu-Flusssafari (Bentota)",
          "Stadtrundfahrt und Shopping in Colombo",
        ],
        overnight: "Übernachtung in einem ausgewählten Hotel in Colombo",
      },
      {
        days: [12],
        title: "Tag 12 – Abreise",
        image: "/tours/colombo-airport.jpg",
        description: "Ende der Reise und Transfer zum Flughafen.",
        activities: [
          "Gangaramaya-Tempel",
          "Unabhängigkeitsplatz",
        ],
        drop: "Transfer zum Bandaranaike International Airport",
      },
    ],
  },
  {
    id: "12-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "12 Tage Große Ostküsten-Rundreise",
    duration: 12,
    maxPeople: 10,
    minAge: 16,
    price: 760.0,
    image: "/tours/12-days-east-coast-tour.jpg",

    overview:
      "Erleben Sie in 12 Tagen die ultimative Reise durch Sri Lanka. Diese Tour führt Sie von den unberührten Stränden der Ostküste über die antiken Königsstädte im kulturellen Dreieck bis hin zu den nebligen Bergen des Hochlands. Perfekt für Reisende, die maximale Freiheit bei der Wahl ihrer Unterkünfte wünschen und dennoch nicht auf den Komfort eines privaten, professionellen Fahrers verzichten möchten.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen für diese Route",
      vipNote:
        "1.520 $ für 2 Personen – VIP-Luxuswagen (inklusive Fahrer & Guide)",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Service und Unterstützung",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Alle Autobahngebühren (Maut)",
    ],

    excluded: [
      "Ihre persönlichen Unterkünfte & Mahlzeiten",
      "Eintrittsgelder für alle Sehenswürdigkeiten & Aktivitäten",
      "Zugtickets",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen oder Hotel und Erkundung der Küstenstadt.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune",
        ],
        overnight: "Übernachtung in Negombo",
      },
      {
        days: [2],
        title: "Tag 02 – Von Negombo nach Ella",
        image: "/tours/ella.jpg",
        description: "Fahrt in das Hochland mit spannenden Outdoor-Stopps.",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Besuch der Ravana-Wasserfälle",
          "Wanderung zum Little Adam's Peak",
          "Nine Arch Bridge in Demodara",
        ],
        overnight: "Übernachtung in Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Von Ella nach Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description: "Erleben Sie die berühmte Zugfahrt ins 'Kleine England'.",
        activities: [
          "Panoramazugfahrt (Blauer Zug) von Ella nach Nanu Oya",
          "Victoria Park",
          "Stadtrundgang Nuwara Eliya",
          "Gregory Lake",
          "Besuch der Pedro Teeplantage",
        ],
        overnight: "Übernachtung in Nuwara Eliya",
      },
      {
        days: [4],
        title: "Tag 04 – Von Nuwara Eliya nach Kandy",
        image: "/tours/kandy.jpg",
        description: "Natur pur am Morgen und Kultur in Kandy am Abend.",
        activities: [
          "Horton Plains Nationalpark (Wanderung ab 06:00 Uhr)",
          "Ramboda-Wasserfälle",
          "Teefabrik-Besichtigung",
          "Kandy-See Spaziergang",
          "Kulturelle Tanzshow",
          "Besuch des Zahntempels",
        ],
        overnight: "Übernachtung in Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Von Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        description: "Reise in das Herz der Geschichte Sri Lankas.",
        activities: [
          "Matale Hindu-Tempel",
          "Dambulla Höhlentempel",
          "Gemüsemarkt Dambulla",
          "Authentische Dorftour mit Kochkurs & Mittagessen",
          "Safari im Eco Park ODER Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung in Habarana",
      },
      {
        days: [6],
        title: "Tag 06 – Von Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        description: "Weltkulturerbe und die ruhige Ostküste.",
        activities: [
          "Aufstieg zur Sigiriya-Felsfestung",
          "Antikes Königreich Polonnaruwa",
          "Entspannung am Pasikuda-Strand",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [7],
        title: "Tag 07 – Batticaloa Erkundung",
        image: "/tours/batticaloa.jpg",
        description:
          "Tag für Entspannung und Entdeckung der Kolonialgeschichte.",
        activities: [
          "Wassersport & Strandzeit",
          "Holländisches Fort von Batticaloa",
          "Kallady-Brücke & Leuchtturm",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [8],
        title: "Tag 08 – Von Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Fahrt zum schönsten Naturhafen im Osten.",
        activities: [
          "Marble Beach",
          "Kriegsfriedhof",
          "Uppuveli-Strand",
          "Fort Frederick",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [9],
        title: "Tag 09 – Von Trincomalee nach Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description: "Meereserlebnisse und die Wiege des Buddhismus.",
        activities: [
          "Schnorcheln bei Pigeon Island",
          "Nilaveli-Strand",
          "Koneswaram-Tempel",
          "Mihintale (Wiege des Buddhismus)",
        ],
        overnight: "Übernachtung in Anuradhapura",
      },
      {
        days: [10],
        title: "Tag 10 – Von Anuradhapura nach Kalpitiya",
        image: "/tours/kalpitiya.jpg",
        description: "Antike Monumente und Safari im größten Nationalpark.",
        activities: [
          "Stadtrundfahrt durch das antike Königreich Anuradhapura",
          "Safari im Wilpattu Nationalpark",
        ],
        overnight: "Übernachtung in Kalpitiya",
      },
      {
        days: [11],
        title: "Tag 11 – Kalpitiya & Delfine",
        image: "/tours/kalpitiya.jpg",
        description: "Ein Tag für das Meer und die Lagunen von Kalpitiya.",
        activities: [
          "Delfin-Beobachtung (Saisonal)",
          "Kitesurfen oder Strandruhe",
          "Bootsfahrt in der Lagune",
          "Alte holländische Kirche",
        ],
        overnight: "Übernachtung in Kalpitiya",
      },
      {
        days: [12],
        title: "Tag 12 – Abreise",
        image: "/tours/colombo.jpg",
        description: "Abschluss der Reise mit einer Tour durch die Hauptstadt.",
        activities: [
          "Stadtrundfahrt in Colombo",
          "Besuch des Gangaramaya-Tempels",
        ],
        drop:
          "Transfer zum Bandaranaike International Airport oder Hotel in Colombo/Negombo",
      },
    ],
  },
  {
    id: "12-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "12 Tage Große Ostküsten-Rundreise mit Hotels",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 970.0,
    image: "/tours/12-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Erleben Sie die ultimative 12-tägige Luxusreise durch Sri Lanka. Diese umfassende Tour führt Sie von den unberührten Stränden der Ostküste über die antiken Königsstädte bis hin zu den nebligen Bergen des Hochlands. Genießen Sie höchsten Komfort in handverlesenen Hotels inklusive Frühstück, begleitet von einem professionellen Fahrer-Guide in einem VIP-Fahrzeug.",

    vehicleInfo: {
      car: "1 - 3 Personen ← Luxus-Privatwagen",
      van: "4 - 10 Personen ← KDH Van",
      minimum: "Mindestteilnehmerzahl: 2 Personen",
      vipNote:
        "1.940 $ für 2 Personen – Inklusive VIP-Fahrzeug (Fahrer & Guide) und erstklassigen Sterne-Hotels mit Frühstück",
    },

    bookingOptions: [
      "Buchungsformular auf der Website ausfüllen",
      "E-Mail an info@srilankatoursdriver.com",
      "WhatsApp an (+94) 769 300 334",
    ],

    included: [
      "Voll klimatisiertes Privatfahrzeug",
      "Professioneller englischsprachiger Fahrer",
      "Hotelunterkünfte inklusive Frühstück",
      "Unterkunft & Verpflegung des Fahrers",
      "Zertifizierter Gesundheits- und Sicherheitsstandard",
      "Kraftstoff und Parkgebühren",
      "24-Stunden-Notfallservice",
      "Lokale SIM-Karte (kostenloses Datenvolumen)",
      "Kostenloses Mineralwasser",
      "Autobahngebühren (Maut)",
      "Zugtickets (Ella nach Nanu Oya)",
    ],

    excluded: [
      "Eintrittsgelder für Sehenswürdigkeiten & Aktivitäten",
      "Mittag- und Abendessen",
      "Persönliche Ausgaben",
      "Trinkgelder",
    ],

    itinerary: [
      {
        days: [1],
        title: "Tag 01 – Ankunft in Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Abholung vom Flughafen und Erkundung der charmanten Küstenstadt Negombo.",
        activities: [
          "Fischmarkt in Negombo",
          "Holländisches Fort",
          "Bootsfahrt in der Lagune",
        ],
        overnight: "Übernachtung im New Queen's Palace - Negombo (mit Pool)",
      },
      {
        days: [2],
        title: "Tag 02 – Von Negombo nach Ella",
        image: "/tours/ella.jpg",
        description: "Fahrt in das grüne Hochland mit actionreichen Stopps.",
        activities: [
          "Wildwasser-Rafting in Kitulgala",
          "Besuch der Ravana-Wasserfälle",
          "Wanderung zum Little Adam's Peak",
          "Nine Arch Bridge in Demodara",
        ],
        overnight: "Übernachtung im Sunray Homestay - Ella",
      },
      {
        days: [3],
        title: "Tag 03 – Von Ella nach Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Erleben Sie die berühmte Zugfahrt ins 'Kleine England' Sri Lankas.",
        activities: [
          "Panoramazugfahrt (Blauer Zug) von Ella nach Nanu Oya",
          "Stadtbesichtigung Nuwara Eliya",
          "Entspannung am Gregory Lake",
          "Besuch der Pedro Teeplantage",
        ],
        overnight: "Übernachtung im Lu Chalet - Nuwara Eliya",
      },
      {
        days: [4],
        title: "Tag 04 – Von Nuwara Eliya nach Kandy",
        image: "/tours/kandy.jpg",
        description: "Naturwunder am Morgen und Kultur in der Königsstadt.",
        activities: [
          "Wanderung im Horton Plains Nationalpark",
          "Ramboda-Wasserfälle",
          "Teefabrik-Besichtigung",
          "Kulturelle Tanzshow",
          "Besuch des Zahntempels in Kandy",
        ],
        overnight: "Übernachtung in der Jack Tree Lodge - Kandy",
      },
      {
        days: [5],
        title: "Tag 05 – Von Kandy nach Habarana",
        image: "/tours/habarana.jpg",
        description: "Eintauchen in die srilankische Kultur und Geschichte.",
        activities: [
          "Hindu-Tempel in Matale",
          "Goldener Höhlentempel von Dambulla",
          "Dorftour mit Kochkurs & traditionellem Mittagessen",
          "Safari im Eco Park ODER Sonnenuntergang auf dem Pidurangala-Felsen",
        ],
        overnight: "Übernachtung im Go Go Green - Habarana (mit Pool)",
      },
      {
        days: [6],
        title: "Tag 06 – Von Habarana nach Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Weltkulturerbe und Weiterreise an die goldene Ostküste.",
        activities: [
          "Aufstieg zur Sigiriya-Felsfestung",
          "Antikes Königreich Polonnaruwa",
          "Entspannung am Pasikuda-Strand (Kalkudah)",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [7],
        title: "Tag 07 – Erkundung von Batticaloa",
        image: "/tours/batticaloa.jpg",
        description:
          "Ein Tag für Entspannung am Meer und koloniale Geschichte.",
        activities: [
          "Wassersport am Pasikuda-Strand",
          "Historisches Fort von Batticaloa",
          "Leuchtturm von Batticaloa",
        ],
        overnight: "Übernachtung in Pasikuda",
      },
      {
        days: [8],
        title: "Tag 08 – Von Pasikuda nach Trincomalee",
        image: "/tours/trincomalee.jpg",
        description:
          "Fahrt nach Trincomalee, einem der schönsten Naturhäfen der Welt.",
        activities: [
          "Marble Beach",
          "Kriegsfriedhof",
          "Uppuveli-Strand",
          "Besichtigung von Fort Frederick",
        ],
        overnight: "Übernachtung in Trincomalee",
      },
      {
        days: [9],
        title: "Tag 09 – Trincomalee nach Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description: "Unterwasserabenteuer und die Wiege des Buddhismus.",
        activities: [
          "Schnorcheln im Pigeon Island Nationalpark",
          "Nilaveli-Strand",
          "Besuch des Koneswaram-Tempels",
          "Mihintale Berg",
        ],
        overnight: "Übernachtung in einem Sterne-Hotel in Anuradhapura",
      },
      {
        days: [10],
        title: "Tag 10 – Anuradhapura nach Kalpitiya",
        image: "/tours/kalpitiya.jpg",
        description: "Antike Monumente und Safari im Wilpattu Nationalpark.",
        activities: [
          "Stadtrundfahrt durch das antike Königreich Anuradhapura",
          "Safari im Wilpattu Nationalpark",
        ],
        overnight: "Übernachtung in einem Hotel in Kalpitiya",
      },
      {
        days: [11],
        title: "Tag 11 – Kalpitiya-Erkundung",
        image: "/tours/kalpitiya.jpg",
        description: "Delfine, Lagunen und Entspannung an der Westküste.",
        activities: [
          "Delfinbeobachtung (Saisonal)",
          "Kitesurfen oder Strandruhe",
          "Bootsfahrt in der Lagune",
        ],
        overnight: "Übernachtung in Kalpitiya",
      },
      {
        days: [12],
        title: "Tag 12 – Abreise",
        image: "/tours/colombo.jpg",
        description:
          "Abschluss der Reise mit einer Tour durch Colombo vor dem Abflug.",
        activities: [
          "Stadtrundfahrt in Colombo",
          "Gangaramaya-Tempel",
        ],
        drop: "Transfer zum Bandaranaike International Airport",
      },
    ],
  },
];