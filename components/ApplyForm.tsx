"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, AlertTriangle, MessageCircle } from "lucide-react";
import {
  serviceCategories,
  getServiceBySlug,
  getCategoryForSlug,
  type GazetteReason,
} from "@/data/services";
import { site, whatsappLink } from "@/data/site";
import { generateTicketId } from "@/lib/ticket";
import { cn } from "@/lib/utils";

const gazetteReasons: GazetteReason[] = [
  "Personal Preference",
  "Marriage / Divorce",
  "Religion",
  "Gender Change",
  "Surname Change",
  "Name Change for Minor",
];

type FormState = {
  firstName: string;
  lastName: string;
  oldName: string;
  newName: string;
  gazetteReason: GazetteReason | "";
  mobile: string;
  email: string;
  address: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  oldName: "",
  newName: "",
  gazetteReason: "",
  mobile: "",
  email: "",
  address: "",
};

type Status = "idle" | "submitting" | "error";

const inputClasses =
  "w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-slate)]/50 focus:border-[var(--color-brand)] outline-none transition-colors";

const labelClasses = "mb-1.5 block text-sm font-medium text-[var(--color-ink)]";
const errorClasses = "mt-1.5 text-xs font-medium text-red-600";

export function ApplyForm({ initialServiceSlug }: { initialServiceSlug?: string }) {
  const router = useRouter();
  const initialCategory = initialServiceSlug ? getCategoryForSlug(initialServiceSlug) : undefined;

  const [categoryId, setCategoryId] = useState(initialCategory?.id ?? "");
  const [serviceSlug, setServiceSlug] = useState(initialServiceSlug ?? "");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "category" | "service", string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [lastTicketId, setLastTicketId] = useState("");

  const selectedCategory = useMemo(
    () => serviceCategories.find((c) => c.id === categoryId),
    [categoryId]
  );
  const selectedService = useMemo(() => getServiceBySlug(serviceSlug), [serviceSlug]);
  const isGazette = Boolean(selectedService?.isGazette);
  const needsServicePicker = Boolean(selectedCategory && selectedCategory.slugs.length > 1);

  function handleCategoryChange(newCategoryId: string) {
    setCategoryId(newCategoryId);
    const cat = serviceCategories.find((c) => c.id === newCategoryId);
    setServiceSlug(cat && cat.slugs.length === 1 ? cat.slugs[0] : "");
    setErrors((prev) => ({ ...prev, category: undefined, service: undefined }));
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState | "category" | "service", string>> = {};

    if (!categoryId) next.category = "Please choose a category.";
    if (!serviceSlug) next.service = "Please choose a service.";

    if (isGazette) {
      if (!form.oldName.trim()) next.oldName = "Please enter your current (old) name.";
      if (!form.newName.trim()) next.newName = "Please enter your desired new name.";
      if (!form.gazetteReason) next.gazetteReason = "Please select a reason for name change.";
    } else {
      if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
      if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    }

    if (!/^\d{10}$/.test(form.mobile.trim())) {
      next.mobile = "Please enter a valid 10-digit mobile number.";
    }

    // Email is required for every service except Gazette, where it's optional
    // (but must still be a valid address if the person chooses to fill it in).
    const emailTrimmed = form.email.trim();
if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
  next.email = "Please enter a valid email address.";
}

    if (!form.address.trim()) next.address = "Please enter your address.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildWhatsAppMessage(ticketId: string, name: string) {
    const lines = [
      `New enquiry from ${site.brandName} website`,
      `Ticket ID: ${ticketId}`,
      `Service: ${selectedService?.title}`,
      isGazette
        ? `Old Name: ${form.oldName}\nNew Name: ${form.newName}\nReason: ${form.gazetteReason}`
        : `Name: ${name}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email || "—"}`,
      `Address: ${form.address}`,
    ];
    return lines.join("\n");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !selectedService) return;

    const name = isGazette ? form.oldName : `${form.firstName} ${form.lastName}`;
    const ticketId = generateTicketId();
    setLastTicketId(ticketId);

    if (!site.googleSheetWebhookUrl) {
      console.warn("googleSheetWebhookUrl is not set in data/site.ts — form cannot be saved.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      // No "mode: no-cors" here on purpose — we need to read the response
      // to know whether the row was saved. Content-Type: text/plain avoids
      // a CORS preflight (which Apps Script Web Apps don't handle).
      const res = await fetch(site.googleSheetWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ticketId,
          service: selectedService.title,
          name,
          mobile: form.mobile,
          email: form.email,
          address: form.address,
          gazetteReason: form.gazetteReason,
          newName: form.newName,
        }),
      });

      const data = await res.json();
      if (data.result === "success") {
        router.push(
          `/application-submitted?ticket=${encodeURIComponent(ticketId)}&service=${encodeURIComponent(
            selectedService.slug
          )}`
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "error") {
    const name = isGazette ? form.oldName : `${form.firstName} ${form.lastName}`;
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <AlertTriangle className="size-7" strokeWidth={1.75} />
        </span>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          Couldn&apos;t submit right now
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">
          Something went wrong saving your application. Please try again, or message us
          directly on WhatsApp so we don&apos;t miss your request.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            Try Again
          </button>
          {selectedService && (
            <a
              href={whatsappLink(buildWhatsAppMessage(lastTicketId, name))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[#1F9E4E]/40 hover:text-[#1F9E4E] transition-colors"
            >
              <MessageCircle className="size-4" strokeWidth={1.75} />
              Message on WhatsApp
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClasses}>
            Choose a category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={cn(inputClasses, "appearance-none")}
          >
            <option value="" disabled>
              Select a category
            </option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className={errorClasses}>{errors.category}</p>}
        </div>

        {needsServicePicker && (
          <div>
            <label htmlFor="service" className={labelClasses}>
              Choose a service
            </label>
            <select
              id="service"
              value={serviceSlug}
              onChange={(e) => {
                setServiceSlug(e.target.value);
                setErrors((prev) => ({ ...prev, service: undefined }));
              }}
              className={cn(inputClasses, "appearance-none")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {selectedCategory?.slugs.map((slug) => (
                <option key={slug} value={slug}>
                  {getServiceBySlug(slug)?.title}
                </option>
              ))}
            </select>
            {errors.service && <p className={errorClasses}>{errors.service}</p>}
          </div>
        )}
      </div>

      {isGazette ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="oldName" className={labelClasses}>
              Old Name (current, as per records)
            </label>
            <input
              id="oldName"
              type="text"
              value={form.oldName}
              onChange={(e) => update("oldName", e.target.value)}
              placeholder="e.g. Ravi Kumar"
              className={inputClasses}
            />
            {errors.oldName && <p className={errorClasses}>{errors.oldName}</p>}
          </div>
          <div>
            <label htmlFor="newName" className={labelClasses}>
              New Name (desired)
            </label>
            <input
              id="newName"
              type="text"
              value={form.newName}
              onChange={(e) => update("newName", e.target.value)}
              placeholder="e.g. Ravi Sharma"
              className={inputClasses}
            />
            {errors.newName && <p className={errorClasses}>{errors.newName}</p>}
          </div>

          <div className="sm:col-span-2">
            <span className={labelClasses}>What&apos;s the reason for name change?</span>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {gazetteReasons.map((reason) => (
                <label
                  key={reason}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors",
                    form.gazetteReason === reason
                      ? "border-[var(--color-brand)] bg-[var(--color-sky)] text-[var(--color-ink)]"
                      : "border-[var(--color-line)] text-[var(--color-slate)] hover:border-[var(--color-brand)]/40"
                  )}
                >
                  <input
                    type="radio"
                    name="gazetteReason"
                    value={reason}
                    checked={form.gazetteReason === reason}
                    onChange={() => update("gazetteReason", reason)}
                    className="size-4 accent-[var(--color-brand)]"
                  />
                  {reason}
                </label>
              ))}
            </div>
            {errors.gazetteReason && <p className={errorClasses}>{errors.gazetteReason}</p>}
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Ravi"
              className={inputClasses}
            />
            {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="given-name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Kumar"
              className={inputClasses}
            />
            {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mobile" className={labelClasses}>
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            autoComplete="given-name"
            inputMode="numeric"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="98765 43210"
            className={inputClasses}
          />
          {errors.mobile && <p className={errorClasses}>{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
  Email Address <span className="font-normal text-[var(--color-slate)]">(optional)</span>
</label>
          <input
            id="email"
            type="email"
            autoComplete="given-name"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="address" className={labelClasses}>
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          value={form.address}
          autoComplete="given-name"
          onChange={(e) => update("address", e.target.value)}
          placeholder="House no., street, city, state, PIN code"
          className={cn(inputClasses, "resize-none")}
        />
        {errors.address && <p className={errorClasses}>{errors.address}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            Submitting…
            <Loader2 className="size-4 animate-spin" strokeWidth={2} />
          </>
        ) : (
          <>
            Submit Application
            <Send className="size-4" strokeWidth={2} />
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-[var(--color-slate)]">
        You&apos;ll get a Ticket ID after submitting — save it to check your application status
        with us later.
      </p>
    </form>
  );
}
