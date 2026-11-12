import { MapPin, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function LocationBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`location-grid ${compact ? "" : "section-wrap"}`}>
      <div className="overflow-hidden bg-[#eee7d3]">
        <iframe
          className="map-frame"
          title="Map showing Tina Bakers in Meru, Kenya"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=0.0412883,37.6542907&z=15&output=embed"
        />
      </div>
      <div className="flex flex-col justify-center py-2">
        <p className="eyebrow">Come say hello</p>
        <h2 className="section-heading mt-2 text-3xl sm:text-4xl">
          A little Meru warmth, straight from our oven.
        </h2>
        <p className="mt-3 flex items-start gap-2 text-sm text-[#746b70]">
          <MapPin className="mt-1 shrink-0 text-caramel" size={18} /> Meru,
          Kenya 60200
        </p>
        <table className="hours-table mt-4 text-sm" aria-label="Opening hours">
          <thead className="sr-only">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday – Saturday</td>
              <td>8:00 AM – 6:30 PM</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>Closed</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-5 text-sm">Walk in or order ahead via WhatsApp:</p>
        <a
          href={whatsappUrl()}
          className="mt-2 inline-flex w-fit items-center gap-2 font-bold text-plum underline decoration-caramel underline-offset-4"
        >
          <MessageCircle size={18} />
          0790 187 080
        </a>
      </div>
    </div>
  );
}
