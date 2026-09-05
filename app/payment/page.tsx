import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PaymentForm } from "@/components/PaymentForm";

export const metadata: Metadata = {
  title: "Make a Payment",
  description: "Securely pay your consultancy fee via Razorpay.",
};

export default function PaymentPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-sky)] px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
          <ShieldCheck className="size-3.5" strokeWidth={2} />
          Secure Payment
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          PAY NOW
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          Enter your Ticket ID and the amount quoted to you, and proceed to pay securely via
          Razorpay.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <PaymentForm />
      </div>
    </div>
  );
}
