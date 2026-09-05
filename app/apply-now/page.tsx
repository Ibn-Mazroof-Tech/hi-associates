import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/ApplyForm";
import { site } from "@/data/site";

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
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Ready for Your Next Step? We&apos;re Excited to Meet You.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          Choose your service and fill in a few details. A ₹{site.applyNowRegistrationFee}{" "}
          registration fee applies for every service — once paid, we&apos;ll reach out on
          WhatsApp with the next steps.
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
