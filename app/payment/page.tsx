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
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--color-sky)] text-[var(--color-brand)]">
          <ShieldCheck className="size-6" strokeWidth={1.75} />
        </span>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]">
          Secure Payment
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Make a Payment
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          Enter your details and the amount quoted to you, and proceed to pay securely via
          Razorpay. If you have a Ticket ID from a previous application, add it as a reference
          so we can match your payment.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <PaymentForm />
      </div>
    </div>
  );
}
