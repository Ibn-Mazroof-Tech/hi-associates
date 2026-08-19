import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { services } from "@/data/services";
import { site, whatsappLink } from "@/data/site";

const faqs: FAQItem[] = [
  {
    question: "Is this process fully online?",
    answer:
      "Yes. You fill the form and share documents online — over WhatsApp or email. There's no need to visit an office for most services.",
  },
  {
    question: "How do I know what documents I need?",
    answer:
      "Every service page lists the exact documents required. If you're unsure, message us on WhatsApp and we'll confirm what applies to your case.",
  },
  {
    question: "How will I know the status of my application?",
    answer:
      "Our team shares regular updates on WhatsApp or call, from document verification through to final delivery.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes, all documents and personal details you share with us are kept strictly confidential and used only for processing your application.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <section id="services" className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services we handle for you"
          description="Pick the service you need — every page lists the exact documents required and how long it takes."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-sky)] py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple, 5-step process"
            description="From form to final certificate — here's exactly what happens after you apply."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading eyebrow="Why Us" title="Why people trust us with their paperwork" />
        <div className="mt-12">
          <WhyChooseUs />
        </div>
      </section>

      <section className="bg-[var(--color-sky)] py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Still have a question? Message us on WhatsApp — we usually reply within the hour."
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-[var(--color-ink)] px-6 py-12 text-center sm:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
            Need help choosing the right service?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/65">
            Talk to our team — we&apos;ll tell you exactly what you need and how long it will take.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#1F9E4E] px-6 py-3.5 text-sm font-semibold text-white hover:brightness-110 transition-[filter]"
            >
              <MessageCircle className="size-4.5" strokeWidth={1.75} />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.landline}`}
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="size-4.5" strokeWidth={1.75} />
              Call Now
            </a>
            <Link
              href="/apply-now"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:bg-white/90 transition-colors"
            >
              Apply Now
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
