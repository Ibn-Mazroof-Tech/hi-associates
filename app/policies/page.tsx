import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Policies",
  description: "Privacy Policy, Terms & Conditions, Refund Policy, and Disclaimer.",
};

const sections = [
  { id: "privacy-policy", title: "Privacy Policy" },
  { id: "terms-conditions", title: "Terms & Conditions" },
  { id: "refund-policy", title: "Refund Policy" },
  { id: "disclaimer", title: "Disclaimer" },
];

export default function PoliciesPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
          Policies
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Our policies
        </h1>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-[var(--color-line)] text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block -ml-px border-l-2 border-transparent py-2 pl-4 text-[var(--color-slate)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14 max-w-2xl">
          <section id="privacy-policy" className="scroll-mt-24">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              Privacy Policy
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-slate)]">
              <p className="font-medium text-[var(--color-ink)]">
                Effective Date: 1st January, 2025
              </p>
              <p>
                {site.brandName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your
                privacy. This Privacy Policy explains how we collect, use, and protect your
                information when you visit our website{" "}
                <a href={site.website} className="font-medium text-[var(--color-brand)]">
                  {site.website}
                </a>
                .
              </p>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Information We Collect
              </h3>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  Personal information you provide (such as name, email, phone number) when
                  you contact us or sign up for services.
                </li>
                <li>
                  Non-personal information (such as browser type, IP address, pages visited)
                  collected automatically through cookies or analytics tools.
                </li>
              </ul>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                How We Use Information
              </h3>
              <p>We may use the information we collect to:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Provide, operate, and improve our website and services.</li>
                <li>Respond to inquiries or customer support requests.</li>
                <li>Send updates, offers, or marketing communications (you can opt out anytime).</li>
                <li>Analyze website traffic and usage patterns.</li>
              </ul>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Sharing of Information
              </h3>
              <p>
                We do not sell, rent, or trade your personal information. We may share data
                only with trusted third parties who help us operate our website, comply with
                legal requirements, or protect our rights.
              </p>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Cookies
              </h3>
              <p>
                Our website may use cookies to enhance your browsing experience. You can
                adjust your browser settings to refuse cookies, but some features may not
                function properly.
              </p>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Data Security
              </h3>
              <p>
                We implement reasonable measures to protect your personal information.
                However, no method of transmission over the Internet is completely secure.
              </p>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Your Rights
              </h3>
              <p>
                You may request access, correction, or deletion of your personal data by
                contacting us at{" "}
                <a href={`${site.website}/contact-us`} className="font-medium text-[var(--color-brand)]">
                  {site.website}/contact-us
                </a>
                .
              </p>

              <h3 className="pt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                Updates to This Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted
                on this page with the updated effective date.
              </p>
            </div>
          </section>

          <section id="terms-conditions" className="scroll-mt-24">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              Terms &amp; Conditions
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-slate)]">
              <p>
                By using {site.brandName}, you agree to provide accurate and complete
                information for the service you are applying for. Delays or rejections caused
                by incorrect or incomplete information provided by you are not our
                responsibility.
              </p>
              <p>
                We act as a facilitator between you and the relevant government department or
                authority. Final approval of any application rests entirely with that
                department, and processing times mentioned on this website are estimates
                based on typical turnaround, not guarantees.
              </p>
              <p>
                Service fees, once communicated and agreed upon, cover our facilitation and
                filing service. Government fees, if applicable, are separate and payable as
                per the relevant department&apos;s rules.
              </p>
              <p>
                We reserve the right to decline any application that appears fraudulent,
                incomplete, or in violation of applicable law.
              </p>
            </div>
          </section>

          <section id="refund-policy" className="scroll-mt-24">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              Refund Policy
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-slate)]">
              <p>
                If we are unable to begin processing your application due to reasons on our
                end, you are entitled to a full refund of our service fee.
              </p>
              <p>
                Once your application has been filed with the concerned government department,
                our service fee is non-refundable, as work has already been completed on your
                behalf. Government fees paid to a department are subject to that
                department&apos;s own refund rules and are outside our control.
              </p>
              <p>
                If you believe you are eligible for a refund, please contact us at{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-[var(--color-brand)]">
                  {site.email}
                </a>{" "}
                with your application details, and we will review your request within 5
                working days.
              </p>
            </div>
          </section>

          <section id="disclaimer" className="scroll-mt-24">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              Disclaimer
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-slate)]">
              <p>
                {site.brandName} is a private service facilitator and is not a government
                department or agency. We assist with the preparation and filing of
                applications on your behalf; we do not control approval timelines or outcomes,
                which rest solely with the relevant government authority.
              </p>
              <p>
                Processing times, fees, and document requirements listed on this website are
                indicative and may change based on government rules in effect at the time of
                your application.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
