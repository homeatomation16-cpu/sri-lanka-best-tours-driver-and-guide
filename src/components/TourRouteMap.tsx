import { useId } from "react";
import { SRI_LANKA_COASTLINE } from "@/lib/sri-lanka-coastline";
import { placeByKey } from "@/lib/sriLankaPlaces";

// Same projection as the terrain picture (public/maps/sri-lanka-terrain.webp, 400 × 600) and coastline.
// Terrain: public-domain NASA SRTM elevation data; coastline: Natural Earth (public domain).
const MAP_BOUNDS = { west: 79.35, north: 9.95 };
const UNITS_PER_DEGREE = 125;
const LONGITUDE_SCALE = Math.cos((7.6 * Math.PI) / 180);

function project(lat: number, lng: number) {
  return {
    x: 30 + (lng - MAP_BOUNDS.west) * UNITS_PER_DEGREE * LONGITUDE_SCALE,
    y: 35 + (MAP_BOUNDS.north - lat) * UNITS_PER_DEGREE,
  };
}

// Landmark pictures cut from the illustrated Sri Lanka map (public/maps/icons/<name>.webp)
const ICONS = new Set([
  "airport", "anuradhapura", "arugam-bay", "batticaloa", "colombo", "dambulla", "ella", "galle", "habarana", "hatton",
  "horton-plains", "jaffna", "kalpitiya", "kandy", "mannar", "mirissa", "negombo", "nuwara-eliya", "pasikuda",
  "polonnaruwa", "sigiriya", "tangalle", "trincomalee", "udawalawe", "wilpattu", "yala",
]);
// Beach towns without their own picture share the beach one
const BEACH = new Set(["weligama", "hikkaduwa", "unawatuna", "bentota", "beruwala", "nilaveli", "matara"]);
const iconFor = (key: string) => (ICONS.has(key) ? key : BEACH.has(key) ? "beach" : undefined);

const ICON_W = 66;
const ICON_H = 53;

/** Sri Lanka terrain map with the tour's stops numbered in order, the route line and a landmark picture per stop. */
export default function TourRouteMap({ stops, label, caption }: { stops: string[]; label: string; caption: string }) {
  const svgId = useId().replace(/:/g, "");
  const points = stops
    .map((key) => placeByKey(key))
    .filter((place): place is NonNullable<typeof place> => Boolean(place))
    .map((place) => ({ ...place, ...project(place.lat, place.lng) }));
  if (!points.length) return null;

  const route = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // One picture per place. Try above the pin, then left / right / below, and skip it if all spots overlap another picture.
  const placed: { key: string; x: number; y: number; icon: string }[] = [];
  const overlaps = (x: number, y: number) => placed.some((b) => Math.abs(b.x - x) < ICON_W * 0.8 && Math.abs(b.y - y) < ICON_H * 0.8);
  for (const p of points) {
    const icon = iconFor(p.key);
    if (!icon || placed.some((b) => b.key === p.key)) continue;
    const spots = [
      { x: p.x - ICON_W / 2, y: p.y - ICON_H - 12 },
      { x: p.x - ICON_W - 14, y: p.y - ICON_H / 2 },
      { x: p.x + 14, y: p.y - ICON_H / 2 },
      { x: p.x - ICON_W / 2, y: p.y + 12 },
    ].map((s) => ({ x: Math.min(400 - ICON_W, Math.max(0, s.x)), y: Math.min(600 - ICON_H, Math.max(0, s.y)) }));
    const spot = spots.find((s) => !overlaps(s.x, s.y));
    if (spot) placed.push({ key: p.key, icon, ...spot });
  }

  // Each place is labelled once (a route can pass the same town twice); labels near the right edge go on the left.
  const labelled = new Set<string>();

  return (
    <figure className="min-w-0">
      <svg viewBox="0 0 400 600" role="img" aria-label={`${label}: ${points.map((p) => p.name).join(" → ")}`} className="mx-auto w-full max-w-[440px]">
        <defs>
          {/* Island plus a soft band of sea that fades out to transparent */}
          <filter id={`${svgId}-blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <mask id={`${svgId}-fade`} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="600">
            <path d={SRI_LANKA_COASTLINE} fill="#fff" stroke="#fff" strokeWidth="50" strokeLinejoin="round" filter={`url(#${svgId}-blur)`} />
            <path d={SRI_LANKA_COASTLINE} fill="#fff" />
          </mask>
          {/* Soft oval edge for the landmark pictures, so they melt into the map */}
          <radialGradient id={`${svgId}-iconfade`}>
            <stop offset="55%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id={`${svgId}-iconmask`} maskContentUnits="objectBoundingBox">
            <ellipse cx=".5" cy=".5" rx=".5" ry=".5" fill={`url(#${svgId}-iconfade)`} />
          </mask>
          <filter id={`${svgId}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#08261a" floodOpacity=".35" />
          </filter>
        </defs>

        <g mask={`url(#${svgId}-fade)`}>
          <image href="/maps/sri-lanka-terrain.webp" width="400" height="600" preserveAspectRatio="none" />
          <path d={SRI_LANKA_COASTLINE} fill="none" stroke="#f7f4e8" strokeWidth="1.6" strokeOpacity=".7" strokeLinejoin="round" />
        </g>

        {/* LANDMARK PICTURES */}
        {placed.map((b) => (
          <image
            key={b.key}
            href={`/maps/icons/${b.icon}.webp`}
            x={b.x}
            y={b.y}
            width={ICON_W}
            height={ICON_H}
            preserveAspectRatio="xMidYMid slice"
            mask={`url(#${svgId}-iconmask)`}
          />
        ))}

        {/* ROUTE LINE */}
        {points.length > 1 && (
          <>
            <polyline points={route} fill="none" stroke="#fff" strokeWidth="5" strokeOpacity=".8" strokeLinejoin="round" strokeLinecap="round" />
            <polyline points={route} fill="none" stroke="#b5541a" strokeWidth="2.4" strokeDasharray="6 5" strokeLinejoin="round" strokeLinecap="round" />
          </>
        )}

        {/* NUMBERED STOPS */}
        {points.map((p, i) => {
          const showLabel = !labelled.has(p.key);
          labelled.add(p.key);
          const onLeft = p.x > 250;
          return (
            <g key={`${p.key}-${i}`} transform={`translate(${p.x} ${p.y})`}>
              <title>{`${i + 1}. ${p.name}`}</title>
              <circle r="9" fill="#9b1c1c" stroke="#fff" strokeWidth="2.5" filter={`url(#${svgId}-shadow)`} />
              <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{i + 1}</text>
              {showLabel && (
                <text
                  x={onLeft ? -14 : 14}
                  y="4"
                  textAnchor={onLeft ? "end" : "start"}
                  fontSize="12"
                  fontWeight="600"
                  fill="#2f3b2c"
                  stroke="#f7f4e8"
                  strokeWidth="3.5"
                  paintOrder="stroke"
                  strokeLinejoin="round"
                >
                  {p.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">{caption}</figcaption>
    </figure>
  );
}
