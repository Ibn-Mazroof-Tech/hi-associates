import { processSteps } from "@/data/services";

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative pl-1">
          <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-brand)]/15">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
            {step.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate)]">
            {step.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}
