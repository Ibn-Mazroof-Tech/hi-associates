import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { services, getServiceBySlug, processSteps } from "@/data/services";
import { ServiceIcon } from "@/components/service-icons";
import { ServiceCTA } from "@/components/ServiceCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ServiceCard } from "@/components/ServiceCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-16 lg:pb-0">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-line)] bg-[var(--color-sky)]">
        <div className="container-page flex items-center gap-1.5 py-4 text-xs text-[var(--color-slate)]">
          <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Home</Link>
          <ChevronRight className="size-3.5" strokeWidth={2} />
          <Link href="/services" className="hover:text-[var(--color-brand)] transition-colors">Our Services</Link>
          <ChevronRight className="size-3.5" strokeWidth={2} />
          <span className="text-[var(--color-ink)]">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container-page grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <span className="flex size-14 items-center justify-center rounded-2xl bg-[var(--color-sky)] text-[var(--color-brand)]">
            <ServiceIcon name={service.icon} className="size-7" />
          </span>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-slate)]">
            {service.fullDesc}
          </p>
          <ServiceCTA service={service} className="mt-8" />
        </div>

        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--color-brand)]">
            <Clock className="size-4" strokeWidth={2} />
            Processing Time
          </div>
          <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
            {service.processingTime}
          </p>
          <div className="mt-5 border-t border-dashed border-[var(--color-line)] pt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-slate)]/70">
              Documents Required
            </p>
            <ul className="mt-3 space-y-2.5">
              {service.documentsRequired.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-[var(--color-ink)]/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#1F9E4E]" strokeWidth={1.75} />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.isGazette && (
        <section className="container-page pb-4">
          <div className="rounded-2xl border border-[var(--color-seal)]/30 bg-[var(--color-seal-light)] p-5 text-sm leading-relaxed text-[var(--color-ink)]">
            <strong className="font-semibold">Note:</strong> When you click Apply Now for this
            service, the application form will ask for your old name, new name, and the reason
            for the change, instead of the usual first/last name fields.
          </div>
        </section>
      )}

      {service.note && (
        <section className="container-page pb-4">
          <div className="rounded-2xl border border-[var(--color-seal)]/30 bg-[var(--color-seal-light)] p-5 text-sm leading-relaxed text-[var(--color-ink)]">
            <strong className="font-semibold">Note:</strong> {service.note}
          </div>
        </section>
      )}

      {/* Process */}
      <section className="bg-[var(--color-sky)] py-14 sm:py-16">
        <div className="container-page">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
            How it works
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-brand)]/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[15px] font-semibold text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate)]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      <section className="container-page py-14 sm:py-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          You might also need
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <StickyMobileCTA service={service} />
    </div>
  );
}
