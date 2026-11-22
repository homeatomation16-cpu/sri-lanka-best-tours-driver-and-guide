// src/data/destinations.ts
// Full destinations with id, title, location, category, image, tags, etc.

export const DESTINATIONS = [
  {
    id: "old-parliament-building",
    title: "Old Parliament Building",
    location: "Colombo",
    category: "Heritage",
    image: "/destinations/old-parliament-building.jpeg",
    tags: ["Colonial", "History", "Architecture"],
    bestTime: "November – April",
    openHours: "Mon–Fri 8:30am–4:30pm",
    description: `The Old Parliament Building, completed in 1930, is a stunning Neo-Baroque structure that served as Sri Lanka's legislature for 53 years. Built on the idea of Sir Henry McCallum and designed by A. Woodson, it now houses the Presidential Secretariat and stands as a proud reminder of Sri Lanka's colonial past and journey to independence in 1947.`
  },
  {
    id: "jami-ul-alfar-mosque",
    title: "Jami Ul-Alfar Mosque",
    location: "Colombo",
    category: "Religious",
    image: "/destinations/jami-ul-alfar-mosque.jpeg",
    tags: ["Mosque", "Architecture", "Culture"],
    bestTime: "Year-round",
    description: `Jami Ul-Alfar Mosque combines Indo-Islamic, Persian, Gothic revival, and Neoclassical architecture. Famed for its striking red and white candy-striped brick facade, the Red Mosque is a long-standing landmark on Second Cross Street in Pettah.`
  },
  {
    id: "colombo-city",
    title: "Colombo City",
    location: "Colombo",
    category: "City",
    image: "/destinations/colombo-city.jpeg",
    tags: ["Shopping", "Nightlife", "Culture", "Food"],
    bestTime: "November – April",
    description: `Colombo is Sri Lanka's commercial capital blending colonial heritage, modern skyscrapers, beaches, shopping malls, and vibrant nightlife. Landmarks include the Lotus Tower, Galle Face Green, Pettah Market, and Beira Lake.`
  },
  {
    id: "gangaramaya-temple",
    title: "Gangaramaya Temple",
    location: "Colombo",
    category: "Religious",
    image: "/destinations/gangaramaya-temple.jpeg",
    tags: ["Buddhist", "Temple", "Culture"],
    bestTime: "Year-round",
    openHours: "6:00am – 10:00pm",
    description: `Gangaramaya is one of the oldest Buddhist temples in Colombo, started by Hikkaduwe Sri Sumangala Nayaka Thera in the late 19th century. Today it serves as a temple, cultural and educational center.`
  },
  {
    id: "galle-face-green",
    title: "Galle Face Green",
    location: "Colombo",
    category: "Nature",
    image: "/destinations/galle-face-green.jpeg",
    tags: ["Park", "Ocean", "Sunset"],
    bestTime: "November – April",
    description: `Galle Face Green is a popular ocean-side park known for sunset views, street food stalls, and leisure activities. Originally laid out in 1859 by Governor Sir Henry George Ward.`
  },
  {
    id: "kelaniya-raja-maha-viharaya",
    title: "Kelaniya Raja Maha Viharaya",
    location: "Kelaniya",
    category: "Religious",
    image: "/destinations/kelaniya-raja-maha-viharaya.jpeg",
    tags: ["Buddhist", "Sacred", "Heritage"],
    bestTime: "Year-round",
    openHours: "5:30am – 9:00pm",
    description: `Kelaniya Raja Maha Viharaya is a historic Buddhist temple believed to have been visited by Lord Buddha. Renovated by ancient kings, it remains one of the most sacred religious sites in Sri Lanka.`
  },
  {
    id: "yala-national-park",
    title: "Yala National Park",
    location: "Yala",
    category: "Wildlife",
    image: "/destinations/yala-national-park.jpeg",
    tags: ["Safari", "Leopard", "Wildlife", "Nature"],
    bestTime: "February – July",
    entryFee: "USD $15–$30 (Foreign visitors)",
    description: `Established in 1938, Yala National Park is famous for one of the highest concentrations of leopards in the world. Home to elephants, crocodiles, bears, deer, peacocks, and many migratory birds.`
  },
  {
    id: "st-marys-church-negombo",
    title: "St Marys Church Negombo",
    location: "Negombo",
    category: "Religious",
    image: "/destinations/st-marys-church-negombo.jpeg",
    tags: ["Church", "Colonial", "Architecture"],
    bestTime: "November – April",
    description: `St. Mary's Church is one of the largest cathedrals in Sri Lanka, known for beautiful ceiling paintings, stained glass windows, and colonial architectural influence.`
  },

  /* Imported from the Sri Lanka Tours Driver site (town-level destinations). */
  {
    "id": "sigiriya",
    "title": "Sigiriya",
    "location": "Central Province",
    "category": "Heritage",
    "image": "/tours/sigiriya.jpg",
    "tags": [
      "Lion Rock summit ruins",
      "Sigiriya frescoes",
      "Water gardens",
      "Pidurangala Rock sunrise"
    ],
    "bestTime": "January to April (dry season); visit early morning",
    "howToGetThere": "About 4 hours by road from Colombo, or 2.5 hours from Kandy.",
    "description": "Sigiriya is one of Sri Lanka's most iconic sights: a royal citadel built by King Kashyapa on top of a sheer granite rock. Climb past the famous frescoes, the Mirror Wall and the giant lion paws to reach the summit ruins and sweeping views across the Cultural Triangle. Early-morning or late-afternoon visits avoid the midday heat.",
    "experiences": [
      {
        "title": "Sigiriya Rock Fortress",
        "description": "Stairways, frescoes and the famous lion's paws lead to palace ruins on the summit.",
        "image": "/destinations/experiences/destination-sigiriya.webp"
      },
      {
        "title": "Pidurangala Rock",
        "description": "A neighbouring rock with a temple at its base and a superb view of Sigiriya from the top.",
        "image": "/destinations/experiences/pidurangala.webp"
      },
      {
        "title": "Sigiriya Museum",
        "description": "A small museum that brings the site's history and art to life before your climb.",
        "image": "/destinations/experiences/sigiriya-museum.webp"
      }
    ]
  },
  {
    "id": "ella",
    "title": "Ella",
    "location": "Uva Province",
    "category": "HillCountry",
    "image": "/tours/ella.jpg",
    "tags": [
      "Nine Arches Bridge",
      "Little Adam's Peak",
      "Ella Rock",
      "Ravana Falls",
      "Kandy–Ella train"
    ],
    "bestTime": "January to March and July to September",
    "howToGetThere": "About 6 hours by road from Colombo, or roughly 3 hours from Nuwara Eliya. Many guests take the scenic train and meet their driver at Ella station.",
    "description": "Ella sits among misty mountains and tea plantations and is the end point of one of the world's most scenic train rides. Hike Little Adam's Peak or Ella Rock, watch the train cross the Nine Arches Bridge and enjoy the village's cafés.",
    "experiences": [
      {
        "title": "Nine Arch Bridge",
        "description": "A stone viaduct curving through the jungle, especially photogenic when a train crosses.",
        "image": "/destinations/experiences/destination-ella-nine-arch-bridge.webp"
      },
      {
        "title": "Little Adam's Peak",
        "description": "An easy hike through tea bushes to a ridge with sweeping views over the valley.",
        "image": "/destinations/experiences/little-adams-peak.webp"
      },
      {
        "title": "Ravana Falls",
        "description": "A tiered waterfall right beside the road below Ella, at its fullest after rain.",
        "image": "/destinations/experiences/ravana-falls.webp"
      },
      {
        "title": "Ella Rock",
        "description": "A longer, rewarding trek along rail tracks and forest paths to a high lookout.",
        "image": "/destinations/experiences/ella-rock.webp"
      }
    ]
  },
  {
    "id": "arugam-bay",
    "title": "Arugam Bay",
    "location": "Eastern Province",
    "category": "Beach",
    "image": "/destinations/arugam-bay.webp",
    "tags": [
      "Kumana National Park",
      "Learn Surfing",
      "Kudumbigala Sanctuary"
    ],
    "bestTime": "The surf and dry-weather season runs roughly April to October. From November to March the east coast sees more rain and many places close.",
    "howToGetThere": "Around 7–8 hours by road from Colombo, or about 3 hours from Ella. It pairs well with an east-coast or hill-country route.",
    "description": "A crescent bay of sand and fishing boats, with point breaks that draw surfers from around the world. Behind the coast lie lagoons, rock hermitages and some of the island's quietest national parks.",
    "experiences": [
      {
        "title": "Kumana National Park",
        "description": "A remote park of lagoons and dry forest, well known for wetland birds and occasional elephant and leopard sightings.",
        "image": "/destinations/experiences/kumana.webp"
      },
      {
        "title": "Learn Surfing",
        "description": "Gentle inside breaks and friendly local schools make this a good place for a first lesson on a board.",
        "image": "/destinations/experiences/arugam-surfing.webp"
      },
      {
        "title": "Kudumbigala Sanctuary",
        "description": "An ancient forest hermitage of rock shelters and a hilltop stupa with wide views over the jungle.",
        "image": "/destinations/experiences/kudumbigala.webp"
      }
    ]
  },
  {
    "id": "kandy",
    "title": "Kandy",
    "location": "Central Province",
    "category": "Heritage",
    "image": "/tours/kandy.jpg",
    "tags": [
      "Temple of the Tooth",
      "Peradeniya Botanical Gardens",
      "Kandy Lake",
      "Kandyan dance show"
    ],
    "bestTime": "January to April; the Esala Perahera festival takes place in July/August",
    "howToGetThere": "About 3 hours by road from Colombo or the airport. Kandy is also the start of the scenic hill-country railway.",
    "description": "Set around a lake in the central hills, Kandy was the last royal capital of Sri Lanka. Visit the Temple of the Sacred Tooth Relic, the Royal Botanical Gardens in Peradeniya and enjoy a traditional Kandyan dance performance.",
    "experiences": [
      {
        "title": "Temple of the Tooth",
        "description": "The island's most revered shrine, home to a sacred relic and a daily rhythm of ceremonies.",
        "image": "/destinations/experiences/tooth-temple.webp"
      },
      {
        "title": "Royal Botanical Gardens",
        "description": "Vast gardens with an orchid house, giant bamboo and avenues of royal palms.",
        "image": "/destinations/experiences/peradeniya.webp"
      },
      {
        "title": "Kandy Lake",
        "description": "A tranquil lake in the town centre with a shady path that is lovely for an evening stroll.",
        "image": "/destinations/experiences/kandy-lake.webp"
      }
    ]
  },
  {
    "id": "galle",
    "title": "Galle",
    "location": "Southern Province",
    "category": "Heritage",
    "image": "/tours/galle.jpg",
    "tags": [
      "Galle Fort ramparts",
      "Lighthouse",
      "Dutch Reformed Church",
      "Sunset walk"
    ],
    "bestTime": "November to April",
    "howToGetThere": "About 2 hours by road from Colombo on the Southern Expressway, and close to Unawatuna, Hikkaduwa and Mirissa.",
    "description": "Galle Fort was built by the Portuguese and fortified by the Dutch. Walk the ramparts at sunset, explore the lighthouse, churches and museums, and browse cafés and boutiques in the narrow streets.",
    "experiences": [
      {
        "title": "Galle Fort",
        "description": "A walled old town on a headland, with a layout and buildings that tell stories of the colonial era.",
        "image": "/destinations/experiences/destination-galle.webp"
      },
      {
        "title": "Galle Lighthouse",
        "description": "A white lighthouse on the fort's ramparts, framed by the sea on three sides.",
        "image": "/destinations/experiences/destination-galle.webp"
      },
      {
        "title": "Dutch-era streets",
        "description": "Narrow lanes of verandah houses, little museums and craft shops for a relaxed wander.",
        "image": "/destinations/experiences/galle-streets.webp"
      }
    ]
  },
  {
    "id": "nuwara-eliya",
    "title": "Nuwara Eliya",
    "location": "Central Province",
    "category": "HillCountry",
    "image": "/tours/nuwaraeliya.jpg",
    "tags": [
      "Tea factory visit",
      "Gregory Lake",
      "Horton Plains & World's End",
      "Victoria Park"
    ],
    "bestTime": "February to April",
    "howToGetThere": "About 5 hours by road from Colombo, or 2.5 hours from Kandy. The nearest train station is Nanu Oya, a short drive away.",
    "description": "At around 1,900 m, Nuwara Eliya is the heart of tea country. Visit a working tea factory, stroll around Gregory Lake and explore Horton Plains National Park and World's End.",
    "experiences": [
      {
        "title": "Tea plantations",
        "description": "Visit a tea estate and factory to follow the leaf from the bush to the cup.",
        "image": "/destinations/experiences/destination-nuwara-eliya.webp"
      },
      {
        "title": "Gregory Lake",
        "description": "A lakeside park with walking paths, paddle boats and views of the surrounding hills.",
        "image": "/destinations/experiences/gregory-lake.webp"
      },
      {
        "title": "Hakgala Botanical Garden",
        "description": "Terraced gardens of roses, ferns and tall trees on the slopes of a dramatic rock.",
        "image": "/destinations/experiences/hakgala.webp"
      },
      {
        "title": "Victoria Park",
        "description": "A well-kept town park with flower beds and birdlife in the centre of town.",
        "image": "/destinations/experiences/victoria-park.webp"
      }
    ]
  },
  {
    "id": "yala",
    "title": "Yala",
    "location": "Southern & Uva Provinces",
    "category": "Wildlife",
    "image": "/tours/yala.jpg",
    "tags": [
      "Leopard spotting",
      "Elephants",
      "Sloth bears",
      "Birdlife"
    ],
    "bestTime": "February to July (parts of the park close around September–October)",
    "howToGetThere": "About 5 hours by road from Colombo, or 2.5 hours from Ella. Most guests stay in Tissamaharama or near the park.",
    "description": "Yala National Park has one of the highest leopard densities in the world. Jeep safaris also reveal elephants, sloth bears, crocodiles, water buffalo and many bird species.",
    "experiences": [
      {
        "title": "Yala National Park",
        "description": "Dry forest, lagoons and beaches in one of the island's most famous national parks.",
        "image": "/destinations/experiences/destination-yala-elephant.webp"
      },
      {
        "title": "Wildlife safari",
        "description": "Early-morning and afternoon jeep drives, when the animals are most active.",
        "image": "/destinations/experiences/yala-safari.webp"
      },
      {
        "title": "Leopard watching",
        "description": "Patient tracking with experienced guides gives you a good chance of seeing a leopard.",
        "image": "/destinations/experiences/yala-leopard.webp"
      }
    ]
  },
  {
    "id": "mirissa",
    "title": "Mirissa",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/tours/mirissa.jpg",
    "tags": [
      "Whale watching",
      "Coconut Tree Hill",
      "Secret Beach",
      "Parrot Rock"
    ],
    "bestTime": "November to April",
    "howToGetThere": "About 2.5–3 hours by road from Colombo on the Southern Expressway, or 45 minutes from Galle.",
    "description": "Mirissa is a laid-back beach destination with a crescent bay, Coconut Tree Hill viewpoint and some of the best blue-whale watching in the world between November and April.",
    "experiences": [
      {
        "title": "Whale watching",
        "description": "Boat trips head out to deep water where whales and dolphins are often seen in season.",
        "image": "/destinations/experiences/whale-watching.webp"
      },
      {
        "title": "Mirissa Beach",
        "description": "A curving beach with soft sand, beach cafés and gentle swimming spots in season.",
        "image": "/destinations/experiences/destination-mirissa.webp"
      },
      {
        "title": "Coconut Tree Hill",
        "description": "A small headland of tall palms with a much-loved view over the ocean.",
        "image": "/destinations/experiences/coconut-tree-hill.webp"
      }
    ]
  },
  {
    "id": "bentota",
    "title": "Bentota",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/destinations/bentota.webp",
    "tags": [
      "Madu River safari",
      "Turtle hatchery",
      "Water sports",
      "Brief Garden & Lunuganga"
    ],
    "bestTime": "November to April",
    "howToGetThere": "About 1.5 hours by road from Colombo on the Southern Expressway, and roughly 2 hours from the airport.",
    "description": "Bentota offers wide sandy beaches and calm waters, river boat safaris through mangroves, turtle hatcheries nearby and plenty of water sports.",
    "experiences": [
      {
        "title": "Bentota Beach",
        "description": "A wide stretch of golden sand that is ideal for long walks and lazy afternoons under the palms.",
        "image": "/destinations/experiences/destination-bentota.webp"
      },
      {
        "title": "Bentota River",
        "description": "Boat safaris wind through mangroves, past cinnamon islands and quiet riverbank villages.",
        "image": "/destinations/experiences/bentota-river.webp"
      },
      {
        "title": "Water sports",
        "description": "Jet skiing, banana boats and windsurfing on the calmer waters where the river meets the sea.",
        "image": "/destinations/experiences/bentota-water-sports.webp"
      },
      {
        "title": "Lunuganga",
        "description": "A celebrated country garden laid out over many decades by a renowned Sri Lankan architect.",
        "image": "/destinations/experiences/lunuganga.webp"
      }
    ]
  },
  {
    "id": "habarana",
    "title": "Habarana",
    "location": "North Central Province",
    "category": "Wildlife",
    "image": "/tours/habarana.jpg",
    "tags": [
      "Minneriya National Park",
      "Kaudulla National Park",
      "Village experiences"
    ],
    "bestTime": "Good most of the year. Elephant gatherings at the nearby parks are usually largest from around July to October.",
    "howToGetThere": "About 4 hours by road from Colombo, and under an hour from Sigiriya, Dambulla and Polonnaruwa.",
    "description": "Habarana is a small junction town surrounded by forest and reservoirs, ideally placed for safaris and the ancient cities. It's a calm place to stay, with village life close by and wildlife parks a short drive away.",
    "experiences": [
      {
        "title": "Minneriya National Park",
        "description": "A park built around an ancient reservoir, where large herds of elephants gather in the dry season.",
        "image": "/destinations/experiences/minneriya.webp"
      },
      {
        "title": "Kaudulla National Park",
        "description": "A neighbouring park often visited when the herds move, with open grasslands and waterbirds.",
        "image": "/destinations/experiences/kaudulla.webp"
      },
      {
        "title": "Village experiences",
        "description": "Spend time with a farming family, cook a traditional meal or take a bullock-cart ride.",
        "image": "/destinations/experiences/habarana-village.webp"
      }
    ]
  },
  {
    "id": "anuradhapura",
    "title": "Anuradhapura",
    "location": "North Central Province",
    "category": "Heritage",
    "image": "/tours/anuradhapura.jpg",
    "tags": [
      "Sri Maha Bodhi",
      "Ruwanwelisaya",
      "Jetavanaramaya",
      "Isurumuniya"
    ],
    "bestTime": "May to September",
    "howToGetThere": "Around 4–5 hours by road from Colombo or the airport, or about 1.5 hours from Sigiriya and Dambulla. Your driver can combine it with Mihintale on the same day.",
    "description": "Anuradhapura was the capital for over a thousand years. Its sacred city includes the Sri Maha Bodhi – grown from a cutting of the tree under which the Buddha attained enlightenment – and vast dagobas such as Ruwanwelisaya.",
    "experiences": [
      {
        "title": "Ruwanwelisaya",
        "description": "A vast, gleaming white stupa ringed by a wall of carved elephants, and one of the most revered shrines on the island."
      },
      {
        "title": "Sri Maha Bodhi",
        "description": "A sacred fig tree honoured by Buddhists for more than two thousand years, with daily offerings of flowers and chanting."
      },
      {
        "title": "Abhayagiri",
        "description": "The extensive grounds of a once-powerful monastery, with a towering brick dagoba, guardstones and moonstones in the forest."
      },
      {
        "title": "Jetavanaramaya",
        "description": "A colossal brick stupa that ranks among the tallest structures built in the ancient world."
      }
    ]
  },
  {
    "id": "hatton",
    "title": "Hatton",
    "location": "Central Province",
    "category": "HillCountry",
    "image": "/destinations/hatton.webp",
    "tags": [
      "Tea estates",
      "Castlereagh Reservoir",
      "Adam's Peak access"
    ],
    "bestTime": "The Adam's Peak pilgrimage season usually runs from December to May, which is also the driest period here.",
    "howToGetThere": "About 4 hours by road from Colombo, or 2.5 hours from Kandy. The hill-country train also stops at Hatton.",
    "description": "Rolling estates cover the slopes around Hatton, a working tea town in the central highlands. It's a peaceful stop for bungalow stays and factory visits, and the starting point for the famous pre-dawn climb to Adam's Peak.",
    "experiences": [
      {
        "title": "Tea estates",
        "description": "Walk among the tea bushes and visit a factory to see how the leaf becomes the cup.",
        "image": "/destinations/experiences/destination-hatton.webp"
      },
      {
        "title": "Castlereagh Reservoir",
        "description": "A tranquil lake framed by tea-covered hills, lovely for a slow boat ride or picnic.",
        "image": "/destinations/experiences/destination-hatton.webp"
      },
      {
        "title": "Adam's Peak access",
        "description": "Hatton is the gateway to the night climb up this sacred mountain to watch sunrise from the summit.",
        "image": "/destinations/experiences/adams-peak.webp"
      }
    ]
  },
  {
    "id": "polonnaruwa",
    "title": "Polonnaruwa",
    "location": "North Central Province",
    "category": "Heritage",
    "image": "/tours/polonnaruwa.jpg",
    "tags": [
      "Gal Vihara",
      "Royal Palace",
      "The Quadrangle",
      "Parakrama Samudra"
    ],
    "bestTime": "May to September",
    "howToGetThere": "About 5 hours by road from Colombo, or under an hour from Habarana and Sigiriya.",
    "description": "Polonnaruwa's well-preserved ruins are easy to explore by bicycle or with your driver. Highlights include the Royal Palace, the Quadrangle and the Gal Vihara Buddha statues carved from granite.",
    "experiences": [
      {
        "title": "Gal Vihara",
        "description": "Exquisite Buddha figures carved from a single granite face, including a serene reclining image.",
        "image": "/destinations/experiences/destination-polonnaruwa.webp"
      },
      {
        "title": "Royal Palace",
        "description": "The remains of a once multi-storey palace and its council chamber.",
        "image": "/destinations/experiences/polonnaruwa-palace.webp"
      },
      {
        "title": "Polonnaruwa Ancient City",
        "description": "A large archaeological park of temples, stupas and moonstones in shady woodland.",
        "image": "/destinations/experiences/polonnaruwa-vatadage.webp"
      }
    ]
  },
  {
    "id": "hikkaduwa",
    "title": "Hikkaduwa",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/tours/hikkaduwa.jpg",
    "tags": [
      "Hikkaduwa Beach",
      "Coral reefs",
      "Snorkelling"
    ],
    "bestTime": "November to April brings calm seas and clear water for swimming and snorkelling.",
    "howToGetThere": "About 2 hours by road from Colombo, and around 30 minutes north of Galle.",
    "description": "Hikkaduwa is a lively beach town with shallow reefs close to shore and a relaxed café scene. It's a good spot to snorkel, watch turtles in the shallows or simply enjoy the sunset.",
    "experiences": [
      {
        "title": "Hikkaduwa Beach",
        "description": "A long stretch of sand with gentle surf, beach cafés and colourful sunsets.",
        "image": "/destinations/experiences/destination-hikkaduwa.webp"
      },
      {
        "title": "Coral reefs",
        "description": "A protected coral area near the shore, home to reef fish and visiting sea turtles.",
        "image": "/destinations/experiences/hikkaduwa-reef.webp"
      },
      {
        "title": "Snorkelling",
        "description": "Calm, shallow water in season makes it easy to explore the reef straight from the beach.",
        "image": "/destinations/experiences/hikkaduwa-snorkelling.webp"
      }
    ]
  },
  {
    "id": "dambulla",
    "title": "Dambulla",
    "location": "Central Province",
    "category": "Heritage",
    "image": "/destinations/dambulla.webp",
    "tags": [
      "Cave Temple",
      "Golden Buddha",
      "Minneriya elephant safari nearby"
    ],
    "bestTime": "May to September",
    "howToGetThere": "Around 4 hours by road from Colombo, or about 2.5 hours from Kandy.",
    "description": "The Dambulla cave temple complex is a UNESCO World Heritage Site with over 150 Buddha statues and painted ceilings, and is a convenient base for exploring the Cultural Triangle.",
    "experiences": [
      {
        "title": "Dambulla Cave Temple",
        "description": "A cluster of cave shrines with reclining Buddhas and richly painted rock ceilings.",
        "image": "/destinations/experiences/destination-dambulla.webp"
      },
      {
        "title": "Golden Temple",
        "description": "A modern temple at the foot of the rock, crowned by a giant golden Buddha.",
        "image": "/destinations/experiences/golden-temple.webp"
      },
      {
        "title": "Popham's Arboretum",
        "description": "A quiet dry-zone forest reserve with walking trails, good for birds and butterflies.",
        "image": "/destinations/experiences/pophams-arboretum.webp"
      }
    ]
  },
  {
    "id": "jaffna",
    "title": "Jaffna",
    "location": "Northern Province",
    "category": "Heritage",
    "image": "/tours/jaffna.jpg",
    "tags": [
      "Nallur Temple",
      "Nagadeepa Temple",
      "Delft Island"
    ],
    "bestTime": "Generally warm and dry; roughly February to September is best. The northeast monsoon brings rain from around October to December.",
    "howToGetThere": "About 7–8 hours by road from Colombo, or around 4 hours from Anuradhapura.",
    "description": "On a flat peninsula at the tip of the island, Jaffna has its own flavours, festivals and architecture. Colourful Hindu temples, palmyra palms and little island ferries make it a rewarding trip for curious travellers.",
    "experiences": [
      {
        "title": "Nallur Temple",
        "description": "A grand Hindu temple with a golden gateway tower, famous for its long summer festival.",
        "image": "/destinations/experiences/destination-jaffna.webp"
      },
      {
        "title": "Nagadeepa Temple",
        "description": "An island temple reached by boat, important to both Buddhist and Hindu visitors.",
        "image": "/destinations/experiences/nagadeepa.webp"
      },
      {
        "title": "Delft Island",
        "description": "A remote, windswept island of coral walls, wild ponies and old colonial ruins.",
        "image": "/destinations/experiences/delft-island.webp"
      }
    ]
  },
  {
    "id": "colombo",
    "title": "Colombo",
    "location": "Western Province",
    "category": "City",
    "image": "/tours/colombo.jpg",
    "tags": [
      "Gangaramaya Temple",
      "Pettah Market",
      "Galle Face Green",
      "National Museum"
    ],
    "bestTime": "December to March",
    "howToGetThere": "About 45 minutes from the international airport. Colombo is usually the first or last night of a tour.",
    "description": "Colombo blends colonial buildings, modern towers, busy bazaars and a seaside promenade. Visit Gangaramaya Temple, Pettah Market, Galle Face Green and the National Museum.",
    "experiences": [
      {
        "title": "Independence Square",
        "description": "A grand memorial hall set in leafy gardens, built to mark the country's independence.",
        "image": "/destinations/experiences/independence-square.webp"
      },
      {
        "title": "Colombo National Museum",
        "description": "The island's largest museum, with royal regalia, ancient sculpture and art in a white colonial building.",
        "image": "/destinations/experiences/colombo-museum.webp"
      },
      {
        "title": "Gangaramaya Temple",
        "description": "A lively temple complex that blends several architectural styles and holds an eclectic museum collection.",
        "image": "/destinations/experiences/gangaramaya.webp"
      }
    ]
  },
  {
    "id": "kalpitiya",
    "title": "Kalpitiya",
    "location": "North Western Province",
    "category": "Beach",
    "image": "/tours/kalpitiya.jpg",
    "tags": [
      "Dolphin watching",
      "Kitesurfing",
      "Kalpitiya Lagoon"
    ],
    "bestTime": "Kitesurfing winds are strongest from around May to October; the sea is calmer for dolphin trips from around November to April.",
    "howToGetThere": "About 3.5–4 hours by road from Colombo. It combines well with Wilpattu National Park.",
    "description": "Kalpitiya is a sandy peninsula of fishing villages, lagoons and undeveloped beaches. Depending on the season, you can head out to sea in search of dolphins or catch the strong winds that make it a kitesurfing favourite.",
    "experiences": [
      {
        "title": "Dolphin watching",
        "description": "Early-morning boat trips offshore, where pods of dolphins are often seen in season.",
        "image": "/destinations/experiences/kalpitiya-dolphins.webp"
      },
      {
        "title": "Kitesurfing",
        "description": "Flat lagoon water and reliable winds make this one of the region's best places to learn.",
        "image": "/destinations/experiences/kalpitiya-kitesurfing.webp"
      },
      {
        "title": "Kalpitiya Lagoon",
        "description": "A wide, shallow lagoon fringed by mangroves and fishing villages.",
        "image": "/destinations/experiences/destination-kalpitiya.webp"
      }
    ]
  },
  {
    "id": "kitulgala",
    "title": "Kitulgala",
    "location": "Sabaragamuwa Province",
    "category": "Adventure",
    "image": "/destinations/kitulgala.webp",
    "tags": [
      "Whitewater rafting",
      "Belilena Cave",
      "Makandawa Rainforest"
    ],
    "bestTime": "Rafting runs for much of the year; the river is livelier after the monsoon rains. Ask us for the best timing for your dates.",
    "howToGetThere": "About 2.5 hours by road from Colombo, on the way to Nuwara Eliya and Hatton.",
    "description": "Kitulgala lies on a fast-flowing river framed by lowland rainforest. It's the island's best-known spot for rafting, and the forest around it offers birdwatching, waterfalls and caves for quieter moments.",
    "experiences": [
      {
        "title": "Whitewater rafting",
        "description": "Guided trips through a series of rapids, suitable for first-timers with a sense of adventure.",
        "image": "/destinations/experiences/kitulgala-rafting.webp"
      },
      {
        "title": "Belilena Cave",
        "description": "An archaeological cave site set in the forest near the river.",
        "image": "/destinations/experiences/belilena.webp"
      },
      {
        "title": "Makandawa Rainforest",
        "description": "A lowland forest reserve with trails for birdwatching and nature walks.",
        "image": "/destinations/experiences/makandawa.webp"
      }
    ]
  },
  {
    "id": "negombo",
    "title": "Negombo",
    "location": "Western Province",
    "category": "Beach",
    "image": "/tours/negombo.jpg",
    "tags": [
      "Negombo Lagoon",
      "Fish market",
      "Dutch Canal"
    ],
    "bestTime": "December to March is the driest season. The town works well year-round as an arrival or departure stop.",
    "howToGetThere": "About 20 minutes from the international airport, or 1 hour from Colombo.",
    "description": "Just north of the airport, Negombo is a seaside town of fishing traditions, churches and a wide lagoon. It's an ideal place to rest after a long flight or before heading home.",
    "experiences": [
      {
        "title": "Negombo Lagoon",
        "description": "A broad lagoon of mangroves and fishing canoes, best explored by boat.",
        "image": "/destinations/experiences/destination-negombo.webp"
      },
      {
        "title": "Fish market",
        "description": "A bustling early-morning market where the day's catch is sold and fish are dried on the sand.",
        "image": "/destinations/experiences/negombo-fish-market.webp"
      },
      {
        "title": "Dutch Canal",
        "description": "An old waterway built for trade that still threads through the town and countryside.",
        "image": "/destinations/experiences/negombo-dutch-canal.webp"
      }
    ]
  },
  {
    "id": "passikudah",
    "title": "Passikudah",
    "location": "Eastern Province",
    "category": "Beach",
    "image": "/tours/pasikuda.jpg",
    "tags": [
      "Passikudah Beach",
      "Swimming",
      "Water activities"
    ],
    "bestTime": "The east-coast season runs roughly April to September. From November to February rain is more frequent.",
    "howToGetThere": "About 6 hours by road from Colombo, or roughly 2 hours from Polonnaruwa.",
    "description": "Passikudah's bay is protected by reefs, so the water stays shallow and calm far from shore. It's a relaxed place to swim, rest and unwind after touring the Cultural Triangle.",
    "experiences": [
      {
        "title": "Passikudah Beach",
        "description": "A long, curving beach with soft sand and some of the calmest water on the island.",
        "image": "/destinations/experiences/destination-passikudah.webp"
      },
      {
        "title": "Swimming",
        "description": "Shallow, sheltered water that's ideal for relaxed swimming and families.",
        "image": "/destinations/experiences/passikudah-swimming.webp"
      },
      {
        "title": "Water activities",
        "description": "Snorkelling and boat trips in season, arranged locally.",
        "image": "/destinations/experiences/passikudah-kayaking.webp"
      }
    ]
  },
  {
    "id": "sinharaja",
    "title": "Sinharaja",
    "location": "Sabaragamuwa & Southern Provinces",
    "category": "Nature",
    "image": "/destinations/sinharaja.webp",
    "tags": [
      "Guided rainforest walk",
      "Birdwatching",
      "Waterfall trek"
    ],
    "bestTime": "Generally best from around January to April and August to September, when there is less rain. Leech socks are a good idea all year.",
    "howToGetThere": "About 3.5–4 hours by road from Colombo, depending on the entrance used.",
    "description": "Sinharaja is one of the island's last great stretches of lowland rainforest, rich in endemic birds, plants and wildlife. Walking the trails with a naturalist reveals a hidden world of colour and sound.",
    "experiences": [
      {
        "title": "Guided rainforest walk",
        "description": "A naturalist leads you along forest trails, pointing out rare plants and wildlife.",
        "image": "/destinations/experiences/destination-sinharaja.webp"
      },
      {
        "title": "Birdwatching",
        "description": "Mixed flocks of colourful, endemic birds are one of the forest's highlights.",
        "image": "/destinations/experiences/sinharaja-birds.webp"
      },
      {
        "title": "Waterfall trek",
        "description": "Forest paths lead to cool streams and waterfalls deep in the reserve.",
        "image": "/destinations/experiences/sinharaja-waterfall.webp"
      }
    ]
  },
  {
    "id": "tangalle",
    "title": "Tangalle",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/destinations/tangalle.webp",
    "tags": [
      "Rekawa Turtle Conservation Project",
      "Hummanaya Blowhole",
      "Mulkirigala Temple"
    ],
    "bestTime": "November to April is the best season for calm seas and sunshine.",
    "howToGetThere": "About 3 hours by road from Colombo on the Southern Expressway, or 1 hour from Mirissa.",
    "description": "Tangalle's coastline is a string of sheltered coves and long, uncrowded beaches. It's a peaceful base for turtle watching, rock temples and simple, slow days by the sea.",
    "experiences": [
      {
        "title": "Rekawa Turtle Conservation Project",
        "description": "A community project protecting the beach where sea turtles come ashore to nest.",
        "image": "/destinations/experiences/rekawa-turtles.webp"
      },
      {
        "title": "Hummanaya Blowhole",
        "description": "A natural blowhole that sends sea spray high into the air when the swell is up.",
        "image": "/destinations/experiences/hummanaya.webp"
      },
      {
        "title": "Mulkirigala Temple",
        "description": "A rock temple with cave shrines reached by stairs climbing a steep outcrop.",
        "image": "/destinations/experiences/mulkirigala.webp"
      }
    ]
  },
  {
    "id": "trincomalee",
    "title": "Trincomalee",
    "location": "Eastern Province",
    "category": "Beach",
    "image": "/tours/trincomalee.jpg",
    "tags": [
      "Koneswaram Temple",
      "Fort Frederick",
      "Nilaveli Beach",
      "Pigeon Island"
    ],
    "bestTime": "The best season is roughly April to October, when the east coast is drier and the sea is calm.",
    "howToGetThere": "About 6 hours by road from Colombo, or 2.5 hours from Sigiriya.",
    "description": "Trincomalee has one of the world's finest natural harbours, with white beaches stretching north of the town. Combine clifftop temples and old forts with snorkelling trips to coral reefs offshore.",
    "experiences": [
      {
        "title": "Koneswaram Temple",
        "description": "A Hindu temple perched on a cliff above the ocean, with sweeping sea views.",
        "image": "/destinations/experiences/destination-trincomalee.webp"
      },
      {
        "title": "Fort Frederick",
        "description": "A historic fort on a headland, with resident deer and a path up to the temple.",
        "image": "/destinations/experiences/fort-frederick.webp"
      },
      {
        "title": "Nilaveli Beach",
        "description": "A long, quiet beach of white sand north of town.",
        "image": "/destinations/experiences/nilaveli.webp"
      },
      {
        "title": "Pigeon Island",
        "description": "A small marine national park just offshore, popular for snorkelling over coral.",
        "image": "/destinations/experiences/pigeon-island.webp"
      }
    ]
  },
  {
    "id": "udawalawe",
    "title": "Udawalawe",
    "location": "Sabaragamuwa & Uva Provinces",
    "category": "Wildlife",
    "image": "/tours/udawalawa.jpg",
    "tags": [
      "Udawalawe National Park",
      "Jeep safari",
      "Elephant Transit Home"
    ],
    "bestTime": "Good year-round. Elephant sightings are reliable in every season.",
    "howToGetThere": "About 4 hours by road from Colombo, or 2 hours from Ella or the south coast.",
    "description": "Udawalawe's grasslands and reservoir support large numbers of wild elephants, which are often easy to see. A jeep safari here is a great choice for families and first-time wildlife watchers.",
    "experiences": [
      {
        "title": "Udawalawe National Park",
        "description": "Open grasslands around a large reservoir, home to herds of wild elephants.",
        "image": "/destinations/experiences/destination-udawalawe.webp"
      },
      {
        "title": "Jeep safari",
        "description": "Morning or afternoon game drives with a tracker to look for elephants, birds and more.",
        "image": "/destinations/experiences/udawalawe-safari.webp"
      },
      {
        "title": "Elephant Transit Home",
        "description": "A rehabilitation centre that cares for orphaned elephants before release into the wild.",
        "image": "/destinations/experiences/elephant-transit-home.webp"
      }
    ]
  },
  {
    "id": "unawatuna",
    "title": "Unawatuna",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/destinations/unawatuna.webp",
    "tags": [
      "Jungle Beach",
      "Japanese Peace Pagoda",
      "Dalawella rope swings"
    ],
    "bestTime": "November to April brings the calmest sea and the most sunshine.",
    "howToGetThere": "About 2 hours by road from Colombo, and 15 minutes from Galle.",
    "description": "Unawatuna is a sheltered bay with soft sand, just a few minutes from Galle Fort. Small coves, clifftop viewpoints and beachside cafés make it an easy place to linger.",
    "experiences": [
      {
        "title": "Jungle Beach",
        "description": "A small, tree-fringed cove reached by a short walk, good for calm-day swimming.",
        "image": "/destinations/experiences/jungle-beach.webp"
      },
      {
        "title": "Japanese Peace Pagoda",
        "description": "A white peace stupa on the headland with views over the coast towards Galle.",
        "image": "/destinations/experiences/peace-pagoda.webp"
      },
      {
        "title": "Dalawella rope swings",
        "description": "Palm-tree swings over the shallows, a popular photo spot at sunset.",
        "image": "/destinations/experiences/dalawella.webp"
      }
    ]
  },
  {
    "id": "weligama",
    "title": "Weligama",
    "location": "Southern Province",
    "category": "Beach",
    "image": "/destinations/weligama.webp",
    "tags": [
      "Surf lessons",
      "Weligama Bay",
      "Stilt fishing"
    ],
    "bestTime": "November to April is the main surf and beach season.",
    "howToGetThere": "About 2.5 hours by road from Colombo, or 30 minutes from Galle.",
    "description": "Weligama's wide, sandy bay has soft, rolling waves that are ideal for learning to surf. Along the coast you'll find fishing traditions, small islands and easy access to the beaches of the south.",
    "experiences": [
      {
        "title": "Surf lessons",
        "description": "Gentle, consistent waves and many local surf schools make it easy to get started.",
        "image": "/destinations/experiences/weligama-surfing.webp"
      },
      {
        "title": "Weligama Bay",
        "description": "A broad bay with a tiny island and a long stretch of sand for walks.",
        "image": "/destinations/experiences/destination-weligama.webp"
      },
      {
        "title": "Stilt fishing",
        "description": "Fishermen balancing on poles in the shallows, a traditional sight along this stretch of coast.",
        "image": "/destinations/experiences/stilt-fishing.webp"
      }
    ]
  },
  {
    "id": "wellawaya",
    "title": "Wellawaya",
    "location": "Uva Province",
    "category": "Nature",
    "image": "/destinations/wellawaya.webp",
    "tags": [
      "Buduruwagala",
      "Diyaluma Falls",
      "Rural landscapes"
    ],
    "bestTime": "Pleasant much of the year; waterfalls are fullest after the rains.",
    "howToGetThere": "About 1 hour by road from Ella, and around 2 hours from Yala or Udawalawe.",
    "description": "Wellawaya sits where the hill country drops into the dry lowlands, among rice fields and forested hills. It's a quiet stop for waterfalls, ancient rock carvings and rural scenery between Ella and the south.",
    "experiences": [
      {
        "title": "Buduruwagala",
        "description": "Giant figures carved into a rock face, standing in a peaceful forest setting.",
        "image": "/destinations/experiences/buduruwagala.webp"
      },
      {
        "title": "Diyaluma Falls",
        "description": "One of the highest waterfalls on the island, with natural pools near the top.",
        "image": "/destinations/experiences/diyaluma.webp"
      },
      {
        "title": "Rural landscapes",
        "description": "Paddy fields, village temples and quiet country roads to explore with your driver.",
        "image": "/destinations/experiences/wellawaya-rural.webp"
      }
    ]
  },
  {
    "id": "wilpattu",
    "title": "Wilpattu",
    "location": "North Western & North Central Provinces",
    "category": "Wildlife",
    "image": "/destinations/wilpattu.webp",
    "tags": [
      "Wilpattu National Park",
      "Safari",
      "Villu wetlands"
    ],
    "bestTime": "The best season is usually from around February to October.",
    "howToGetThere": "About 4 hours by road from Colombo, or 1 hour from Anuradhapura.",
    "description": "Wilpattu is the island's largest national park, a mosaic of forest and natural lakes called villus. Safaris here are calmer and less crowded, with chances to see leopards, sloth bears and plenty of birds.",
    "experiences": [
      {
        "title": "Wilpattu National Park",
        "description": "A vast park of forest and lakes, known for peaceful, uncrowded game drives.",
        "image": "/destinations/experiences/destination-wilpattu.webp"
      },
      {
        "title": "Safari",
        "description": "Morning and afternoon jeep safaris with experienced trackers.",
        "image": "/destinations/experiences/wilpattu-safari.webp"
      },
      {
        "title": "Villu wetlands",
        "description": "Natural rain-filled lakes that attract wildlife and waterbirds throughout the park.",
        "image": "/destinations/experiences/wilpattu-villu.webp"
      }
    ]
  }

];
