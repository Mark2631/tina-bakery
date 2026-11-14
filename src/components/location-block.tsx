import { MapPin, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function LocationBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`location-grid ${compact ? "" : "section-wrap"}`}>
      <div className="overflow-hidden bg-[#eee7d3]">
        <iframe
          className="map-frame"
          title="Search map for Tina Bakers in Meru, Kenya"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=Tina%20Bakers%2C%20Meru%2C%20Kenya&z=15&output=embed"
        />
      </div>
      <div className="flex flex-col justify-center py-2">
        <p className="eyebrow">Find Tina Bakers</p>
        <h2 className="section-heading mt-2 text-3xl sm:text-4xl">
          A local bakery in Meru.
        </h2>
        <p className="mt-3 flex items-start gap-2 text-sm text-[#746b70]">
          <MapPin className="mt-1 shrink-0 text-caramel" size={18} />
          Meru, Kenya 60200
        </p>
        <div className="mt-5 border-l-2 border-gold bg-[#F2EBE2] px-4 py-3">
          <strong className="text-sm text-plum">Planning a visit?</strong>
          <p className="mt-1 text-sm text-[#746b70]">
            Message the bakery first to confirm today’s opening hours, collection availability and the best way to find us.
          </p>
        </div>
        <p className="mt-5 text-sm">For an order or directions, speak to the bakery directly:</p>
        <a
          href={whatsappUrl()}
          className="mt-2 inline-flex w-fit items-center gap-2 font-bold text-plum underline decoration-caramel underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          WhatsApp · 0790 187 080
        </a>
      </div>
    </div>
  );
}
