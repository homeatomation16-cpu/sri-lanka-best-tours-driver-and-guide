/*
 * Homepage photography. Each image appears in exactly ONE homepage slot so the
 * scroll reads as a journey rather than a repeating slideshow:
 *
 *   Ascent .......... highlands (plate) + hillCountryCouple (frame)
 *   Explorer ........ mirissaCove, tea, sigiriya, wildlife
 *   Tours (south) ... stilt, galleLighthouse, leopard
 *   Seasonal (east) . pasikudahAerial (scenery) + pigeonIsland, arugamBay, coast
 *   Tailor-made ..... landscape (CMS-overridable) + dambulla
 *   One-day ......... galle, kandy, sigiriyaPidurangala, udawalawe
 *   Descent ......... pasikudahDusk (sunset — Why Us continues it as nightfall)
 *   Why Us .......... ellaRock (no scenery photo; dusk glow only)
 *
 * Credits & licences: public/images/editorial/credits.json (CC BY / BY-SA need
 * visible attribution — rendered by <PhotoCredits /> on the homepage).
 */
export const editorialImages = {
  coast: "/images/editorial/coast.webp",
  tea: "/images/editorial/tea-country.webp",
  sigiriya: "/images/editorial/sigiriya.webp",
  wildlife: "/images/editorial/elephant.webp",
  highlands: "/images/editorial/highlands.webp",
  hillCountryCouple: "/images/editorial/hill-country-couple-v2.webp",
  landscape: "/images/editorial/sigiriya-landscape.webp",
  galle: "/images/editorial/galle.webp",
  kandy: "/images/editorial/kandy.webp",
  mirissaCove: "/images/editorial/mirissa-cove.jpg",
  stilt: "/images/editorial/stilt-fishermen.jpg",
  galleLighthouse: "/images/editorial/galle-lighthouse.jpg",
  leopard: "/images/editorial/leopard.jpg",
  pasikudahAerial: "/images/editorial/pasikudah-aerial.jpg",
  pigeonIsland: "/images/editorial/pigeon-island.jpg",
  arugamBay: "/images/editorial/arugam-bay.jpg",
  pasikudahDusk: "/images/editorial/pasikudah-dusk.jpg",
  nineArch: "/images/editorial/nine-arch-bridge.jpg",
  sigiriyaPidurangala: "/images/editorial/sigiriya-pidurangala.jpg",
  hortonPlains: "/images/editorial/horton-plains.jpg",
  ellaRock: "/images/editorial/ella-rock.jpg",
  dambulla: "/images/editorial/dambulla-cave-temple.jpg",
  udawalawe: "/images/editorial/udawalawe-elephants.jpg",
};

export const homeTourImages: Record<string, string> = {
  "05-days-down-south": editorialImages.stilt,
  "08-days-down-south": editorialImages.galleLighthouse,
  "10-days-down-south": editorialImages.leopard,
  "05-days-east-coast": editorialImages.pigeonIsland,
  "08-days-east-coast": editorialImages.arugamBay,
  "10-days-east-coast": editorialImages.coast,
};
