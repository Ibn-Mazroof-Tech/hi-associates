import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ServiceIcon } from "./service-icons";
import type { Service } from "@/data/services";

export function ServiceCard({
  service,
  index,
  showIndex = true,
}: {
  service: Service;
  index: number;
  showIndex?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-brand)]/40 hover:shadow-[0_16px_40px_-16px_rgba(11,37,69,0.25)] motion-reduce:hover:translate-y-0"
    >
      {showIndex && (
        <span className="font-[family-name:var(--font-mono)] absolute right-5 top-5 text-[11px] text-[var(--color-slate)]/50">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-sky)] text-[var(--color-brand)] group-hover:bg-[var(--color-brand)] group-hover:text-white transition-colors">
        <ServiceIcon name={service.icon} className="size-6" />
      </span>

      <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
        {service.shortDesc}
      </p>

      <div className="mt-4 flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate)]/80">
        <Clock className="size-3.5" strokeWidth={1.75} />
        {service.processingTime.split("·")[0].split("(")[0].trim()}
      </div>

      <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
        View Details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" strokeWidth={2} />
      </span>
    </Link>
  );
}
