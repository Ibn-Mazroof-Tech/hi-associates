import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

export function TopBar() {
  return (
    <div className="hidden sm:block bg-[var(--color-ink)] text-white/90">
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="size-3.5" strokeWidth={1.75} />
            {site.email}
          </a>
          <a
            href={`tel:${site.landline}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="size-3.5" strokeWidth={1.75} />
            {site.landline}
          </a>
        </div>
        <p className="tracking-wide text-white/70">{site.legalLine}</p>
      </div>
    </div>
  );
}
