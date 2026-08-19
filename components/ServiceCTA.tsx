import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

export function ServiceCTA({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={whatsappLink(
          `Hi ${site.brandName}, I'm interested in "${service.title}". Could you share more details?`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#1F9E4E]/40 hover:text-[#1F9E4E] transition-colors"
      >
        <MessageCircle className="size-4.5" strokeWidth={1.75} />
        Contact Us
      </a>
      <Link
        href={`/apply-now?service=${service.slug}`}
        className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand)]/20 hover:bg-[var(--color-brand-dark)] transition-colors"
      >
        Buy Now
        <ArrowRight className="size-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
