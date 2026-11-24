import CinematicSection from "./CinematicSection";
import CinematicHeading from "./CinematicHeading";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { editorialImages } from "@/data/editorialImages";

/*
 * Both scenes use a sticky, viewport-sized stage inside a taller section:
 * the frame stays put while the "camera" moves within it, so every
 * intermediate scroll position is a complete composition.
 * Masks live on static wrappers (.cine-plate); only the inner layers move,
 * so the soft edges never slide out of place.
 */

/**
 * CLOUD BRIDGE — hero video → Ascent.
 * Overlaps the bottom of the hero, then white cloud banks roll up past the
 * camera at three depths (far slow, near fast) and thin into the same pale
 * blue as the highlands photo's sky, where Ascent's lead-in line sits.
 */
type Depth = "far" | "mid" | "near";
// Scroll motion per depth: far pieces sink slowly and fade a little, near
// pieces drop fast, grow and vanish before the Ascent lead-in line.
const DEPTH: Record<Depth, { y: string; scale: string; opacity: string }> = {
  far: { y: "-1vh,2vh", scale: "1,0.985", opacity: "0.75,0.55" },
  mid: { y: "-2vh,4vh", scale: "1,1.025", opacity: "0.95,0.8" },
  near: { y: "-4vh,9vh", scale: "1,1.09", opacity: "0.85,0" },
};
// [depth, left %, bottom %, width %, crop x %, crop y %, sideways drift vw (− left, + right), mirrored]
// Mostly parting outward (left half → left, right half → right), with a few
// moving against the flow so the drift doesn't look mechanical.
const PUFF_ROWS: [Depth, number, number, number, number, number, number, boolean][] = [
  ["far", -4, 40, 13, 12, 45, -4, false],
  ["far", 8, 28, 12, 30, 50, -3, true],
  ["far", 20, 20, 11, 38, 55, -4, false],
  ["far", 30, 34, 11, 48, 40, 3, false],
  ["far", 46, 58, 12, 58, 25, 3, false],
  ["far", 58, 48, 11, 66, 35, -2, true],
  ["far", 70, 60, 13, 80, 40, 4, false],
  ["far", 86, 46, 12, 92, 35, 5, true],
  ["mid", -6, 10, 17, 18, 50, -7, false],
  ["mid", 12, 22, 15, 40, 45, -6, true],
  ["mid", 30, 8, 16, 52, 55, 5, false],
  ["mid", 46, 26, 15, 62, 35, -5, true],
  ["mid", 60, 12, 17, 72, 45, 7, false],
  ["mid", 76, 24, 15, 86, 40, 8, true],
  ["mid", 90, 6, 16, 95, 50, 9, false],
  ["near", -12, -45, 24, 22, 55, -14, false],
  ["near", 14, -60, 22, 42, 60, -10, true],
  ["near", 40, -50, 22, 58, 55, 10, false],
  ["near", 62, -58, 23, 75, 55, 12, true],
  ["near", 84, -44, 24, 88, 50, 16, false],
];
// Idle drift (CSS, runs while the page is still): nearer pieces sway further
// and faster; each follows its scroll direction, with its own period and phase.
const IDLE: Record<Depth, { amp: number; dur: number }> = {
  far: { amp: 10, dur: 14 },
  mid: { amp: 18, dur: 11 },
  near: { amp: 28, dur: 8 },
};
const CLOUD_PUFFS = PUFF_ROWS.map(([depth, left, bottom, width, cx, cy, dx, flip], i) => ({
  idle: {
    ["--dx" as string]: `${Math.sign(dx) * IDLE[depth].amp}px`,
    ["--dy" as string]: `${(i % 3) * 2 + 3}px`,
    ["--dur" as string]: `${IDLE[depth].dur + (i % 4) * 1.5}s`,
    ["--delay" as string]: `${-(i * 1.7).toFixed(1)}s`,
  },
  depth,
  left: `${left}%`,
  bottom: `${bottom}%`,
  width: `${width}%`,
  crop: `${cx}% ${cy}%`,
  x: `0vw,${dx / 2}vw`,
  flip,
  ...DEPTH[depth],
}));

export function CloudBridge() {
  return (
    <CinematicSection data-scene className="cine-bridge" aria-hidden="true">
      {/* base bank: covers the seam and barely moves */}
      <div className="cine-billow cine-billow-mid" data-layer data-y="0vh,-1vh" data-scale="1,1.03" aria-hidden="true" />
      {/* separate cloud pieces cut from the same bank, each its own layer.
          They sink as you scroll at speeds set by depth, and each drifts
          left or right, so the bank breaks apart as the camera climbs. */}
      {CLOUD_PUFFS.map((p, i) => (
        <div
          key={i}
          className={`cine-puff cine-puff-${p.depth}`}
          style={{ ["--l" as string]: p.left, ["--b" as string]: p.bottom, ["--w" as string]: p.width, ["--bp" as string]: p.crop, ["--flip" as string]: p.flip ? -1 : 1, ...p.idle }}
          data-layer
          data-y={p.y}
          data-x={p.x}
          data-scale={p.scale}
          data-opacity={p.opacity}
          aria-hidden="true"
        />
      ))}
    </CinematicSection>
  );
}

