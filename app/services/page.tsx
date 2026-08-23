import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";
import { site, whatsappLink } from "@/data/site";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Browse all services we handle — Gazette Notification, GST, Income Tax, MSME, Trademark, FSSAI, and more.",
};

export default function ServicesPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
          Our Services
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Every service, handled online
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          Tap any service to see the documents required, processing time, and how to apply.
          Not sure which one you need?{" "}
          <a
            href={whatsappLink(`Hi ${site.brandName}, I'm not sure which service I need — can you help?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--color-brand)]"
          >
            Ask us on WhatsApp
            <MessageCircle className="size-3.5" strokeWidth={2} />
          </a>
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    </div>
  );
}
