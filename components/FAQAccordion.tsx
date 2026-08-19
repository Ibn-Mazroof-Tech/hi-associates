"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6"
            >
              <span className="font-[family-name:var(--font-display)] text-[15px] font-medium text-[var(--color-ink)]">
                {item.question}
              </span>
              <Plus
                className={cn(
                  "size-4.5 shrink-0 text-[var(--color-brand)] transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
                strokeWidth={2}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4.5 text-sm leading-relaxed text-[var(--color-slate)] sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
