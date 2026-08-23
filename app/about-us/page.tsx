import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Users, Clock3, MapPinned, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { TeamSection } from "@/components/TeamSection";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${site.brandName} and how we help you complete government paperwork online.`,
};

const values = [
  {
    icon: ShieldCheck,
    title: "Trust, first",
    desc: "Every document you share stays confidential and is used only to process your application.",
  },
  {
    icon: Users,
    title: "Real people, not a ticket queue",
    desc: "A dedicated team reviews your case personally — you're never just a case number.",
  },
  {
    icon: Clock3,
    title: "We track deadlines for you",
    desc: "From filing to follow-up, we keep your application moving so nothing sits idle.",
  },
  {
    icon: MapPinned,
    title: "Built for all of India",
    desc: "Wherever you are, our online process means you never need to visit a government office in person.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="pb-16">
      <section className="bg-[var(--color-sky)] py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
            About Us
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
            Your paperwork, our responsibility
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-slate)]">
            {site.brandName} is an online documentation and compliance service, helping individuals and
            small businesses complete government registrations, certificates, and filings —
            without the queues, the confusion, or the back-and-forth office visits. What used
            to take weeks of running between departments now happens from your phone.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          What we stand for
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <v.icon className="size-6 text-[var(--color-brand)]" strokeWidth={1.75} />
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--color-ink)]">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate)]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-sky)] py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Our Team
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
              The people behind your paperwork
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
              A small, dedicated team that reviews every application personally — from the
              first document you share to the final certificate in your hands. No call
              centres, no case numbers, just people who know your file.
            </p>
          </div>
          <div className="mt-10">
            <TeamSection />
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-[var(--color-ink)] px-6 py-12 text-center sm:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <Link
            href="/services"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:bg-white/90 transition-colors"
          >
            Browse our services
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
