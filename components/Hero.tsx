import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-sky)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-[var(--color-brand)]/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-[var(--color-seal)]/[0.08]"
      />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/25 bg-white px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--color-brand)]">
            <ShieldCheck className="size-3.5" strokeWidth={2} />
            100% Online · Pan India Service
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem]">
            Government paperwork,
            <br />
            handled for you —
            <span className="text-[var(--color-brand)]"> start to finish.</span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-slate)] sm:text-base">
            From Gazette name change to GST, MSME, and trademark registration — we manage the
            forms, the documents, and the follow-up, so you never have to stand in a queue.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/apply-now"
              className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand)]/20 hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              Apply Now
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a
              href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#1F9E4E]/40 hover:text-[#1F9E4E] transition-colors"
            >
              <MessageCircle className="size-4.5" strokeWidth={1.75} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {site.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-slate)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signature element: a stylised "application receipt" card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-white/60" aria-hidden />
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_30px_70px_-24px_rgba(11,37,69,0.3)]">
            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-line)] pb-4">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-slate)]/70">
                  Application Receipt
                </p>
                <p className="font-[family-name:var(--font-mono)] mt-1 text-sm font-medium text-[var(--color-ink)]">
                  No. NSK-2026-08214
                </p>
              </div>
              <span className="seal-ring flex size-14 items-center justify-center text-[var(--color-seal)]">
                <ShieldCheck className="size-6" strokeWidth={1.5} />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-slate)]">Service</span>
                <span className="font-medium text-[var(--color-ink)]">GST Registration</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-slate)]">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-sky)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand)]">
                  <span className="size-1.5 rounded-full bg-[var(--color-brand)]" />
                  In Process
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-slate)]">Est. Time</span>
                <span className="font-medium text-[var(--color-ink)]">3–7 working days</span>
              </div>
            </div>

            <div className="mt-5 space-y-2 border-t border-dashed border-[var(--color-line)] pt-4">
              {["Documents verified", "Application filed"].map((step) => (
                <div key={step} className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
                  <CheckCircle2 className="size-3.5 text-[#1F9E4E]" strokeWidth={2} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
