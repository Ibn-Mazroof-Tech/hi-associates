import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
      {/* Background image — path is set in data/site.ts (images.homeHero) */}
      <Image
        src={site.images.homeHero}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Base scrim — keeps text legible at every breakpoint */}
      <div className="absolute inset-0 -z-10 bg-[var(--color-ink)]/55" aria-hidden />
      {/* Extra left-side gradient — stronger contrast behind the text on
          wide screens, while keeping the documents visible on the right */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/75 to-transparent sm:via-[var(--color-ink)]/55"
        aria-hidden
      />

      <div className="container-page relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-xs font-medium text-white backdrop-blur-sm">
            <ShieldCheck className="size-3.5" strokeWidth={2} />
            100% Online · Pan India Service
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            Government paperwork,
            <br />
            handled for you —
            <span className="text-[var(--color-seal)]"> start to finish.</span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/80 sm:text-base">
            From Gazette name change to GST, MSME, and trademark registration — we manage the
            forms, the documents, and the follow-up, so you never have to stand in a queue.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/apply-now"
              className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              Get Quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a
              href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="size-4.5" strokeWidth={1.75} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
