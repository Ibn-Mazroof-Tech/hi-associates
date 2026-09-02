import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.brandName} — call, email, or message us on WhatsApp.`,
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: site.whatsappDisplay,
    href: whatsappLink(`Hi ${site.brandName}, I have a question.`),
    accent: "#1F9E4E",
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    value: site.landline,
    href: `tel:${site.landline}`,
    accent: "var(--color-brand)",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: site.email,
    href: `mailto:${site.email}`,
    accent: "var(--color-brand)",
  },
];

export default function ContactUsPage() {
  return (
    <div className="pb-16">
      <section className="relative isolate overflow-hidden bg-[var(--color-ink)] py-16 sm:py-20">
        {/* Background image — path is set in data/site.ts (images.contactHero) */}
        <Image
          src={site.images.contactHero}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[var(--color-ink)]/60" aria-hidden />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent"
          aria-hidden
        />

        <div className="container-page relative max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            Contact Us
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            We&apos;re here to help
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/80">
            Have a question before you apply, or want an update on an existing application?
            Reach us through any of the channels below.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-brand)]/40"
            >
              <span
                className="flex size-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `color-mix(in srgb, ${method.accent} 12%, white)`, color: method.accent }}
              >
                <method.icon className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--color-ink)]">
                {method.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-slate)] break-all">{method.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-sky)] text-[var(--color-brand)]">
              <MapPin className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--color-ink)]">
              Office Address
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-slate)]">{site.address}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-sky)] text-[var(--color-brand)]">
              <Clock className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--color-ink)]">
              Working Hours
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-slate)]">
              Every day, 10:00 AM – 10:00 PM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
