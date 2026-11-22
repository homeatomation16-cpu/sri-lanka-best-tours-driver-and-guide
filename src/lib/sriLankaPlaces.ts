// Places used on tour route maps: name, approximate coordinates and words that identify them
// in an (English) itinerary day. The first matching place wins, so more specific names come first.

export type SriLankaPlace = { key: string; name: string; lat: number; lng: number; match: string[] };

export const SRI_LANKA_PLACES: SriLankaPlace[] = [
  { key: "horton-plains", name: "Horton Plains", lat: 6.8023, lng: 80.8064, match: ["horton plains"] },
  { key: "nuwara-eliya", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, match: ["nuwara eliya"] },
  { key: "nilaveli", name: "Nilaveli", lat: 8.6967, lng: 81.1883, match: ["nilaveli"] },
  { key: "arugam-bay", name: "Arugam Bay", lat: 6.8406, lng: 81.8368, match: ["arugam"] },
  { key: "udawalawe", name: "Udawalawe", lat: 6.4389, lng: 80.8889, match: ["uda-walawe", "udawala"] },
  { key: "polonnaruwa", name: "Polonnaruwa", lat: 7.9403, lng: 81.0188, match: ["polonnaruwa"] },
  { key: "sigiriya", name: "Sigiriya", lat: 7.957, lng: 80.7603, match: ["sigiriya"] },
  { key: "dambulla", name: "Dambulla", lat: 7.8567, lng: 80.6492, match: ["dambulla"] },
  { key: "habarana", name: "Habarana", lat: 8.0346, lng: 80.7494, match: ["habarana"] },
  { key: "anuradhapura", name: "Anuradhapura", lat: 8.3114, lng: 80.4037, match: ["anuradhapura"] },
  { key: "kandy", name: "Kandy", lat: 7.2906, lng: 80.6337, match: ["kandy"] },
  { key: "ella", name: "Ella", lat: 6.8667, lng: 81.0466, match: ["ella"] },
  { key: "yala", name: "Yala", lat: 6.3728, lng: 81.4, match: ["yala"] },
  { key: "mirissa", name: "Mirissa", lat: 5.9483, lng: 80.4716, match: ["mirissa"] },
  { key: "weligama", name: "Weligama", lat: 5.9746, lng: 80.4297, match: ["weligama"] },
  { key: "tangalle", name: "Tangalle", lat: 6.0242, lng: 80.7941, match: ["tangalle"] },
  { key: "hikkaduwa", name: "Hikkaduwa", lat: 6.1395, lng: 80.1063, match: ["hikkaduwa"] },
  { key: "unawatuna", name: "Unawatuna", lat: 6.0104, lng: 80.2496, match: ["unawatuna"] },
  { key: "galle", name: "Galle", lat: 6.0329, lng: 80.2168, match: ["galle"] },
  { key: "bentota", name: "Bentota", lat: 6.421, lng: 79.9982, match: ["bentota"] },
  { key: "beruwala", name: "Beruwala", lat: 6.4788, lng: 79.9828, match: ["beruwala"] },
  { key: "hatton", name: "Hatton", lat: 6.8916, lng: 80.5955, match: ["hatton"] },
  { key: "kitulgala", name: "Kitulgala", lat: 6.9925, lng: 80.418, match: ["kitulgala"] },
  { key: "sinharaja", name: "Sinharaja", lat: 6.4, lng: 80.5, match: ["sinharaja"] },
  { key: "wilpattu", name: "Wilpattu", lat: 8.4558, lng: 80.0058, match: ["wilpattu"] },
  { key: "kalpitiya", name: "Kalpitiya", lat: 8.2333, lng: 79.7667, match: ["kalpitiya"] },
  { key: "pasikuda", name: "Pasikuda", lat: 7.9286, lng: 81.5615, match: ["pasikuda", "pasikudah", "passikudah"] },
  { key: "trincomalee", name: "Trincomalee", lat: 8.5874, lng: 81.2152, match: ["trincomalee"] },
  { key: "batticaloa", name: "Batticaloa", lat: 7.7102, lng: 81.6924, match: ["batticaloa"] },
  { key: "hambantota", name: "Hambantota", lat: 6.1241, lng: 81.1185, match: ["hambantota"] },
  { key: "kataragama", name: "Kataragama", lat: 6.4134, lng: 81.3346, match: ["kataragama"] },
  { key: "jaffna", name: "Jaffna", lat: 9.6615, lng: 80.0255, match: ["jaffna"] },
  { key: "mannar", name: "Mannar", lat: 8.981, lng: 79.9044, match: ["mannar"] },
  { key: "matara", name: "Matara", lat: 5.9485, lng: 80.5353, match: ["matara"] },
  { key: "negombo", name: "Negombo", lat: 7.2083, lng: 79.8358, match: ["negombo"] },
  { key: "airport", name: "Airport (CMB)", lat: 7.1808, lng: 79.8841, match: ["airport", "departure", "arrival"] },
  { key: "colombo", name: "Colombo", lat: 6.9271, lng: 79.8612, match: ["colombo"] },
];

const BY_KEY = new Map(SRI_LANKA_PLACES.map((place) => [place.key, place]));

export function placeByKey(key: string) {
  return BY_KEY.get(key);
}

/** The place an itinerary day is about, from its English location / title (or undefined). */
export function matchPlace(text: string) {
  const s = text.toLowerCase();
  return SRI_LANKA_PLACES.find((place) => place.match.some((word) => s.includes(word)));
}
