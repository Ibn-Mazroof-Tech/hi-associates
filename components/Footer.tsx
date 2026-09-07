import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./social-icons";
import { site } from "@/data/site";
import { services } from "@/data/services";

const policyLinks = [
  { href: "/policies#privacy-policy", label: "Privacy Policy" },
  { href: "/policies#terms-conditions", label: "Terms & Conditions" },
  { href: "/policies#refund-policy", label: "Refund Policy" },
  { href: "/policies#disclaimer", label: "Disclaimer" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white p-2">
              <img src={site.images.logo} className="size-full object-contain" alt={site.brandName} />
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              {site.brandName}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            {site.legalLine}. We handle your government paperwork end-to-end — online,
            transparent, and on time.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={site.social.facebook} aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-[var(--color-seal)] hover:text-[var(--color-seal)] transition-colors">
              <FacebookIcon className="size-4" />
            </a>
            <a href={site.social.instagram} aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-[var(--color-seal)] hover:text-[var(--color-seal)] transition-colors">
              <InstagramIcon className="size-4" />
            </a>
            <a href={site.social.linkedin} aria-label="LinkedIn" className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-[var(--color-seal)] hover:text-[var(--color-seal)] transition-colors">
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/apply-now" className="hover:text-white transition-colors">Apply Now</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Policies</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {policyLinks.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-white transition-colors">{p.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/45">Popular Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 3).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Contact Us</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="size-4 shrink-0 mt-0.5 text-[var(--color-seal)]" strokeWidth={1.75} />
              <a href={`tel:${site.landline}`} className="hover:text-white transition-colors">{site.landline}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="size-4 shrink-0 mt-0.5 text-[var(--color-seal)]" strokeWidth={1.75} />
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors break-all">{site.email}</a>
            </li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/15">
            <iframe
              title="Office location map"
              src={`https://maps.google.com/maps?q=${site.mapCoordinates.lat},${site.mapCoordinates.lng}&z=17&output=embed`}
              className="h-32 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col-reverse items-center gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
          <p>{site.legalLine}</p>
        </div>
      </div>
    </footer>
  );
}
