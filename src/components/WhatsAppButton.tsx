"use client";

// Floating WhatsApp chat button (bottom-left, so it doesn't collide with the language/currency buttons on the right).
// The number comes from Admin → Site settings.
import { FaWhatsapp } from "react-icons/fa6";
import { useContact } from "@/components/ContactProvider";

export default function WhatsAppButton() {
  const contact = useContact();
  if (!contact.whatsappme) return null;

  return (
    <a
      href={contact.whatsappme}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp ${contact.whatsapp}`}
      title="Chat on WhatsApp"
      className="group fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-110 active:scale-95 max-sm:bottom-[calc(12px+env(safe-area-inset-bottom))] max-sm:left-3 max-sm:h-12 max-sm:w-12"
    >
      {/* soft pulse ring to draw the eye */}
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <FaWhatsapp className="relative h-7 w-7 max-sm:h-6 max-sm:w-6" aria-hidden />
    </a>
  );
}
