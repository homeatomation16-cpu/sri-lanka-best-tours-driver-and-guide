export const TOURS = [
  /* =====================================================
     1 DAY TOURS (Circuits d'une journée)
  ===================================================== */
  {
    id: "galle-one-day-tour",
    title: "Circuit Galle d'une journée",
    image: "/tours/galle-one-day-tour.jpg",
    price: 80,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Circuit Privé d'une Journée",

    overview:
      "Visitez le Sri Lanka et réservez le Circuit Galle d'une journée avec 'Sri Lanka Tours Driver'. Le Sri Lanka est un magnifique pays tropical. Nos chauffeurs sont des professionnels expérimentés et anglophones. Louez un chauffeur personnel avec voiture privée et profitez d'un trajet confortable et inoubliable vers Galle et la côte sud.",

    vehicleInfo: [
      "1 - 3 Personnes ← Voiture privée",
      "4 - 10 Personnes ← Van KDH",
      "11 - 20 Personnes ← Minibus",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Prise en charge et retour",
      "Carburant et frais de stationnement",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
      "Nourriture et boissons",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Galle",
        image: "/tours/galle.jpg",
        description:
          "Profitez d'un trajet pittoresque le long de la route côtière sud avec plusieurs arrêts touristiques.",
        activities: [
          "Arrêt à la plage de Bentota",
          "Safari en bateau sur la rivière Madu (Optionnel)",
          "Visite de la ferme des tortues",
          "Fort hollandais de Galle",
          "Phare de Galle",
          "Temps libre pour shopping et café",
        ],
        overnight: "Retour à Colombo / Negombo",
      },
    ],
  },
  {
    id: "kandy-one-day-tour",
    title: "Circuit Kandy d'une journée",
    image: "/tours/kandy-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Circuit Privé d'une Journée",

    overview:
      "Visitez le Sri Lanka et réservez le Circuit Kandy d'une journée avec 'Sri Lanka Tours Driver'. Louez un chauffeur personnel avec voiture privée et profitez d'un trajet confortable et inoubliable vers la capitale culturelle du Sri Lanka — Kandy.",

    vehicleInfo: [
      "1 - 3 Personnes ← Voiture privée",
      "4 - 10 Personnes ← Van KDH",
      "11 - 20 Personnes ← Minibus",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Prise en charge et retour",
      "Carburant et frais de stationnement",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
      "Nourriture et boissons",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Profitez d'un trajet pittoresque vers Kandy avec des expériences culturelles et naturelles en cours de route.",
        activities: [
          "Orphelinat des éléphants de Pinnawala (Optionnel)",
          "Visite du jardin d'épices à Mawanella",
          "Usine de thé et dégustation",
          "Promenade autour du lac de Kandy",
          "Temple de la Relique de la Dent Sacrée",
          "Spectacle de danse culturelle (Optionnel)",
        ],
        overnight: "Retour à Colombo / Negombo",
      },
    ],
  },
  {
    id: "sigiriya-one-day-tour",
    title: "Circuit Sigiriya d'une journée",
    image: "/tours/sigiriya-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Circuit Privé d'une Journée",

    overview:
      "Visitez le Sri Lanka et réservez le Circuit Sigiriya d'une journée avec 'Sri Lanka Tours Driver'. Louez un chauffeur personnel avec voiture privée et profitez d'un trajet confortable et inoubliable vers l'emblématique forteresse du Rocher de Sigiriya et ses attractions environnantes.",

    vehicleInfo: [
      "1 - 3 Personnes ← Voiture privée",
      "4 - 10 Personnes ← Van KDH",
      "11 - 20 Personnes ← Minibus",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Prise en charge et retour",
      "Carburant et frais de stationnement",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
      "Nourriture et boissons",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Sigiriya",
        image: "/tours/sigiriya.jpg",
        description:
          "Profitez d'un trajet pittoresque vers Sigiriya avec des expériences culturelles et naturelles en cours de route.",
        activities: [
          "Orphelinat des éléphants de Pinnawala (Optionnel)",
          "Temple de la Grotte de Dambulla",
          "Ascension de la Forteresse du Rocher de Sigiriya",
          "Visite d'un village avec déjeuner traditionnel (Optionnel)",
          "Ascension du rocher de Pidurangala pour le coucher du soleil (Optionnel)",
        ],
        overnight: "Retour à Colombo / Negombo",
      },
    ],
  },
  {
    id: "Udawalawa-Safari-one-day-tour",
    title: "Circuit Udawalawe d'une journée",
    image: "/tours/udawalawa-safari-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "Circuit Privé d'une Journée",

    overview:
      "Visitez le Sri Lanka et réservez le Circuit Uda-Walawe d'une journée avec 'Sri Lanka Tours Driver'. Profitez d'un trajet confortable et inoubliable vers le Parc National d'Uda-Walawe, l'une des meilleures destinations de safari au Sri Lanka.",

    vehicleInfo: [
      "1 - 3 Personnes ← Voiture privée",
      "4 - 10 Personnes ← Van KDH",
      "11 - 20 Personnes ← Minibus",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Prise en charge et retour",
      "Carburant et frais de stationnement",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
      "Nourriture et boissons",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Uda-Walawe",
        image: "/tours/udawalawa-safari-one-day-tour.jpg",
        description:
          "Profitez d'un trajet pittoresque vers Uda-Walawe, région riche en faune fascinante.",
        activities: [
          "Foyer de transit pour éléphants d'Udawalawe (Heures de nourrissage)",
          "Safari en Jeep dans le Parc National d'Udawalawe",
          "Trajet à travers Ratnapura (La Cité des Gemmes)",
        ],
        overnight: "Retour à Colombo / Negombo",
      },
    ],
  },

  /* =====================================================
     05 DAYS TOURS (Circuits de 5 jours)
  ===================================================== */
  {
    id: "05-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "Circuit Sud 5 jours",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 283.5,
    image: "/tours/05-days-down-south-tour.jpg",

    overview:
      "Ce circuit sud de 5 jours couvre Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Mirissa ou Hikkaduwa. Découvrez la culture, un safari animalier, un voyage en train à travers les montagnes et les magnifiques plages du sud avec un chauffeur-guide professionnel.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis",
      vipNote: "567 $ pour 2 personnes - Véhicule VIP (inclut chauffeur et guide)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Carburant",
      "Frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale",
      "Péages d'autoroute",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
      "Billet(s) de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Aéroport / Colombo à Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Prise en charge à l'aéroport ou à l'hôtel",
          "Visite du village de Hiriwadunna avec cours de cuisine",
          "Safari à l'Eco Park OU coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [2],
        title: "Jour 02 – Habarana à Kandy",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya",
          "Royaume Antique de Polonnaruwa",
          "Temple de la Grotte de Dambulla",
          "Temple Hindou de Matale",
          "Promenade au bord du lac de Kandy",
          "Spectacle culturel de Kandy",
          "Temple de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [3],
        title: "Jour 03 – Kandy à Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Visite d'une usine de thé",
          "Chutes de Ramboda",
          "Ville de Nuwara Eliya",
          "Voyage en train de Nanu Oya à Ella",
          "Little Adam's Peak (Petit Pic d'Adam)",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [4],
        title: "Jour 04 – Ella à Mirissa / Hikkaduwa",
        image: "/tours/yala.jpg",
        activities: [
          "Pont aux Neuf Arches",
          "Cascade de Ravana",
          "Foyer de transit pour éléphants",
          "Safari au Parc National d'Udawalawe",
        ],
        overnight: "Nuit à Mirissa ou Hikkaduwa",
      },
      {
        days: [5],
        title: "Jour 05 – Plage à Colombo / Aéroport",
        image: "/tours/colombo.jpg",
        activities: [
          "Observation des baleines (Saisonnier)",
          "Fort hollandais de Galle",
          "Centre de conservation des tortues",
          "Safari en bateau sur la rivière Madu",
          "Visite de la ville de Colombo",
        ],
        drop: "Transfert à l'aéroport ou à l'hôtel à Colombo",
      },
    ],
  },
  {
    id: "05-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "Circuit Sud 5 jours avec Hôtels",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 382.5,
    image: "/tours/05-days-down-south-tour-with-hotels.jpg",

    overview:
      "Ce circuit sud de 5 jours avec hôtels couvre Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Mirissa ou Hikkaduwa. Le forfait inclut des hébergements de qualité sélectionnés avec petit-déjeuner, un véhicule privé et un chauffeur-guide professionnel.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis",
      vipNote:
        "765 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur) et hôtel étoilé avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Carburant",
      "Frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale & bouteilles d'eau",
      "Péages d'autoroute",
    ],

    excluded: [
      "Frais d'entrée et activités",
      "Billet(s) de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Aéroport / Colombo à Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Prise en charge à l'aéroport ou à l'hôtel",
          "Visite du village de Hiriwadunna avec cours de cuisine",
          "Safari à l'Eco Park OU coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit au Go Go Green - Habarana (Avec Piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – Habarana à Kandy",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya",
          "Royaume Antique de Polonnaruwa",
          "Temple de la Grotte de Dambulla",
          "Marché de légumes de Dambulla",
          "Temple Hindou de Matale",
          "Promenade au bord du lac de Kandy",
          "Spectacle culturel de Kandy",
          "Temple de la Dent Sacrée",
        ],
        overnight: "Nuit au Jack Tree Lodge - Kandy",
      },
      {
        days: [3],
        title: "Jour 03 – Kandy à Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Visite de l'usine de thé Glenloch",
          "Chutes de Ramboda",
          "Visite de la ville de Nuwara Eliya",
          "Voyage en train de Nanu Oya à Ella (Le Train Bleu)",
          "Little Adam's Peak (Petit Pic d'Adam)",
        ],
        overnight: "Nuit au Sunray Homestay - Ella",
      },
      {
        days: [4],
        title: "Jour 04 – Ella à Mirissa / Hikkaduwa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Pont aux Neuf Arches",
          "Point de vue d'Ella Rock OU Grotte de Ravana & Buduruwagala",
          "Cascade de Ravana",
          "Foyer de transit pour éléphants",
          "Safari au Parc National d'Udawalawe",
        ],
        overnight:
          "Nuit au N34 - Mirissa OU Finlanka Hotel - Hikkaduwa (Avec Piscine)",
      },
      {
        days: [5],
        title: "Jour 05 – Départ vers Colombo / Aéroport",
        image: "/tours/colombo.jpg",
        options: [
          {
            title: "Option 01 – Depuis Mirissa",
            activities: [
              "Observation des baleines (Saisonnier)",
              "Colline du Cocotier (Coconut Tree Hill)",
              "Centre de conservation des tortues",
              "Visite de la ville de Colombo",
            ],
          },
          {
            title: "Option 02 – Depuis Hikkaduwa",
            activities: [
              "Fort hollandais de Galle",
              "Pagode de la Paix Japonaise",
              "Plage d'Hikkaduwa",
              "Safari en bateau sur la rivière Madu",
              "Visite de la ville de Colombo",
            ],
          },
        ],
        drop: "Transfert à l'aéroport ou à l'hôtel à Colombo",
      },
    ],
  },
  {
    id: "05-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "Circuit Côte Est 5 jours",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 340.0,
    image: "/tours/05-days-east-coast-tour.jpg",

    overview:
      "Ce circuit côte est de 5 jours couvre Kandy, Habarana, Polonnaruwa, Pasikuda, Trincomalee et Negombo. Découvrez le patrimoine culturel, les anciennes cités, un safari animalier et les plages relaxantes de la côte est.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis",
      vipNote: "680 $ pour 2 personnes - Véhicule VIP (inclut chauffeur et guide)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Carburant",
      "Frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale & bouteilles d'eau",
      "Péages d'autoroute",
    ],

    excluded: [
      "Votre hébergement et vos repas",
      "Frais d'entrée et activités",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Prise en charge à l'aéroport ou à l'hôtel",
          "Orphelinat des éléphants de Pinnawala",
          "Promenade au bord du lac de Kandy",
          "Spectacle culturel de Kandy",
          "Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [2],
        title: "Jour 02 – Kandy à Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Temple Hindou de Matale",
          "Temple de la Grotte de Dambulla",
          "Marché de légumes de Dambulla",
          "Visite de village avec cours de cuisine et déjeuner",
          "Safari à l'Eco Park OU coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – Habarana à Pasikuda",
        image: "/tours/pasikuda.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya",
          "Royaume Antique de Polonnaruwa",
          "Plage de Pasikuda (Plage de Kalkudah)",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [4],
        title: "Jour 04 – Pasikuda à Trincomalee",
        image: "/tours/trincomalee.jpg",
        activities: [
          "Marble Beach",
          "Temple Koneswaram",
          "Fort Frederick",
          "Parc National de Pigeon Island (Île aux Pigeons)",
          "Plage de Nilaveli",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [5],
        title: "Jour 05 – Trincomalee à Negombo / Colombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Tour de la lagune de Negombo OU Visite de la ville de Colombo",
        ],
        drop: "Transfert à l'Aéroport International Bandaranaike ou à l'hôtel",
      },
    ],
  },
  {
    id: "05-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "Circuit Côte Est 5 jours avec Hôtels",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/05-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Ce circuit côte est de 5 jours avec hôtels couvre Kandy, Habarana, Polonnaruwa, Pasikuda, Trincomalee et Negombo. Le forfait inclut des hébergements de qualité sélectionnés avec petit-déjeuner.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis",
      vipNote:
        "800 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur) et hôtel étoilé avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Carburant",
      "Frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale & bouteilles d'eau gratuites",
      "Péages d'autoroute",
    ],

    excluded: [
      "Frais d'entrée et activités",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Colombo / Negombo à Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Prise en charge à l'aéroport ou à l'hôtel",
          "Orphelinat des éléphants de Pinnawala",
          "Promenade au bord du lac de Kandy",
          "Spectacle culturel de Kandy",
          "Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit au Jack Tree Lodge - Kandy",
      },
      {
        days: [2],
        title: "Jour 02 – Kandy à Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Temple Hindou de Matale",
          "Temple de la Grotte de Dambulla",
          "Marché de légumes de Dambulla",
          "Visite de village avec cours de cuisine et déjeuner",
          "Safari à l'Eco Park OU coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit au Go Go Green - Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – Habarana à Pasikuda",
        image: "/tours/pasikuda.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya",
          "Royaume Antique de Polonnaruwa",
          "Plage de Pasikuda (Plage de Kalkudah)",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [4],
        title: "Jour 04 – Pasikuda à Trincomalee",
        image: "/tours/trincomalee.jpg",
        activities: [
          "Marble Beach",
          "Temple Koneswaram",
          "Fort Frederick",
          "Parc National de Pigeon Island",
          "Plage de Nilaveli",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [5],
        title: "Jour 05 – Trincomalee à Negombo / Colombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Tour de la lagune de Negombo OU Visite de la ville de Colombo",
        ],
        drop:
          "Transfert à l'Aéroport International Bandaranaike ou à l'hôtel à Negombo / Colombo",
      },
    ],
  },

  /* =====================================================
     08 DAYS TOURS (Circuits de 8 jours)
  ===================================================== */
  {
    id: "08-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "Circuit Sud 8 jours",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 335.0,
    image: "/tours/08-days-down-south-tour.jpg",

    overview:
      "Visitez le Sri Lanka et réservez cet incroyable forfait de 8 jours. Ce circuit couvre les destinations les plus emblématiques : Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa et Colombo. Profitez d'une combinaison parfaite de patrimoine culturel, de paysages montagneux, de safaris et de plages paradisiaques avec la liberté de choisir votre propre hébergement.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour ce circuit",
      vipNote:
        "670 $ pour 2 personnes - Véhicule VIP (inclut chauffeur et guide professionnel)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Certificat de santé et de sécurité",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (avec données gratuites)",
      "Bouteilles d'eau minérale offertes",
    ],

    excluded: [
      "Votre hébergement et vos repas personnels",
      "Frais d'entrée aux sites archéologiques et activités",
      "Billets de train",
      "Dépenses personnelles",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée et Negombo",
        image: "/tours/negombo.jpg",
        description: "Prise en charge à l'aéroport ou à votre hôtel à Colombo/Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais de Negombo",
          "Promenade en bateau sur la lagune de Negombo",
        ],
        overnight: "Nuit à Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Habarana",
        image: "/tours/habarana.jpg",
        activities: [
          "Orphelinat des éléphants de Pinnawala (optionnel)",
          "Visite de village avec déjeuner traditionnel sri-lankais",
          "Safari sauvage à l'Eco Park OU coucher de soleil au rocher de Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – Le cœur du Triangle Culturel : Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Ascension de la Forteresse du Rocher de Sigiriya",
          "Ancien royaume de Polonnaruwa",
          "Temple de la Grotte de Dambulla",
          "Visite du Temple de la Dent Sacrée",
          "Spectacle de danse culturelle traditionnelle",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – De Kandy vers Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Visite d'une usine de thé avec dégustation",
          "Chutes de Ramboda",
          "Trajet pittoresque dans le Train Bleu",
          "Randonnée au Little Adam's Peak",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [5],
        title: "Jour 05 – Choisissez votre itinéraire",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "Option 01 – D'Ella vers Yala",
            activities: [
              "Pont aux Neuf Arches",
              "Cascade de Ravana",
              "Temple rupestre de Buduruwagala",
            ],
            overnight: "Nuit à Yala",
          },
          {
            title: "Option 02 – D'Ella vers Mirissa",
            activities: [
              "Pont aux Neuf Arches",
              "Safari au Parc National d'Udawalawe",
            ],
            overnight: "Nuit à Mirissa",
          },
        ],
        note: "Les activités du lendemain dépendront de l'itinéraire choisi aujourd'hui.",
      },
      {
        days: [6],
        title: "Jour 06 – Suite de l'itinéraire choisi",
        image: "/tours/mirissa.jpg",
        options: [
          {
            title: "Option 01 – De Yala vers Mirissa",
            activities: [
              "Safari matinal au Parc National de Yala",
              "Détente sur la plage de Goyambokka",
            ],
            overnight: "Nuit à Mirissa",
          },
          {
            title: "Option 02 – De Mirissa vers Hikkaduwa",
            activities: [
              "Observation des baleines (saisonnier)",
              "Exploration du Fort Hollandais de Galle",
            ],
            overnight: "Nuit à Hikkaduwa",
          },
        ],
      },
      {
        days: [7],
        title: "Jour 07 – Détente à Hikkaduwa",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "Temps libre sur la plage",
          "Plongée avec tuba dans le sanctuaire marin",
          "Pratique du surf",
        ],
        overnight: "Nuit à Hikkaduwa",
      },
      {
        days: [8],
        title: "Jour 08 – Colombo et Départ",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Safari en bateau sur la rivière Madu (Bentota)",
          "Visite panoramique de la ville de Colombo",
        ],
        drop: "Transfert à l'Aéroport International ou à votre hôtel",
      },
    ],
  },
  {
    id: "08-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "Circuit Sud 8 jours avec Hôtels",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 475.0,
    image: "/tours/08-days-down-south-tour-with-hotels.jpg",

    overview:
      "Explorez les destinations les plus emblématiques du sud et du centre du Sri Lanka lors d'un voyage de 8 jours. Ce forfait vous offre un confort maximal avec des hôtels de qualité sélectionnés, petits-déjeuners inclus et un chauffeur-guide professionnel. De la spiritualité de Kandy aux safaris de Yala et aux plages dorées de Mirissa, vivez une expérience inoubliable.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour cette réservation",
      vipNote:
        "950 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide) et hôtels de catégorie supérieure avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement dans des hôtels sélectionnés avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Certificat de santé et de sécurité",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
    ],

    excluded: [
      "Frais d'entrée aux sites archéologiques et activités",
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée et Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport et premier contact avec la côte sri-lankaise.",
        activities: [
          "Accueil à l'aéroport",
          "Exploration de la lagune de Negombo",
          "Visite du marché aux poissons local",
        ],
        overnight: "Nuit au New Queen's Palace - Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Habarana",
        image: "/tours/habarana.jpg",
        description: "Voyage au cœur du Triangle Culturel.",
        activities: [
          "Visite authentique d'un village",
          "Safari sauvage l'après-midi (Eco Park ou Minneriya)",
        ],
        overnight: "Nuit au Go Go Green - Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – La capitale royale : Kandy",
        image: "/tours/kandy.jpg",
        description: "Immersion dans la spiritualité et les traditions de Kandy.",
        activities: [
          "Visite du célèbre Temple de la Relique de la Dent",
          "Spectacle de danse culturelle traditionnelle",
          "Promenade autour du lac de Kandy",
        ],
        overnight: "Nuit au Jack Tree Lodge - Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – De Kandy vers Ella",
        image: "/tours/ella.jpg",
        description: "Un voyage pittoresque vers les montagnes brumeuses.",
        activities: [
          "Voyage dans le célèbre Train Bleu à travers les plantations de thé",
          "Randonnée au Little Adam's Peak pour des vues panoramiques",
          "Visite du Pont aux Neuf Arches",
        ],
        overnight: "Nuit au Sunray Homestay - Ella",
      },
      {
        days: [5],
        title: "Jour 05 – Aventure sauvage à Yala",
        image: "/tours/yala.jpg",
        description:
          "À la recherche de l'insaisissable léopard dans le parc le plus célèbre de l'île.",
        activities: [
          "Cascade de Ravana",
          "Safari en Jeep dans le Parc National de Yala",
        ],
        overnight: "Nuit à Boutique Villa - Yala",
      },
      {
        days: [6],
        title: "Jour 06 – Vers les plages de Mirissa",
        image: "/tours/mirissa.jpg",
        description: "Détente totale face à l'Océan Indien.",
        activities: [
          "Temps de détente sur la plage de Mirissa",
          "Visite de la très photogénique Colline du Cocotier (Coconut Tree Hill)",
        ],
        overnight: "Nuit au N34 - Mirissa",
      },
      {
        days: [7],
        title: "Jour 07 – Côte Sud : Hikkaduwa et Galle",
        image: "/tours/hikkaduwa.jpg",
        description: "Histoire coloniale et récifs coralliens.",
        activities: [
          "Plongée avec tuba dans les jardins de coraux d'Hikkaduwa",
          "Exploration du Fort Hollandais de Galle (Site classé au Patrimoine de l'UNESCO)",
        ],
        overnight: "Nuit au Finlanka Hotel - Hikkaduwa",
      },
      {
        days: [8],
        title: "Jour 08 – Colombo et Départ",
        image: "/tours/colombo-airport.jpg",
        description: "Fin du circuit avec une visite de la capitale vibrante.",
        activities: [
          "Visite panoramique de la ville de Colombo",
          "Transfert à l'aéroport international",
        ],
        drop: "Transfert à l'Aéroport International de Colombo",
      },
    ],
  },
  {
    id: "08-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "Circuit Côte Est 8 jours",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 510.0,
    image: "/tours/08-days-east-coast-tour.jpg",

    overview:
      "Profitez d'une aventure de 8 jours à la découverte des plages immaculées de la côte est, de la riche culture et des impressionnantes montagnes du Sri Lanka. Cet itinéraire est conçu pour ceux qui recherchent un mélange parfait entre détente côtière, histoire ancienne et paysages montagneux, avec la flexibilité de gérer votre propre hébergement.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour ce circuit",
      vipNote:
        "1 020 $ pour 2 personnes - Véhicule de luxe VIP (inclut chauffeur et guide professionnel)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
    ],

    excluded: [
      "Votre hébergement et vos repas personnels",
      "Frais d'entrée aux sites archéologiques et activités",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport et premier contact avec la culture locale à Negombo.",
        activities: [
          "Promenade sur la lagune de Negombo",
          "Visite du marché aux poissons",
          "Exploration du Fort Hollandais",
        ],
        overnight: "Nuit à Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – Vers les montagnes d'Ella",
        image: "/tours/ella.jpg",
        description:
          "Transfert vers l'intérieur du pays avec des arrêts remplis d'adrénaline et des vues emblématiques.",
        activities: [
          "Rafting en eaux vives à Kitulgala (optionnel)",
          "Visite du Pont aux Neuf Arches",
          "Cascade de Ravana",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [3],
        title: "Jour 03 – Capitale des montagnes : Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Découvrez la spiritualité et le patrimoine de la capitale culturelle de l'île.",
        activities: [
          "Visite du Temple de la Relique de la Dent Sacrée",
          "Promenade autour du lac de Kandy",
          "Spectacle de danse traditionnelle",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – Habarana et le Triangle Culturel",
        image: "/tours/habarana.jpg",
        description: "Immersion dans la vie rurale et safari aux éléphants.",
        activities: [
          "Tour de village avec cours de cuisine traditionnelle",
          "Safari en Jeep à l'Eco Park ou Minneriya",
          "Coucher de soleil au rocher de Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [5],
        title: "Jour 05 – Détente à Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Arrivée sur les plages de sable blanc et les eaux calmes de la côte est.",
        activities: [
          "Temps libre sur la plage de Pasikuda (Kalkudah)",
          "Détente face à la mer",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [6],
        title: "Jour 06 – Aventure à Trincomalee",
        image: "/tours/trincomalee.jpg",
        description:
          "Transfert vers Trincomalee pour profiter du soleil et des activités nautiques.",
        activities: [
          "Sports nautiques sur la plage",
          "Visite de la plage d'Uppuveli",
          "Exploration du centre historique",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [7],
        title: "Jour 07 – Les trésors de Trincomalee",
        image: "/tours/trincomalee.jpg",
        description:
          "Une journée pour explorer la biodiversité marine et les temples sacrés.",
        activities: [
          "Plongée avec tuba dans le Parc National de Pigeon Island",
          "Détente sur la plage de Nilaveli",
          "Visite du Temple Koneswaram",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [8],
        title: "Jour 08 – Colombo et Départ",
        image: "/tours/colombo-airport.jpg",
        description:
          "Fin du voyage avec une visite de la capitale commerciale avant votre vol.",
        activities: [
          "Visite panoramique de la ville de Colombo",
          "Derniers achats de souvenirs",
        ],
        drop: "Transfert à l'Aéroport International ou à votre hôtel à Colombo",
      },
    ],
  },
  {
    id: "08-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "Circuit Côte Est 8 jours avec Hôtels",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 630.0,
    image: "/tours/08-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Vivez une aventure inoubliable de 8 jours au Sri Lanka. Ce circuit vous mènera du charme colonial de Negombo aux montagnes brumeuses d'Ella et de Kandy, pour se terminer sur les spectaculaires plages de sable blanc de Pasikuda et Trincomalee. Le forfait comprend des hébergements sélectionnés avec petit-déjeuner, un véhicule privé et un chauffeur-guide professionnel.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour cette réservation",
      vipNote:
        "1 260 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide) et hôtels de catégorie supérieure avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé avec la climatisation",
      "Chauffeur professionnel anglophone",
      "Hébergement dans des hôtels avec petit-déjeuner inclus",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
      "Billets de train et activités sélectionnées",
    ],

    excluded: [
      "Frais d'entrée aux sites et monuments",
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Pourboires",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport et exploration de la ville des canaux.",
        activities: [
          "Visite du marché aux poissons de Negombo",
          "Exploration de l'ancien Fort Hollandais",
          "Promenade en bateau sur la lagune de Negombo",
        ],
        overnight: "Nuit au New Queen's Palace - Negombo (avec piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Ella",
        image: "/tours/ella.jpg",
        description: "Voyage vers les montagnes centrales avec des arrêts aventure.",
        activities: [
          "Rafting en eaux vives à Kitulgala",
          "Visite des majestueuses cascades de Ravana",
          "Randonnée au Little Adam's Peak",
          "Visite de l'emblématique Pont aux Neuf Arches",
        ],
        overnight: "Nuit au Sunray Homestay - Ella",
      },
      {
        days: [3],
        title: "Jour 03 – D'Ella vers Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Voyage dans le célèbre Train Bleu et arrivée dans la capitale culturelle.",
        activities: [
          "Trajet pittoresque en train d'Ella à Nanu Oya",
          "Visite de la ville de Nuwara Eliya",
          "Cascades de Ramboda",
          "Visite d'une usine de thé avec dégustation",
          "Promenade autour du lac de Kandy",
          "Spectacle de danse traditionnelle et Temple de la Dent",
        ],
        overnight: "Nuit au Jack Tree Lodge - Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – De Kandy vers Habarana",
        image: "/tours/habarana.jpg",
        description: "Histoire ancienne et contact avec la nature.",
        activities: [
          "Temple hindou de Matale",
          "Temple d'Or de Dambulla",
          "Visite du marché local de légumes",
          "Visite de village avec cours de cuisine et déjeuner traditionnel",
          "Safari à l'Eco Park ou coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit au Go Go Green - Habarana (avec piscine)",
      },
      {
        days: [5],
        title: "Jour 05 – De Habarana vers Pasikuda",
        image: "/tours/pasikuda.jpg",
        description: "Ascension du rocher de Sigiriya et arrivée sur la côte est.",
        activities: [
          "Ascension de la Forteresse de Sigiriya",
          "Visite de l'ancien Royaume de Polonnaruwa",
          "Détente sur la plage de Pasikuda",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [6],
        title: "Jour 06 – De Pasikuda vers Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Voyage vers le nord de la côte est.",
        activities: [
          "Temps libre à la plage et sports nautiques",
          "Visite du cimetière de guerre britannique",
          "Exploration de la plage d'Uppuveli",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [7],
        title: "Jour 07 – Exploration de Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Découverte des trésors marins et des temples sacrés.",
        activities: [
          "Visite de Marble Beach",
          "Temple Koneswaram",
          "Exploration du Fort Frederick",
          "Plongée avec tuba à Pigeon Island (Île aux Pigeons) et Nilaveli",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [8],
        title: "Jour 08 – Départ",
        image: "/tours/colombo-airport.jpg",
        description: "Fin du circuit et transfert de retour.",
        activities: [
          "Tour de la ville de Colombo ou lagune de Negombo (selon l'horaire de votre vol)",
        ],
        drop: "Transfert à l'Aéroport International ou à votre hôtel à Colombo/Negombo",
      },
    ],
  },

  /* =====================================================
     10 DAYS TOURS (Circuits de 10 jours)
  ===================================================== */
  {
    id: "10-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "Circuit Sud 10 jours",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/10-days-down-south-tour.jpg",

    overview:
      "Ce circuit de 10 jours dans le sud couvre Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa et Colombo. C'est un itinéraire parfait qui combine le patrimoine culturel des villes anciennes, la fraîcheur des hautes terres, les safaris animaliers et les plages les plus célèbres du Sri Lanka.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis",
      vipNote:
        "1 600 $ pour 2 personnes - Véhicule VIP de luxe (inclut chauffeur et guide)",
    },

    bookingOptions: [
      "Remplir le formulaire sur le site web",
      "Envoyer un e-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Carburant et péages d'autoroute",
      "Frais de stationnement",
      "Carte SIM locale (avec données gratuites)",
      "Bouteilles d'eau minérale offertes",
    ],

    excluded: [
      "Votre hébergement personnel",
      "Frais d'entrée aux sites et activités",
      "Repas et boissons",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée et Transfert vers Habarana",
        image: "/tours/habarana.jpg",
        description:
          "Prise en charge à l'aéroport ou à votre hôtel et voyage vers le Triangle Culturel.",
        activities: [
          "Marché aux poissons de Negombo",
          "Coucher de soleil au rocher de Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [2],
        title: "Jour 02 – Sigiriya et Polonnaruwa",
        image: "/tours/sigiriya.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya (07h00)",
          "Balade à vélo dans l'ancien royaume de Polonnaruwa",
          "Visite du village de Hiriwadunna avec cours de cuisine et déjeuner traditionnel",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – Capitale Culturelle : Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Temple de la Grotte de Dambulla",
          "Temple Nalanda Gedige",
          "Temple Hindou de Matale",
          "Spectacle de danse culturelle à Kandy",
          "Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Chutes de Ramboda",
          "Visite d'une usine et d'une plantation de thé",
          "Visite à pied de la ville coloniale",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [5],
        title: "Jour 05 – Horton Plains et Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Parc National de Horton Plains (05h00)",
          "Trajet pittoresque en train de Nanu Oya à Ella",
          "Pont aux Neuf Arches",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [6],
        title: "Jour 06 – Exploration d'Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Little Adam's Peak (Petit Pic d'Adam)",
          "Grotte de Ravana",
          "Randonnée jusqu'à Ella Rock",
          "Cascade secrète",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [7],
        title: "Jour 07 – Safari à Yala",
        image: "/tours/yala.jpg",
        activities: [
          "Cascades de Ravana",
          "Temple rupestre de Buduruwagala",
          "Safari dans le Parc National de Yala",
        ],
        overnight: "Nuit à Yala",
      },
      {
        days: [8],
        title: "Jour 08 – Plages de Mirissa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Détente sur la plage de Mirissa",
          "Plage de Weligama",
          "Plage d'Unawatuna",
        ],
        overnight: "Nuit à Mirissa",
      },
      {
        days: [9],
        title: "Jour 09 – Mirissa et les Baleines",
        image: "/tours/mirissa.jpg",
        activities: [
          "Observation des baleines (saisonnier)",
          "Temps libre pour profiter de l'océan",
        ],
        overnight: "Nuit à Mirissa",
      },
      {
        days: [10],
        title: "Jour 10 – Galle, Colombo et Départ",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Fort Hollandais de Galle",
          "Projet de conservation des tortues",
          "Visite de la ville de Colombo",
          "Temple Gangaramaya",
          "Place de l'Indépendance",
        ],
        drop: "Transfert à l'aéroport ou à votre hôtel",
      },
    ],
  },
  {
    id: "10-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "Circuit Sud 10 jours avec Hôtels",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 580.0,
    image: "/tours/10-days-down-south-tour-with-hotels.jpg",

    overview:
      "Explorez le meilleur du Sri Lanka avec notre forfait exclusif de 10 jours. Ce voyage inclut Negombo, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa et Colombo. Profitez d'une combinaison parfaite de culture, montagnes, faune sauvage et plages avec le confort d'hôtels sélectionnés incluant le petit-déjeuner.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour réserver cet itinéraire",
      vipNote:
        "1 160 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide) et hôtels étoilés sélectionnés avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement en hôtel avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
      "Frais d'entrée pour les sites et activités mentionnés",
      "Billets de train",
    ],

    excluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Pourboires",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée et Habarana",
        image: "/tours/habarana.jpg",
        description: "Prise en charge à l'aéroport ou à votre hôtel et transfert vers Habarana.",
        activities: [
          "Marché aux poissons de Negombo",
          "Coucher de soleil au rocher de Pidurangala",
        ],
        overnight: "Nuit au Go Go Green – Habarana (avec piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – Sigiriya et Polonnaruwa",
        image: "/tours/sigiriya.jpg",
        description: "Découvrez le Triangle Culturel et la vie rurale du Sri Lanka.",
        activities: [
          "Ascension de la Forteresse de Sigiriya (07h00)",
          "Balade à vélo dans l'ancien royaume de Polonnaruwa",
          "Visite du village de Hiriwadunna avec cours de cuisine et déjeuner traditionnel",
        ],
        overnight: "Nuit au Go Go Green – Habarana",
      },
      {
        days: [3],
        title: "Jour 03 – Kandy",
        image: "/tours/kandy.jpg",
        description: "Voyage vers la capitale culturelle et visite de sites sacrés.",
        activities: [
          "Temple de la Grotte de Dambulla",
          "Temple Nalanda Gedige",
          "Temple Hindou de Matale",
          "Spectacle de danse culturelle à Kandy",
          "Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit au Jack Tree Lodge – Kandy",
      },
      {
        days: [4],
        title: "Jour 04 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Explorez la 'Petite Angleterre' et ses vastes plantations de thé.",
        activities: [
          "Chutes de Ramboda",
          "Visite d'une usine et plantation de thé",
          "Visite à pied de la ville de Nuwara Eliya",
        ],
        overnight: "Nuit au Lu Chalet – Nuwara Eliya",
      },
      {
        days: [5],
        title: "Jour 05 – Horton Plains et Ella",
        image: "/tours/ella.jpg",
        description: "Randonnée matinale et le célèbre trajet en train panoramique.",
        activities: [
          "Parc National de Horton Plains (05h00)",
          "Voyage dans le Train Bleu de Nanu Oya à Ella",
          "Pont aux Neuf Arches à Demodara",
        ],
        overnight: "Nuit au Ella River Front – Ella",
      },
      {
        days: [6],
        title: "Jour 06 – Exploration d'Ella",
        image: "/tours/ella.jpg",
        description:
          "Une journée dédiée à la nature et aux vues panoramiques d'Ella.",
        activities: [
          "Randonnée au Little Adam's Peak",
          "Grotte de Ravana",
          "Ascension d'Ella Rock",
          "Découverte de la cascade secrète",
        ],
        overnight: "Nuit au Ella River Front – Ella",
      },
      {
        days: [7],
        title: "Jour 07 – Aventure à Yala",
        image: "/tours/yala.jpg",
        description: "Voyage vers la jungle pour un safari de la faune sauvage.",
        activities: [
          "Chute d'eau de Ravana",
          "Temple rupestre de Buduruwagala",
          "Safari dans le Parc National de Yala",
        ],
        overnight: "Nuit à Boutique Villa – Yala",
      },
      {
        days: [8],
        title: "Jour 08 – Vers Mirissa",
        image: "/tours/mirissa.jpg",
        description: "Transfert vers la côte sud pour profiter des plages dorées.",
        activities: [
          "Détente sur la plage de Mirissa",
          "Plage de Weligama",
          "Plage d'Unawatuna",
        ],
        overnight: "Nuit au N34 – Mirissa",
      },
      {
        days: [9],
        title: "Jour 09 – Mirissa et les Baleines",
        image: "/tours/mirissa.jpg",
        description: "Journée de détente ou aventures dans l'océan Indien.",
        activities: [
          "Observation des baleines (tôt le matin)",
          "Temps libre sur la plage",
        ],
        overnight: "Nuit au N34 – Mirissa",
      },
      {
        days: [10],
        title: "Jour 10 – Colombo et Départ",
        image: "/tours/colombo.jpg",
        description: "Fin du circuit avec des visites historiques avant votre vol.",
        activities: [
          "Fort hollandais de Galle",
          "Projet de conservation des tortues marines",
          "Visite de la ville de Colombo",
          "Temple Gangaramaya",
          "Place de l'Indépendance",
        ],
        drop: "Transfert à l'aéroport ou à votre hôtel à Colombo",
      },
    ],
  },
  {
    id: "10-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "Circuit Côte Est 10 jours",
    duration: 10,
    maxPeople: 10,
    minAge: 16,
    price: 640.0,
    image: "/tours/10-days-east-coast-tour.jpg",

    overview:
      "Découvrez les merveilles de la côte est du Sri Lanka avec son riche patrimoine culturel et les paysages des montagnes lors d'un voyage de 10 jours. Cet itinéraire complet couvre Negombo, Ella, Nuwara Eliya, Kandy, Habarana, Polonnaruwa, Pasikuda et Trincomalee. Profitez d'une flexibilité maximale avec un chauffeur privé professionnel anglophone.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour réserver cet itinéraire",
      vipNote: "1 280 $ pour 2 personnes - Véhicule de luxe VIP (inclut chauffeur et guide)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
    ],

    excluded: [
      "Votre hébergement et vos repas personnels",
      "Frais d'entrée aux sites et activités",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport ou à votre hôtel et exploration de la ville côtière de Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais",
          "Promenade sur la lagune de Negombo",
        ],
        overnight: "Nuit à Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Ella",
        image: "/tours/ella.jpg",
        description:
          "Voyage vers les Hautes Terres avec des aventures en pleine nature en cours de route.",
        activities: [
          "Rafting en eaux vives à Kitulgala",
          "Visite des cascades de Ravana",
          "Randonnée au Little Adam's Peak",
          "Pont aux Neuf Arches à Demodara",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [3],
        title: "Jour 03 – D'Ella vers Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Voyage au cœur de la production de thé et de la 'Petite Angleterre'.",
        activities: [
          "Voyage en train pittoresque d'Ella à Nanu Oya",
          "Parc Victoria",
          "Visite à pied de la ville de Nuwara Eliya",
          "Temps libre au bord du Lac Gregory",
          "Visite de la plantation de thé Pedro",
          "Temple Seetha Amman",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [4],
        title: "Jour 04 – De Nuwara Eliya vers Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Merveilles naturelles le matin et culture dans la capitale des montagnes.",
        activities: [
          "Parc National de Horton Plains (Randonnée à partir de 06h00)",
          "Cascades de Baker",
          "Ferme Ambewela",
          "Cascades de Ramboda",
          "Usine de thé de Glenloch & Plantation",
          "Promenade autour du lac de Kandy",
          "Spectacle de danse culturelle",
          "Temple de la Dent Sacrée (Sri Dalada Maligawa)",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – De Kandy vers Habarana",
        image: "/tours/habarana.jpg",
        description: "En route vers le cœur du Triangle Culturel du Sri Lanka.",
        activities: [
          "Temple hindou de Matale",
          "Temple de la Grotte de Dambulla",
          "Marché de légumes de Dambulla",
          "Visite de village avec cours de cuisine et déjeuner traditionnel",
          "Safari à l'Eco Park OU coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [6],
        title: "Jour 06 – De Habarana vers Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Patrimoine mondial et les plages de sable blanc de l'est.",
        activities: [
          "Ascension de la Forteresse de Sigiriya",
          "Ancien royaume de Polonnaruwa",
          "Détente sur la plage de Pasikuda (Kalkudah)",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [7],
        title: "Jour 07 – Exploration de Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Journée de détente et découverte de l'histoire coloniale.",
        activities: [
          "Sports nautiques et temps à la plage",
          "Fort historique de Batticaloa",
          "Pont de Kallady",
          "Phare de Batticaloa",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [8],
        title: "Jour 08 – De Pasikuda vers Trincomalee",
        image: "/tours/trincomalee.jpg",
        description:
          "Voyage vers Trincomalee, l'un des plus beaux ports naturels au monde.",
        activities: [
          "Marble Beach",
          "Cimetière de guerre britannique",
          "Plage d'Uppuveli",
          "Exploration du Fort Frederick",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [9],
        title: "Jour 09 – Trincomalee et Pigeon Island",
        image: "/tours/trincomalee.jpg",
        description:
          "Découverte de la riche vie marine et des temples historiques.",
        activities: [
          "Plongée avec tuba au Parc National de Pigeon Island (Île aux Pigeons)",
          "Détente sur la plage de Nilaveli",
          "Temple historique Koneswaram",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [10],
        title: "Jour 10 – Départ vers Colombo / Aéroport",
        image: "/tours/colombo-airport.jpg",
        description:
          "Fin du voyage avec un transfert final vers la capitale ou l'aéroport.",
        activities: [
          "Tour optionnel de la ville de Colombo (selon l'horaire de votre vol)",
        ],
        drop:
          "Transfert à l'Aéroport International ou à votre hôtel à Colombo/Negombo",
      },
    ],
  },
  {
    id: "10-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "Circuit Côte Est 10 jours avec Hôtels",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 790.0,
    image: "/tours/10-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Visitez le Sri Lanka et réservez avec nous un incroyable forfait de 10 jours. Ce voyage couvre Negombo, Ella, Nuwara Eliya, Kandy, Habarana, Polonnaruwa, Pasikuda et Trincomalee. Profitez d'un confort maximal avec un véhicule VIP, un chauffeur-guide professionnel et un hébergement dans des hôtels sélectionnés incluant le petit-déjeuner.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour réserver cet itinéraire",
      vipNote:
        "1 580 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide) et hôtels étoilés sélectionnés avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement dans des hôtels avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Certificat de santé et de sécurité",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
      "Frais d'entrée à tous les sites et activités mentionnés",
      "Billets de train (d'Ella à Nanu Oya)",
    ],

    excluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Pourboires",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport ou à votre hôtel et exploration de la ville côtière de Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais",
          "Promenade en bateau sur la lagune de Negombo",
        ],
        overnight: "Nuit au New Queen's Palace - Negombo (avec piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Ella",
        image: "/tours/ella.jpg",
        description: "Voyage vers les Hautes Terres avec des aventures nature en chemin.",
        activities: [
          "Rafting en eaux vives à Kitulgala",
          "Visite des cascades de Ravana",
          "Randonnée au Little Adam's Peak",
          "Pont aux Neuf Arches à Demodara",
        ],
        overnight: "Nuit au Sunray Homestay - Ella",
      },
      {
        days: [3],
        title: "Jour 03 – D'Ella vers Kandy via Nuwara Eliya",
        image: "/tours/kandy.jpg",
        description:
          "Voyage dans le célèbre Train Bleu et exploration de la ville du thé, Nuwara Eliya.",
        activities: [
          "Voyage en train d'Ella à Nanu Oya",
          "Parc Victoria",
          "Tour de la ville de Nuwara Eliya",
          "Temps libre au bord du Lac Gregory",
          "Visite de la plantation de thé Pedro",
          "Temple Seetha Amman",
        ],
        overnight: "Nuit à l'hôtel Lu Chalet - Nuwara Eliya",
      },
      {
        days: [4],
        title: "Jour 04 – De Nuwara Eliya vers Kandy",
        image: "/tours/kandy.jpg",
        description: "Merveilles naturelles dans les montagnes et arrivée dans la capitale culturelle.",
        activities: [
          "Parc National de Horton Plains",
          "Cascades de Baker",
          "Ferme Ambewela",
          "Cascades de Ramboda",
          "Usine de thé de Glenloch",
          "Promenade autour du lac de Kandy",
          "Spectacle de danse culturelle",
          "Temple de la Dent Sacrée à Kandy",
        ],
        overnight: "Nuit au Jack Tree Lodge - Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – De Kandy vers Habarana",
        image: "/tours/habarana.jpg",
        description: "Immersion dans la culture du Sri Lanka et safari animalier.",
        activities: [
          "Temple hindou de Matale",
          "Temple d'Or de Dambulla",
          "Marché de légumes de Dambulla",
          "Visite d'un village avec cours de cuisine et déjeuner traditionnel",
          "Safari à l'Eco Park ou coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à l'hôtel Go Go Green - Habarana (avec piscine)",
      },
      {
        days: [6],
        title: "Jour 06 – De Habarana vers Pasikuda",
        image: "/tours/pasikuda.jpg",
        description:
          "Visite d'anciens sites historiques et transfert vers la paisible côte est.",
        activities: [
          "Ascension de la Forteresse du Rocher de Sigiriya",
          "Ancien Royaume de Polonnaruwa",
          "Détente sur la plage de Pasikuda (Kalkudah)",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [7],
        title: "Jour 07 – Exploration de Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Journée de détente face à la mer et découverte de l'histoire coloniale.",
        activities: [
          "Sports nautiques et temps passé à la plage",
          "Fort historique de Batticaloa",
          "Pont de Kallady",
          "Phare de Batticaloa",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [8],
        title: "Jour 08 – De Pasikuda vers Trincomalee",
        image: "/tours/trincomalee.jpg",
        description:
          "Voyage vers Trincomalee, qui abrite l'un des plus beaux ports naturels de l'est.",
        activities: [
          "Marble Beach",
          "Cimetière de guerre britannique",
          "Plage d'Uppuveli",
          "Exploration du Fort Frederick",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [9],
        title: "Jour 09 – Trincomalee et Pigeon Island",
        image: "/tours/trincomalee.jpg",
        description: "Découverte de la riche vie marine et des temples historiques sacrés.",
        activities: [
          "Plongée avec tuba dans le Parc National de Pigeon Island (Île aux Pigeons)",
          "Détente sur la plage de Nilaveli",
          "Temple historique Koneswaram",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [10],
        title: "Jour 10 – Départ",
        image: "/tours/colombo.jpg",
        description: "Fin du voyage et transfert à l'aéroport pour votre vol de retour.",
        activities: [
          "Tour optionnel de la ville de Colombo",
        ],
        drop: "Transfert à l'Aéroport International ou à votre hôtel à Colombo/Negombo",
      },
    ],
  },

  /* =====================================================
     12 DAYS TOURS (Circuits de 12 jours)
  ===================================================== */
  {
    id: "12-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "Circuit Sud 12 jours",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 465.0,
    image: "/tours/12-days-down-south-tour.jpg",

    overview:
      "Ce voyage de 12 jours est notre itinéraire le plus complet pour découvrir le sud et le cœur de l'île. Il couvre Negombo, Anuradhapura, Habarana, Polonnaruwa, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Hikkaduwa et Colombo. Vous ferez l'expérience d'un mélange fascinant de culture millénaire, de paysages montagneux brumeux, d'une faune sauvage passionnante et de plages tropicales de rêve.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour réserver cet itinéraire",
      vipNote:
        "1 860 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide professionnel)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Carburant",
      "Frais de stationnement",
      "Carte SIM locale (avec données gratuites)",
      "Bouteilles d'eau minérale offertes",
    ],

    excluded: [
      "Votre hébergement et vos repas personnels",
      "Frais d'entrée aux sites et activités",
      "Nourriture et boissons supplémentaires",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        activities: [
          "Prise en charge à l'aéroport",
          "Exploration de la ville côtière de Negombo",
          "Excursion en bateau sur la lagune de Negombo",
        ],
        overnight: "Nuit à Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – Transfert vers Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        activities: [
          "Marché aux poissons de Negombo",
          "Temple Sri Munneswaram Kovil",
          "Visite de l'ancien Royaume d'Anuradhapura",
        ],
        overnight: "Nuit à Anuradhapura",
      },
      {
        days: [3],
        title: "Jour 03 – Vers le cœur d'Habarana",
        image: "/tours/habarana.jpg",
        options: [
          {
            title: "Option 01",
            activities: [
              "Ancien Royaume de Polonnaruwa",
              "Tour de village avec cours de cuisine traditionnelle",
              "Coucher de soleil au rocher de Pidurangala",
            ],
          },
          {
            title: "Option 02",
            activities: ["Safari à Minneriya / Kaudulla / Eco Park"],
          },
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [4],
        title: "Jour 04 – Transfert vers Kandy",
        image: "/tours/kandy.jpg",
        activities: [
          "Forteresse du Rocher de Sigiriya",
          "Temple de la Grotte de Dambulla",
          "Visite d'un jardin d'épices",
          "Spectacle de danse culturelle à Kandy",
          "Temple de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – Vers la fraîcheur de Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Jardin Botanique Royal de Peradeniya",
          "Cascade de Ramboda",
          "Visite d'une usine et d'une plantation de thé",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [6],
        title: "Jour 06 – Exploration de Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "Jardin Botanique de Hakgala",
          "Lac Gregory",
          "Promenade à pied dans la ville coloniale",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [7],
        title: "Jour 07 – Voyage en train vers Ella",
        image: "/tours/ella.jpg",
        activities: [
          "Parc National de Horton Plains",
          "Voyage dans le célèbre train de montagne vers Ella",
          "Exploration du village d'Ella",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [8],
        title: "Jour 08 – Aventure à Yala ou Udawalawa",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "Option 01 – Safari à Yala",
            activities: [
              "Pont aux Neuf Arches",
              "Cascade de Ravana",
              "Safari dans le Parc National de Yala",
            ],
            overnight: "Nuit à Yala",
          },
          {
            title: "Option 02 – Safari à Udawalawa",
            activities: [
              "Randonnée au Little Adam's Peak",
              "Safari dans le Parc National d'Udawalawa",
            ],
            overnight: "Nuit à Udawalawa",
          },
        ],
      },
      {
        days: [9],
        title: "Jour 09 – Vers la côte de Mirissa",
        image: "/tours/mirissa.jpg",
        activities: [
          "Détente sur la plage de Mirissa",
          "Visite de Coconut Tree Hill (la colline aux cocotiers)",
        ],
        overnight: "Nuit à Mirissa",
      },
      {
        days: [10],
        title: "Jour 10 – Transfert vers Hikkaduwa via Galle",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "Observation des baleines (le matin)",
          "Exploration du Fort Hollandais historique de Galle",
        ],
        overnight: "Nuit à Hikkaduwa",
      },
      {
        days: [11],
        title: "Jour 11 – Retour vers Colombo",
        image: "/tours/colombo.jpg",
        activities: [
          "Safari aquatique sur la rivière Madu",
          "Tour complet de la ville de Colombo",
        ],
        overnight: "Nuit à Colombo",
      },
      {
        days: [12],
        title: "Jour 12 – Départ Final",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "Temple Gangaramaya",
          "Place de l'Indépendance",
        ],
        drop: "Transfert à l'aéroport international ou à votre hôtel",
      },
    ],
  },

  {
    id: "12-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "Circuit Sud 12 jours avec Hôtels",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 680.0,
    image: "/tours/12-days-down-south-tour-with-hotels.jpg",

    overview:
      "Profitez de l'expérience ultime au Sri Lanka avec ce circuit de 12 jours. Cet itinéraire complet couvre Anuradhapura, Habarana, Kandy, Nuwara Eliya, Ella, Yala et les magnifiques plages du sud. Voyagez dans un confort maximal avec des hébergements dans des hôtels sélectionnés incluant le petit-déjeuner, un véhicule privé et un chauffeur-guide professionnel.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture de luxe",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour cet itinéraire",
      vipNote:
        "1 360 $ pour 2 personnes - Véhicule VIP (avec chauffeur et guide) et hôtels étoilés avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement en hôtel avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
      "Billets de train (de Nanu Oya à Ella)",
    ],

    excluded: [
      "Frais d'entrée aux sites et activités",
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Pourboires",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport et exploration de la charmante ville côtière de Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais",
          "Promenade en bateau sur la lagune",
        ],
        overnight: "Nuit au New Queen's Palace - Negombo (avec piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – Transfert vers Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description:
          "Visite de la première ancienne capitale du Sri Lanka et de ses sites sacrés.",
        activities: [
          "Temple Sri Munneswaram Kovil",
          "Visite complète de l'ancien Royaume d'Anuradhapura",
        ],
        overnight: "Nuit dans un hôtel sélectionné à Anuradhapura",
      },
      {
        days: [3],
        title: "Jour 03 – D'Anuradhapura vers Habarana",
        image: "/tours/habarana.jpg",
        description:
          "Aventure dans le Triangle Culturel avec des expériences rurales et un safari.",
        activities: [
          "Ancien Royaume de Polonnaruwa",
          "Tour de village avec cours de cuisine et déjeuner traditionnel",
          "Safari au Parc National de Minneriya OU à l'Eco Park",
        ],
        overnight: "Nuit au Go Go Green – Habarana (avec piscine)",
      },
      {
        days: [4],
        title: "Jour 04 – Transfert vers Kandy",
        image: "/tours/kandy.jpg",
        description:
          "Ascension du rocher mythique de Sigiriya et voyage vers la capitale culturelle.",
        activities: [
          "Ascension de la Forteresse du Rocher de Sigiriya (tôt le matin)",
          "Temple de la Grotte de Dambulla",
          "Spectacle de danse culturelle à Kandy",
          "Visite du Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit au Jack Tree Lodge – Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – Nuwara Eliya ('Petite Angleterre')",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Voyage pittoresque à travers les montagnes, les plantations de thé et les cascades.",
        activities: [
          "Jardin Botanique Royal de Peradeniya",
          "Cascades de Ramboda",
          "Visite d'une usine de thé avec dégustation",
        ],
        overnight: "Nuit au Lu Chalet – Nuwara Eliya",
      },
      {
        days: [6],
        title: "Jour 06 – Exploration de Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description:
          "Une journée pour se détendre et profiter de la fraîcheur du climat et de la nature.",
        activities: [
          "Jardin Botanique de Hakgala",
          "Temps libre au Lac Gregory",
          "Promenade dans le centre historique de la ville",
        ],
        overnight: "Nuit au Lu Chalet – Nuwara Eliya",
      },
      {
        days: [7],
        title: "Jour 07 – Voyage en train panoramique vers Ella",
        image: "/tours/ella.jpg",
        description: "Vivez l'un des plus beaux voyages en train au monde.",
        activities: [
          "Parc National de Horton Plains (matin)",
          "Voyage pittoresque en train (Train Bleu) de Nanu Oya à Ella",
          "Exploration nocturne de la ville d'Ella",
        ],
        overnight: "Nuit au Ella River Front – Ella",
      },
      {
        days: [8],
        title: "Jour 08 – Safari faunique (Yala ou Udawalawe)",
        image: "/tours/yala.jpg",
        description:
          "Visite des sites emblématiques d'Ella et transfert vers la jungle profonde.",
        activities: [
          "Pont aux Neuf Arches",
          "Cascade de Ravana",
          "Safari au Parc National de Yala (ou Udawalawe selon votre choix)",
        ],
        overnight: "Nuit à Boutique Villa – Yala ou Udawalawe",
      },
      {
        days: [9],
        title: "Jour 09 – Détente à Mirissa",
        image: "/tours/mirissa.jpg",
        description: "Transfert vers les meilleures plages de la côte sud pour vous détendre.",
        activities: [
          "Relaxation sur la plage dorée de Mirissa",
          "Arrêt photo à Coconut Tree Hill",
          "Profiter du spectaculaire coucher de soleil",
        ],
        overnight: "Nuit au N34 – Mirissa",
      },
      {
        days: [10],
        title: "Jour 10 – Observation des baleines et Fort de Galle",
        image: "/tours/hikkaduwa.jpg",
        description: "Aventure en mer et riche histoire coloniale à Galle.",
        activities: [
          "Observation des baleines et des dauphins (matin)",
          "Visite historique du Fort Hollandais de Galle",
          "Transfert vers la plage d'Hikkaduwa",
        ],
        overnight: "Nuit au Finlanka Hotel – Hikkaduwa",
      },
      {
        days: [11],
        title: "Jour 11 – Retour à Colombo",
        image: "/tours/colombo.jpg",
        description:
          "Safari fluvial relaxant et visite de la vibrante capitale commerciale.",
        activities: [
          "Safari en bateau sur la rivière Madu (Bentota)",
          "City tour et shopping dans la ville de Colombo",
        ],
        overnight: "Nuit dans un hôtel sélectionné à Colombo",
      },
      {
        days: [12],
        title: "Jour 12 – Départ Final",
        image: "/tours/colombo-airport.jpg",
        description: "Fin de l'expérience et transfert à l'aéroport pour votre vol retour.",
        activities: [
          "Temple Gangaramaya",
          "Place de l'Indépendance",
        ],
        drop: "Transfert à l'Aéroport International de Bandaranaike",
      },
    ],
  },
  {
    id: "12-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "Circuit de 12 jours sur la Côte Est",
    duration: 12,
    maxPeople: 10,
    minAge: 16,
    price: 760.0,
    image: "/tours/12-days-east-coast-tour.jpg",

    overview:
      "Découvrez la majestueuse côte est du Sri Lanka, avec ses sites historiques, les Hautes Terres et les meilleures destinations pour la faune sauvage pendant 12 jours. Cet itinéraire est conçu pour les voyageurs en quête de liberté et d'aventure, des plages immaculées de Trincomalee à la ville mystique d'Anuradhapura.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour ce circuit",
      vipNote: "1 520 $ pour 2 personnes - Véhicule de luxe VIP (inclut chauffeur et guide)",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
    ],

    excluded: [
      "Votre hébergement et vos repas personnels",
      "Frais d'entrée aux sites et activités",
      "Billets de train",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Negombo",
        image: "/tours/negombo.jpg",
        description: "Prise en charge à l'aéroport et exploration de Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais",
          "Promenade sur la lagune de Negombo",
        ],
        overnight: "Nuit à Negombo",
      },
      {
        days: [2],
        title: "Jour 02 – Ella",
        image: "/tours/ella.jpg",
        description: "Transfert vers les montagnes avec des arrêts aventure.",
        activities: [
          "Rafting à Kitulgala",
          "Cascades de Ravana",
          "Little Adam's Peak",
          "Pont aux Neuf Arches",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [3],
        title: "Jour 03 – Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description: "Voyage au cœur de la production de thé.",
        activities: [
          "Voyage en train panoramique",
          "Parc Victoria",
          "Visite de la ville",
          "Lac Gregory",
          "Plantation de thé Pedro",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [4],
        title: "Jour 04 – Kandy",
        image: "/tours/kandy.jpg",
        description: "Nature et spiritualité dans la capitale des montagnes.",
        activities: [
          "Parc National de Horton Plains",
          "Cascades de Ramboda",
          "Usine de thé de Glenloch",
          "Temple de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – Habarana",
        image: "/tours/habarana.jpg",
        description: "En route vers le Triangle Culturel.",
        activities: [
          "Temple de la Grotte de Dambulla",
          "Tour de village avec cours de cuisine",
          "Safari à l'Eco Park ou coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [6],
        title: "Jour 06 – Pasikuda",
        image: "/tours/pasikuda.jpg",
        description: "Histoire ancienne et plages de sable blanc.",
        activities: [
          "Forteresse de Sigiriya",
          "Ancien royaume de Polonnaruwa",
          "Plage de Pasikuda",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [7],
        title: "Jour 07 – Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Exploration de la lagune et du fort de Batticaloa.",
        activities: [
          "Fort de Batticaloa",
          "Pont de Kallady",
          "Phare de Batticaloa",
          "Sports nautiques",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [8],
        title: "Jour 08 – Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Voyage vers le plus grand port naturel du Sri Lanka.",
        activities: [
          "Marble Beach",
          "Cimetière de guerre",
          "Fort Frederick",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [9],
        title: "Jour 09 – Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description: "Vers la plus ancienne cité sacrée.",
        activities: [
          "Plongée avec tuba à Pigeon Island (Île aux Pigeons)",
          "Plage de Nilaveli",
          "Temple Koneswaram",
          "Mihintale",
        ],
        overnight: "Nuit à Anuradhapura",
      },
      {
        days: [10],
        title: "Jour 10 – Kalpitiya",
        image: "/tours/kalpitiya.jpg",
        description: "Histoire royale et nature sauvage.",
        activities: [
          "Ancien royaume d'Anuradhapura",
          "Safari dans le Parc National de Wilpattu",
        ],
        overnight: "Nuit à Kalpitiya",
      },
      {
        days: [11],
        title: "Jour 11 – Kalpitiya",
        image: "/tours/kalpitiya.jpg",
        description: "Journée en mer et observation de la faune marine.",
        activities: [
          "Observation des dauphins",
          "Kitesurf",
          "Promenade sur la lagune",
          "Ancienne église hollandaise",
        ],
        overnight: "Nuit à Kalpitiya",
      },
      {
        days: [12],
        title: "Jour 12 – Départ",
        image: "/tours/colombo-airport.jpg",
        description: "Retour via Colombo pour le transfert final.",
        activities: [
          "Visite de la ville de Colombo",
          "Temple Gangaramaya",
        ],
        drop: "Transfert à l'Aéroport",
      },
    ],
  },
  {
    id: "12-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "Grand Circuit Côte Est de 12 jours avec Hôtels",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 970.0,
    image: "/tours/12-days-east-coast-tour-with-hotels.jpg",

    overview:
      "Explorez le meilleur du Sri Lanka lors de ce grand circuit de 12 jours. Des plages immaculées de la côte est aux montagnes brumeuses et au Triangle Culturel, profitez d'un confort optimal avec des hôtels sélectionnés incluant le petit-déjeuner, un véhicule privé et un chauffeur-guide professionnel.",

    vehicleInfo: {
      car: "1 - 3 Personnes ← Voiture privée",
      van: "4 - 10 Personnes ← Van KDH",
      minimum: "Un minimum de 2 personnes est requis pour cet itinéraire",
      vipNote:
        "1 940 $ pour 2 personnes - Véhicule de luxe VIP (avec chauffeur et guide) et hôtels étoilés avec petit-déjeuner",
    },

    bookingOptions: [
      "Formulaire de réservation sur le site web",
      "E-mail à info@srilankatoursdriver.com",
      "WhatsApp au (+94) 769 300 334",
    ],

    included: [
      "Véhicule privé entièrement climatisé",
      "Chauffeur professionnel anglophone",
      "Votre hébergement dans des hôtels avec petit-déjeuner",
      "Hébergement et repas du chauffeur",
      "Normes de santé et de sécurité certifiées",
      "Carburant et frais de stationnement",
      "Service d'assistance 24h/24",
      "Carte SIM locale (données gratuites)",
      "Bouteilles d'eau minérale offertes",
      "Péages d'autoroute",
      "Billets de train (d'Ella à Nanu Oya)",
    ],

    excluded: [
      "Frais d'entrée aux sites et activités",
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Pourboires",
    ],

    itinerary: [
      {
        days: [1],
        title: "Jour 01 – Arrivée à Negombo",
        image: "/tours/negombo.jpg",
        description:
          "Prise en charge à l'aéroport et exploration de la ville côtière de Negombo.",
        activities: [
          "Marché aux poissons de Negombo",
          "Ancien Fort Hollandais",
          "Promenade en bateau sur la lagune de Negombo",
        ],
        overnight: "Nuit à Negombo (avec piscine)",
      },
      {
        days: [2],
        title: "Jour 02 – De Negombo vers Ella",
        image: "/tours/ella.jpg",
        description: "Voyage vers les Hautes Terres avec des aventures en nature en chemin.",
        activities: [
          "Rafting en eaux vives à Kitulgala",
          "Visite des cascades de Ravana",
          "Randonnée au Little Adam's Peak",
          "Pont aux Neuf Arches",
        ],
        overnight: "Nuit à Ella",
      },
      {
        days: [3],
        title: "Jour 03 – D'Ella vers Nuwara Eliya",
        image: "/tours/nuwaraeliya.jpg",
        description: "Profitez du célèbre voyage en train vers la 'Petite Angleterre'.",
        activities: [
          "Voyage en train pittoresque (Train Bleu) d'Ella à Nanu Oya",
          "Parc Victoria",
          "Visite à pied de la ville de Nuwara Eliya",
          "Lac Gregory",
          "Visite de la plantation de thé Pedro",
        ],
        overnight: "Nuit à Nuwara Eliya",
      },
      {
        days: [4],
        title: "Jour 04 – De Nuwara Eliya vers Kandy",
        image: "/tours/kandy.jpg",
        description: "Merveilles naturelles le matin et culture dans la capitale royale.",
        activities: [
          "Parc National de Horton Plains (Randonnée au lever du soleil)",
          "Cascades de Ramboda",
          "Usine de thé de Glenloch",
          "Promenade autour du lac de Kandy",
          "Spectacle de danse culturelle",
          "Temple de la Relique de la Dent Sacrée",
        ],
        overnight: "Nuit à Kandy",
      },
      {
        days: [5],
        title: "Jour 05 – De Kandy vers Habarana",
        image: "/tours/habarana.jpg",
        description: "Voyage au cœur du Triangle Culturel du Sri Lanka.",
        activities: [
          "Temple hindou de Matale",
          "Temple de la Grotte de Dambulla",
          "Marché de légumes de Dambulla",
          "Visite d'un village avec cours de cuisine et déjeuner traditionnel",
          "Safari à l'Eco Park ou coucher de soleil à Pidurangala",
        ],
        overnight: "Nuit à Habarana",
      },
      {
        days: [6],
        title: "Jour 06 – De Habarana vers Pasikuda",
        image: "/tours/pasikuda.jpg",
        description: "Patrimoine de l'humanité et la paisible côte est.",
        activities: [
          "Ascension de la Forteresse du Rocher de Sigiriya",
          "Ancien royaume de Polonnaruwa",
          "Détente sur la plage de Pasikuda",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [7],
        title: "Jour 07 – Exploration de Batticaloa",
        image: "/tours/batticaloa.jpg",
        description: "Journée de détente et découverte de l'histoire coloniale.",
        activities: [
          "Sports nautiques et temps passé à la plage",
          "Fort hollandais de Batticaloa",
          "Pont de Kallady et Phare de Batticaloa",
        ],
        overnight: "Nuit à Pasikuda",
      },
      {
        days: [8],
        title: "Jour 08 – De Pasikuda vers Trincomalee",
        image: "/tours/trincomalee.jpg",
        description: "Voyage vers le plus beau port naturel de l'est.",
        activities: [
          "Marble Beach",
          "Cimetière de guerre britannique",
          "Plage d'Uppuveli",
          "Fort Frederick",
        ],
        overnight: "Nuit à Trincomalee",
      },
      {
        days: [9],
        title: "Jour 09 – De Trincomalee vers Anuradhapura",
        image: "/tours/anuradhapura.jpg",
        description: "Aventures sous-marines et le berceau du bouddhisme.",
        activities: [
          "Plongée avec tuba dans le Parc National de Pigeon Island",
          "Plage de Nilaveli",
          "Temple Koneswaram",
          "Mihintale (Le berceau du Bouddhisme)",
        ],
        overnight: "Nuit à Anuradhapura",
      },
      {
        days: [10],
        title: "Jour 10 – D'Anuradhapura vers Kalpitiya",
        image: "/tours/kalpitiya.jpg",
        description: "Monuments anciens et safari dans le plus grand parc.",
        activities: [
          "Visite de l'ancien Royaume d'Anuradhapura",
          "Safari dans le Parc National de Wilpattu",
        ],
        overnight: "Nuit à Kalpitiya",
      },
      {
        days: [11],
        title: "Jour 11 – Kalpitiya et les Dauphins",
        image: "/tours/kalpitiya.jpg",
        description: "Journée dédiée à l'océan et aux lagunes de Kalpitiya.",
        activities: [
          "Observation des dauphins (saisonnier)",
          "Kitesurf ou détente sur la plage",
          "Promenade en bateau sur la lagune",
          "Ancienne église hollandaise",
        ],
        overnight: "Nuit à Kalpitiya",
      },
      {
        days: [12],
        title: "Jour 12 – Départ",
        image: "/tours/colombo.jpg",
        description: "Fin du voyage avec une visite de la capitale.",
        activities: [
          "Visite de la ville de Colombo",
          "Temple Gangaramaya",
        ],
        drop: "Transfert à l'Aéroport International ou à votre hôtel à Colombo/Negombo",
      },
    ],
  },
];