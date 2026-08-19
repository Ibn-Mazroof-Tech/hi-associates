import { UserCheck, Wallet, Headset, Lock, Timer } from "lucide-react";

const points = [
  { icon: UserCheck, title: "Expert Guidance", desc: "Handled by professionals who know the process inside out." },
  { icon: Wallet, title: "Transparent Pricing", desc: "No hidden charges — you know the cost before you start." },
  { icon: Headset, title: "Dedicated Support", desc: "Reach us on WhatsApp or call, whenever you need an update." },
  { icon: Lock, title: "100% Confidential", desc: "Your documents and details stay secure with us." },
  { icon: Timer, title: "On-Time Delivery", desc: "We track every application until it's in your hands." },
];

export function WhyChooseUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {points.map((point) => (
        <div
          key={point.title}
          className="rounded-2xl border border-[var(--color-line)] bg-white p-5"
        >
          <point.icon className="size-6 text-[var(--color-brand)]" strokeWidth={1.75} />
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[15px] font-semibold text-[var(--color-ink)]">
            {point.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-slate)]">
            {point.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
