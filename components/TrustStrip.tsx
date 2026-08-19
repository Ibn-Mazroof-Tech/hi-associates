import { site } from "@/data/site";

export function TrustStrip() {
  return (
    <div className="border-y border-[var(--color-line)] bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {site.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[var(--color-slate)] sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
