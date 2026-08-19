import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--color-brand)]">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">
        The page you&apos;re looking for may have moved. Try heading back to the homepage or
        browse our services.
      </p>
      <div className="mt-7 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-brand)] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          Our Services
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
