import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import type { Service } from "@/data/services";

export function StickyMobileCTA({ service }: { service: Service }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[var(--color-line)] bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
      <a
        href={whatsappLink(
          `Hi ${site.brandName}, I'm interested in "${service.title}". Could you share more details?`
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[#1F9E4E]"
      >
        <MessageCircle className="size-5" strokeWidth={1.75} />
      </a>
      <Link
        href={`/apply-now?service=${service.slug}`}
        className="flex flex-1 items-center justify-center rounded-full bg-[var(--color-brand)] py-3 text-sm font-semibold text-white"
      >
        Apply Now
      </Link>
    </div>
  );
}
