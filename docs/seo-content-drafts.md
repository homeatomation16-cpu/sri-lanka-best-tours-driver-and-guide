# SEO content drafts (for review — not published)

Five page drafts built only from information already on the site:

- the confirmed business facts:
  - 1 year of professional experience;
  - Licensed & Certified Professional Tour Driver;
  - 4.9/5 on Google;
- tour itineraries and "Included" lists in `src/data/tours/en.ts`;
- vehicle records in `src/data/vehicles/en.ts`;
- destination pages in `src/data/destinations.ts`.

Anything that needs a business answer is marked **[CONFIRM]** and must stay out of the published page until it is answered. No prices, hotel names, mileage limits, cancellation terms, airport-transfer promises or reviews are invented here.

Publishing needs approval. These pages can then be added the same way as the existing content pages, with all 14 translations, and the new URLs added to the sitemap.

---

## 1. Sri Lanka Private Driver & Guide

- **Suggested URL:** `/private-driver-sri-lanka`
- **Title:** Private Driver & Guide in Sri Lanka | Sri Lanka Best Tours Driver & Guide
- **Meta description:** Travel Sri Lanka with a licensed and certified professional tour driver in a private, air-conditioned vehicle. Plan your own route or choose a ready-made tour.
- **H1:** Your Private Driver & Guide in Sri Lanka

### Sections

**How it works**

1. Tell us your dates, group size and the places you want to see. Use the [tailor-made form](/tailor-made-tours) or [WhatsApp].
2. We plan the route and suggest a vehicle sized for your group (see section 2).
3. Your driver picks you up and stays with you for the whole trip. Each day runs at your pace.

**Who drives you**

- A Licensed & Certified Professional Tour Driver with 1 year of professional experience.
- Travellers rate the service 4.9/5 on Google.
- [CONFIRM] Languages spoken other than English. The tours list "English Speaking Professional Driver".

**What is included on our listed tours**

This is quoted from the tours' "Included" lists, so it describes those tours only:

- air-conditioned private vehicle;
- English-speaking professional driver;
- the driver's accommodation and meals;
- fuel and parking fees;
- freeway (toll road) tickets;
- local SIM card with data;
- water bottles.

[CONFIRM] Whether the same applies to custom routes and to day hire.

**Popular routes:**

- [10 Days Down South Tour](/tours/10-days-down-south)
- [10 Days East Coast Tour](/tours/10-days-east-coast)
- [14 Days Down South & East Coast Tour](/tours/14-days-down-south)
- [All tours](/tours)

**Places your driver can take you:**

- [Sigiriya](/destinations/sigiriya)
- [Kandy](/destinations/kandy)
- [Ella](/destinations/ella)
- [Nuwara Eliya](/destinations/nuwara-eliya)
- [Yala](/destinations/yala)
- [Galle](/destinations/galle)
- [Trincomalee](/destinations/trincomalee)

**Call to action:** "Plan my route" (tailor-made form) · "Chat on WhatsApp" · "See ready-made tours".

### FAQ (verified answers only)

- **Is the vehicle private?** Yes. The tours list an "Air-Conditioned Private Vehicle".
- **Do I pay for the driver's room and meals?** On the listed tours, no: "Driver's Accommodation & Meals" is included.
- **Are fuel, parking and toll roads extra?** On the listed tours they are included.
- **Can I change the route?** [CONFIRM] Rules for changes during the trip.
- **How do I pay / can I cancel?** [CONFIRM] Payment and cancellation terms. The booking form currently says "No payment required now".

**Structured data:** `Service` (serviceType "Private driver and guide", provider `#travel-agency`, areaServed "Sri Lanka") plus `BreadcrumbList`. No `aggregateRating`.

---

## 2. Car Hire with Driver in Sri Lanka

- **Suggested URL:** `/car-hire-with-driver-sri-lanka` (or improve the existing `/vehicles` page instead, to avoid two similar pages)
- **Title:** Car Hire with Driver in Sri Lanka – Cars, Vans & Coach
- **Meta description:** Hire a car, van or coach with a professional driver in Sri Lanka. Choose a vehicle for 3 to 25 passengers and book with e-mail verification.
- **H1:** Car Hire with Driver in Sri Lanka

### Choose by group size (seats from the vehicle records)

| Vehicle | Seats | Page |
|---|---|---|
| Toyota Prius | 3 | `/vehicles/toyota-prius` |
| Honda Fit Shuttle | 4 | `/vehicles/honda-fit` |
| Toyota Axio | 4 | `/vehicles/toyota-axio` |
| Honda Grace | 4 | `/vehicles/honda-grace` |
| Toyota KDH Flatroof VIP Van | 8 | `/vehicles/kdh-vip-flatroof` |
| Toyota KDH Highroof | 10 | `/vehicles/toyota-kdh` |
| Toyota Coaster AC Bus | 25 | `/vehicles/toyota-coaster` |

### How booking works

On each vehicle page:

