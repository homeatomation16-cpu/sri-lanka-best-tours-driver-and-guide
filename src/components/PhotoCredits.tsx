import { getTranslations } from "next-intl/server";
import credits from "../../public/images/editorial/credits.json";

type Credit = { file: string; photographer?: string; source: string; license: string; licenseUrl?: string };

/**
 * Attribution required by the CC BY / CC BY-SA homepage photos
 * (Wikimedia Commons). Unsplash photos are listed too, as a courtesy.
 * Rendered as a closed <details> so it costs nothing visually.
 */
export default async function PhotoCredits() {
  const t = await getTranslations("photoCredits");
  const list = (credits as Credit[]).filter((c) => c.photographer);
  return (
    <details className="photo-credits">
      <summary>{t("summary")}</summary>
      <ul>
        {list.map((c) => {
          const cc = c.license.startsWith("CC");
          return (
            <li key={c.file}>
              <a href={c.source} target="_blank" rel="noopener noreferrer">{c.photographer}</a>
              {" — "}
              {cc && c.licenseUrl ? (
                <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">{c.license}</a>
              ) : (
                <a href={c.license} target="_blank" rel="noopener noreferrer">Unsplash License</a>
              )}
              {cc ? `, ${t("resized")}` : ""}
            </li>
          );
        })}
      </ul>
    </details>
  );
}
