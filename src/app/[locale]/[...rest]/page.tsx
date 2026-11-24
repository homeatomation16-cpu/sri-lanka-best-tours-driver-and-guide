import { notFound } from "next/navigation";

// Any URL that matches no page renders the localized 404 below (with the site header and footer)
// instead of the bare framework 404.
export default function CatchAll() {
  notFound();
}