1. Choose the number of passengers (up to the vehicle's seats).
2. Confirm your e-mail with a 6-digit code.
3. Send the request.

This is a request, not a confirmed reservation. The team confirms availability by e-mail or WhatsApp.

### Missing information [CONFIRM]

- daily rate or how the price is calculated;
- mileage limits;
- what is included on day hire (fuel, tolls, parking, driver's meals);
- airport pick-up availability;
- self-drive (not offered on the site; do not imply it);
- luggage capacity per vehicle.

**Call to action:** "Choose a vehicle" (links to `/vehicles`) · "Chat on WhatsApp".

**Structured data:** `Service` (serviceType "Car hire with driver") with an `OfferCatalog` listing the vehicles, without prices until those are confirmed.

---

## 3. Seven-day Sri Lanka itinerary guide

- **Suggested URL:** `/sri-lanka-itinerary-7-days`
- **Title:** 7 Days in Sri Lanka: Itinerary Ideas with a Private Driver
- **Meta description:** Three real 7-day routes, by beach, hill country and the Ramayana trail, with the day-by-day plan and a private driver.
- **H1:** 7 Days in Sri Lanka – Three Ways to Spend a Week

### Sections (each route comes from an existing tour page)

**Hill country week – [Hill Country Retreat](/tours/hill-country-retreat)**

- Route: Negombo → Kandy (2 nights) → Nuwara Eliya (2 nights) → Colombo → departure.
- Link the destinations: [Negombo](/destinations/negombo), [Kandy](/destinations/kandy), [Nuwara Eliya](/destinations/nuwara-eliya).

**Beach week – [Coastal Romance](/tours/coastal-romance)**

- Route: Colombo (3 nights) → Bentota (3 nights) → departure.
- Link the destination: [Bentota](/destinations/bentota).

**Ramayana trail – [Ramayana Tour 02](/tours/ramayana-tour-02)**

- Route: Kandy → Nuwara Eliya → Kataragama → Bentota (2 nights) → Colombo → departure.

**Which week suits you?**

- Write one short paragraph per route, using only facts from the itinerary text.
- [CONFIRM] Season advice. The site currently gives conflicting South Coast season dates; see the decision table in the release notes.

**Call to action:** "Book this route" (tour page) · "Change this route" (tailor-made form).

---

## 4. Ten-day Sri Lanka itinerary guide

- **Suggested URL:** `/sri-lanka-itinerary-10-days`
- **Title:** 10 Days in Sri Lanka: South Coast or East Coast Itinerary
- **Meta description:** Two 10-day routes with a private driver: the cultural triangle, hill country and either the south coast with Yala, or the east coast to Trincomalee.
- **H1:** 10 Days in Sri Lanka – South or East?

### Sections

**South route – [10 Days Down South Tour](/tours/10-days-down-south)**

- Days: Habarana → Sigiriya & Polonnaruwa → Kandy → Nuwara Eliya → Horton Plains & Ella → Ella → Yala → Mirissa (2 nights) → Colombo & departure.
- Also available [with hotels](/tours/10-days-down-south-hotels).

**East route – [10 Days East Coast Tour](/tours/10-days-east-coast)**

- Days: Negombo → Ella → Nuwara Eliya → Kandy → Habarana → Pasikuda → Batticaloa → Trincomalee (2 days) → departure.
- Also available [with hotels](/tours/10-days-east-coast-hotels).

**Destinations on these routes:**

- [Sigiriya](/destinations/sigiriya)
- [Polonnaruwa](/destinations/polonnaruwa)
- [Kandy](/destinations/kandy)
- [Ella](/destinations/ella)
- [Yala](/destinations/yala)
- [Mirissa](/destinations/mirissa)
- [Trincomalee](/destinations/trincomalee)
- [Passikudah](/destinations/passikudah)

**What is included:** quote each tour's "Included" list (vehicle, driver, driver's meals and room, fuel, parking, tolls, SIM, water).

**South or east?**

- Compare by places visited.
- [CONFIRM] Which months to recommend for each coast.

**Call to action:** "Book the South route" · "Book the East route" · "Plan my own 10 days".

---

## 5. Fourteen-day Sri Lanka itinerary guide

- **Suggested URL:** `/sri-lanka-itinerary-14-days`
- **Title:** 14 Days in Sri Lanka: The Complete Round Trip with a Private Driver
- **Meta description:** Two weeks around Sri Lanka: ancient cities, Kandy, the tea country, Ella, Yala and the coast, with a private driver.
- **H1:** Two Weeks in Sri Lanka – The Full Round Trip

### Sections

**[14 Days Down South & East Coast Tour](/tours/14-days-down-south)**

- Route: Negombo → Anuradhapura → Habarana → Sigiriya & Polonnaruwa → Kandy → Nuwara Eliya (2 days) → Ella (2 days) → Yala → Mirissa → Galle & Hikkaduwa → Bentota & Colombo → departure.
- Its "Included" list also has "Free Train Ticket(s)".

**[14 Days East Coast & Down South Tour](/tours/14-days-east-coast)**

- The same idea, with the east coast first.

**For nature lovers:**

- [Wilderness Uncovered](/tours/wilderness-uncovered)
- [Sunrise Shores Tour](/tours/sunrise-shores-tour)
- Summarise both from their itineraries only.

**Destinations on the route:**

- [Anuradhapura](/destinations/anuradhapura)
- [Sigiriya](/destinations/sigiriya)
- [Kandy](/destinations/kandy)
- [Nuwara Eliya](/destinations/nuwara-eliya)
- [Ella](/destinations/ella)
- [Yala](/destinations/yala)
- [Mirissa](/destinations/mirissa)
- [Galle](/destinations/galle)
- [Hikkaduwa](/destinations/hikkaduwa)
- [Bentota](/destinations/bentota)

**Call to action:** "Book the 14-day tour" · "Plan my own route".

---

## Already implemented on the site (not drafts)

- Tour pages list "Destinations on this tour". These are the destinations named in the English itinerary; Colombo is left out because most tours only start or end there.
- Destination pages list "Tours that visit …".
- Base and "with hotels" tours link to each other.

## Business information needed before publishing

1. Day-hire pricing basis, mileage limits and what day hire includes.
2. Airport pick-up / drop-off availability.
3. Payment and cancellation terms.
4. Languages the driver speaks.
5. Season months for the South and East coasts. Four different ranges are on the site now.
6. Luggage capacity per vehicle.
