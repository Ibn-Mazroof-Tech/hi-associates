"use client";

import { useState } from "react";
import Script from "next/script";
import { CheckCircle2, Loader2, AlertTriangle, MessageCircle, IndianRupee } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type FormState = {
  name: string;
  mobile: string;
  email: string;
  reference: string;
  amount: string;
};

const emptyForm: FormState = { name: "", mobile: "", email: "", reference: "", amount: "" };

type Status = "idle" | "processing" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-slate)]/50 focus:border-[var(--color-brand)] outline-none transition-colors";
const labelClasses = "mb-1.5 block text-sm font-medium text-[var(--color-ink)]";
const errorClasses = "mt-1.5 text-xs font-medium text-red-600";

export function PaymentForm() {
  const [scriptReady, setScriptReady] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [paymentId, setPaymentId] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\d{10}$/.test(form.mobile.trim())) {
      next.mobile = "Please enter a valid 10-digit mobile number.";
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    const amt = Number(form.amount);
    if (!amt || amt < 1) next.amount = "Please enter a valid amount.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handlePay() {
    if (!validate()) return;

    if (!scriptReady) {
      setStatus("error");
      return;
    }

    setStatus("processing");

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: form.amount,
          notes: {
            name: form.name,
            mobile: form.mobile,
            email: form.email,
            reference: form.reference,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || "Could not start payment.");
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: site.brandName,
        description: form.reference ? `Payment · Ref: ${form.reference}` : "Payment",
        prefill: { name: form.name, contact: form.mobile, email: form.email },
        theme: { color: "#1657b0" },
        handler: (response: { razorpay_payment_id: string }) => {
          setPaymentId(response.razorpay_payment_id);
          setStatus("success");
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      rzp.open();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      {status === "success" ? (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#1F9E4E]/10 text-[#1F9E4E]">
            <CheckCircle2 className="size-7" strokeWidth={1.75} />
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
            Payment successful
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">
            Thank you — we&apos;ve received your payment. Please save this Payment ID for your
            records.
          </p>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-lg font-semibold text-[var(--color-ink)]">
            {paymentId}
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setStatus("idle");
            }}
            className="mt-6 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
          >
            Make another payment
          </button>
        </div>
      ) : status === "error" ? (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <AlertTriangle className="size-7" strokeWidth={1.75} />
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
            Couldn&apos;t start payment
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">
            Something went wrong. Please try again, or message us on WhatsApp and we&apos;ll help
            you complete the payment another way.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              Try Again
            </button>
            <a
              href={whatsappLink(`Hi ${site.brandName}, I'm trying to make a payment of ₹${form.amount} but ran into an issue on the website.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#1F9E4E]/40 hover:text-[#1F9E4E] transition-colors"
            >
              <MessageCircle className="size-4" strokeWidth={1.75} />
              Message on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ravi Kumar"
                className={inputClasses}
              />
              {errors.name && <p className={errorClasses}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="mobile" className={labelClasses}>
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                className={inputClasses}
              />
              {errors.mobile && <p className={errorClasses}>{errors.mobile}</p>}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email <span className="font-normal text-[var(--color-slate)]">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClasses}
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="reference" className={labelClasses}>
                Ticket ID / Reference{" "}
                <span className="font-normal text-[var(--color-slate)]">(optional)</span>
              </label>
              <input
                id="reference"
                type="text"
                value={form.reference}
                onChange={(e) => update("reference", e.target.value)}
                placeholder="e.g. 202608250001"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="amount" className={labelClasses}>
              Amount to Pay (₹)
            </label>
            <div className="relative">
              <IndianRupee
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-slate)]"
                strokeWidth={1.75}
              />
              <input
                id="amount"
                type="number"
                min="1"
                inputMode="decimal"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                placeholder="1000"
                className={cn(inputClasses, "pl-10")}
              />
            </div>
            {errors.amount && <p className={errorClasses}>{errors.amount}</p>}
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={status === "processing"}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {status === "processing" ? (
              <>
                Starting payment…
                <Loader2 className="size-4 animate-spin" strokeWidth={2} />
              </>
            ) : (
              "Proceed to Pay"
            )}
          </button>
          <p className="mt-3 text-xs text-[var(--color-slate)]">
            You&apos;ll be redirected to Razorpay&apos;s secure checkout to complete your payment.
          </p>
        </div>
      )}
    </>
  );
}
