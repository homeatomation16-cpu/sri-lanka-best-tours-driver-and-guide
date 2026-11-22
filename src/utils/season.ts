// Sri Lanka tour seasons, as on the live site:
// Down South November – June, East Coast July – October (month in Sri Lanka time).
export function getSeason(date = new Date()) {
  const month = Number(new Intl.DateTimeFormat("en", { month: "numeric", timeZone: "Asia/Colombo" }).format(date));
  const isEastCoastSeason = month >= 7 && month <= 10;
  return {
    isEastCoastSeason,
    inSeason: isEastCoastSeason ? "east-coast-tours" : "down-south-tours",
    offSeason: isEastCoastSeason ? "down-south-tours" : "east-coast-tours",
  };
}
