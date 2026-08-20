export const MINIMUM_TOUR_PEOPLE = 2;

export function getTourPricePerPerson(tour: { price?: number; pricePerPerson?: number }) {
  return Number(tour.pricePerPerson ?? tour.price ?? 0);
}

export function calculateTourTotal(
  tour: { price?: number; pricePerPerson?: number; additionalPersonPrice?: number },
  people: number,
) {
  const pricePerPerson = getTourPricePerPerson(tour);
  const additionalPersonPrice = Number(tour.additionalPersonPrice ?? pricePerPerson);
  const validPeople = Math.max(MINIMUM_TOUR_PEOPLE, Math.floor(Number(people) || MINIMUM_TOUR_PEOPLE));

  return {
    people: validPeople,
    pricePerPerson,
    additionalPersonPrice,
    total: pricePerPerson * MINIMUM_TOUR_PEOPLE + additionalPersonPrice * (validPeople - MINIMUM_TOUR_PEOPLE),
  };
}