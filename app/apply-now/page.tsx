import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply Now",
  description: "Fill in your details and choose a service — we'll take it from there.",
};

export default async function ApplyNowPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
          Apply Now
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Let&apos;s get your paperwork started
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          Choose your service and fill in a few details. We&apos;ll reach out on WhatsApp
          with the next steps.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <Suspense fallback={null}>
          <ApplyForm initialServiceSlug={service} />
        </Suspense>
      </div>
    </div>
  );
}
