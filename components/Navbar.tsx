"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, ScrollText } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/about-us", label: "About Us" },
  { href: "/policies", label: "Policies" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/95 backdrop-blur border-b border-[var(--color-line)]">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
            <ScrollText className="size-4.5" strokeWidth={2} />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] leading-tight">
            {site.brandName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-brand)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[#1F9E4E] hover:bg-[#1F9E4E]/10 transition-colors"
          >
            <MessageCircle className="size-5" strokeWidth={1.75} />
          </a>
          <Link
            href="/apply-now"
            className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden flex size-10 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-sky)] transition-colors"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-[var(--color-line)] transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-sky)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-line)] py-2.5 text-sm font-medium text-[#1F9E4E]"
            >
              <MessageCircle className="size-4.5" strokeWidth={1.75} />
              WhatsApp
            </a>
            <Link
              href="/apply-now"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center rounded-full bg-[var(--color-brand)] py-2.5 text-sm font-semibold text-white"
            >
              Apply Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
