// Server-rendered JSON-LD block. Accepts one schema object or several (emitted as an array).
import { serializeJsonLd } from "@/lib/seo";

export default function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
