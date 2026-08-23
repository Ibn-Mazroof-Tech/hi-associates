"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Copy, Check, Camera, ShieldCheck, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { getServiceBySlug } from "@/data/services";

export function ApplicationSubmitted() {
  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket") ?? "";
  const serviceSlug = searchParams.get("service") ?? "";
  const service = getServiceBySlug(serviceSlug);
  const [copied, setCopied] = useState(false);

  async function copyTicket() {
    try {
      await navigator.clipboard.writeText(ticket);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can still select/copy manually.
    }
  }

  return (
    <div className="container-page flex flex-col items-center py-14 sm:py-20">
      <span className="flex size-14 items-center justify-center rounded-full bg-[#1F9E4E]/10 text-[#1F9E4E]">
        <ShieldCheck className="size-7" strokeWidth={1.75} />
      </span>

      <h1 className="mt-5 text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
        Application submitted successfully
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-relaxed text-[var(--color-slate)]">
        {service ? (
          <>
            We&apos;ve received your <strong className="text-[var(--color-ink)]">{service.title}</strong>{" "}
            application. Save your Ticket ID below — our team will use it to look up your
            details when you get in touch.
          </>
        ) : (
          "We've received your application. Save your Ticket ID below — our team will use it to look up your details when you get in touch."
        )}
      </p>

      {/* Ticket card */}
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(11,37,69,0.25)]">
        <p className="text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-[var(--color-slate)]/70">
          Your Ticket ID
        </p>
        <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-2xl font-semibold tracking-wider text-[var(--color-ink)] sm:text-3xl">
          {ticket || "—"}
        </p>
        <button
          type="button"
          onClick={copyTicket}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-4" strokeWidth={2} />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" strokeWidth={1.75} />
              Copy Ticket ID
            </>
          )}
        </button>
      </div>

      {/* Screenshot guidance */}
      <div className="mt-6 flex w-full max-w-sm items-start gap-3 rounded-2xl border border-[var(--color-seal)]/30 bg-[var(--color-seal-light)] p-4 text-left">
        <Camera className="mt-0.5 size-5 shrink-0 text-[var(--color-seal)]" strokeWidth={1.75} />
        <p className="text-sm leading-relaxed text-[var(--color-ink)]">
          <strong className="font-semibold">Please take a screenshot of this page</strong> before
          you leave. You&apos;ll need your Ticket ID to check your application status with us —
          we won&apos;t be able to look it up without it.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappLink(`Hi ${site.brandName}, my Ticket ID is ${ticket}. I have a question about my application.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#1F9E4E]/40 hover:text-[#1F9E4E] transition-colors"
        >
          <MessageCircle className="size-4" strokeWidth={1.75} />
          Message on WhatsApp
        </a>
        <Link
          href="/"
          className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
