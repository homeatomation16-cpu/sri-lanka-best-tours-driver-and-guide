// Tours priced per person (no price table) are charged for at least this many people.
export const MINIMUM_TOUR_PEOPLE = 2;

type GroupPrice = { persons: number; price: number; vehicle?: string };
type PricedTour = { price?: number; pricePerPerson?: number; additionalPersonPrice?: number; groupPrices?: GroupPrice[]; maxPeople?: number };

export function getTourPricePerPerson(tour: { price?: number; pricePerPerson?: number }) {
  return Number(tour.pricePerPerson ?? tour.price ?? 0);
}

function sortedGroupPrices(tour: PricedTour) {
  return [...(tour.groupPrices ?? [])].sort((a, b) => a.persons - b.persons);
}

/** Smallest group that can book: 1 for tours with a price table, otherwise the per-person minimum. */
export function getMinimumPeople(tour: PricedTour) {
  return sortedGroupPrices(tour)[0]?.persons ?? MINIMUM_TOUR_PEOPLE;
}

/** Largest group that can book: the last row of the price table, else the tour's max (default 20). */
export function getMaximumPeople(tour: PricedTour) {
  return sortedGroupPrices(tour).at(-1)?.persons ?? (Number(tour.maxPeople) || 20);
}

/** Whole-group price row from the tour's price table (largest listed group if there are more travellers). */
export function getGroupPrice(tour: PricedTour, people: number) {
  const rows = sortedGroupPrices(tour);
  if (!rows.length) return undefined;
  return rows.find((row) => row.persons >= people) ?? rows[rows.length - 1];
}

export function calculateTourTotal(tour: PricedTour, people: number) {
  const validPeople = Math.min(getMaximumPeople(tour), Math.max(getMinimumPeople(tour), Math.floor(Number(people) || 0)));

  // Tours with a price table are priced for the whole group, by group size.
  const group = getGroupPrice(tour, validPeople);
  if (group) {
    const pricePerPerson = Math.round((group.price / validPeople) * 100) / 100;
    return { people: validPeople, pricePerPerson, additionalPersonPrice: pricePerPerson, total: group.price, vehicle: group.vehicle };
  }

  const pricePerPerson = getTourPricePerPerson(tour);
  const additionalPersonPrice = Number(tour.additionalPersonPrice ?? pricePerPerson);

  return {
    people: validPeople,
    pricePerPerson,
    additionalPersonPrice,
    total: pricePerPerson * MINIMUM_TOUR_PEOPLE + additionalPersonPrice * (validPeople - MINIMUM_TOUR_PEOPLE),
    vehicle: undefined as string | undefined,
  };
}
