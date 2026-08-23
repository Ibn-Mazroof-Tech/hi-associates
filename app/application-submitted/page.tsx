import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationSubmitted } from "@/components/ApplicationSubmitted";

export const metadata: Metadata = {
  title: "Application Submitted",
  robots: { index: false, follow: false },
};

export default function ApplicationSubmittedPage() {
  return (
    <Suspense fallback={null}>
      <ApplicationSubmitted />
    </Suspense>
  );
}