/**
 * ASCENT — hero (fades to white) → Explorer (#f9f7f2).
 * Camera tilts up: the highlands plate pans from ground to sky and eases back,
 * mist drifts past faster in front, the giant word sits behind the single
 * viewpoint couple frame, and the base dissolves into the Explorer's cream.
 */
export async function AscentScene() {
  const t = await getTranslations("cinematic");
  return (
    <CinematicSection data-scene className="cine-scene cine-ascent" aria-labelledby="cine-ascent-title">
      <div className="cine-stage">
        <div className="cine-plate cine-plate-ascent" aria-hidden="true">
          <div className="cine-photo" data-layer data-y="-3%,3%" data-scale="1.1,1.04" data-rx="1,0">
            <Image src={editorialImages.highlands} alt="" fill sizes="100vw" quality={75} className="object-cover object-bottom" />
          </div>
        </div>

        {/* lead-in line lives in the photo's cloudy sky: fades in, then lifts away before the headline */}
        <div className="cine-skytext" data-layer data-at="0,0.35" data-y="0vh,-2vh" data-opacity="1,0.5">
          <p>{t("bridgeText")}</p>
        </div>

        <p className="cine-mega" style={{ ["--len" as string]: t("ascentMega").length }} data-layer data-y="2vh,-3vh" aria-hidden="true">{t("ascentMega")}</p>

        <div className="cine-mist cine-mist-a" data-layer data-y="3vh,-5vh" data-x="-1vw,2vw" data-opacity="0.2,0.08" aria-hidden="true" />
        <div className="cine-mist cine-mist-b" data-layer data-at="0,1" data-y="4vh,-3vh" data-opacity="0.24,0.08" aria-hidden="true" />

        <div className="cine-compose">
          <div className="cine-copy" data-copy>
            <p className="cine-eyebrow" data-cue="before">{t("ascentLabel")}</p>
            <CinematicHeading id="cine-ascent-title" className="cine-title">{t("ascentTitle")}</CinematicHeading>
            <p className="cine-text" data-cue="after">{t("ascentText")}</p>
            <Link href="/tours" className="cine-cta" data-cue="after">{t("ascentCta")}</Link>
          </div>
          <figure className="cine-frame cine-frame-ascent" data-layer data-at="0,1" data-y="2vh,-2vh" data-rx="1,-0.5">
            <div className="cine-frame-inner" data-layer data-at="0,1" data-scale="1.08,1.05" data-y="-1%,1%">
              <Image src={editorialImages.hillCountryCouple} alt={t("frameImgAlt")} fill sizes="(max-width: 599px) calc(87vw - 42px), (max-width: 1024px) calc(49vw - 35px), (max-width: 1280px) 50vw, 562px" quality={75} className="object-cover" />
            </div>
          </figure>
        </div>
      </div>
    </CinematicSection>
  );
}

/**
 * DESCENT — vehicles (#eef3f2) → Why Us (dusk indigo).
 * We drop through cloud the colour of the section above, the banks part, and
 * the east coast appears at sunset; the water darkens into the indigo night
 * that Why Us continues, so the journey moves through time of day rather
 * than cutting from a beach to a mountain.
 */
export async function DescentScene() {
  const t = await getTranslations("cinematic");
  return (
    <CinematicSection data-scene className="cine-scene cine-descent" aria-labelledby="cine-descent-title">
      <div className="cine-stage">
        <div className="cine-plate cine-plate-descent" aria-hidden="true">
          <div className="cine-photo" data-layer data-scale="1.05,1.12" data-y="-2%,2%" data-rx="-1,0">
            <Image src={editorialImages.pasikudahDusk} alt="" fill sizes="100vw" quality={80} className="object-cover object-[50%_45%]" />
          </div>
        </div>

        <p className="cine-mega cine-mega-low" style={{ ["--len" as string]: t("descentMega").length }} data-layer data-y="-2vh,2vh" data-scale="1,1.03" aria-hidden="true">{t("descentMega")}</p>

        <div className="cine-cloud cine-cloud-l" data-layer data-at="0,0.45" data-x="-35vw,-62vw" data-scale="1,1.15" aria-hidden="true" />
        <div className="cine-cloud cine-cloud-r" data-layer data-at="0,0.45" data-x="35vw,62vw" data-scale="1,1.15" aria-hidden="true" />
        <div className="cine-cloud cine-cloud-c" data-layer data-at="0,0.35" data-scale="1,1.1" data-opacity="0.25,0" aria-hidden="true" />

        <div className="cine-compose cine-compose-descent">
          <div className="cine-copy cine-copy-light" data-copy>
            <p className="cine-eyebrow" data-cue="before">{t("descentLabel")}</p>
            <CinematicHeading id="cine-descent-title" className="cine-title">{t("descentTitle")}</CinematicHeading>
            <p className="cine-text" data-cue="after">{t("descentText")}</p>
            <Link href="/tailor-made-tours" className="cine-cta cine-cta-light" data-cue="after">{t("descentCta")}</Link>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
