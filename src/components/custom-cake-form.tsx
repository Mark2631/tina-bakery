"use client";

import { useState } from "react";
import {
  CakeSlice,
  ChevronLeft,
  ChevronRight,
  Heart,
  PartyPopper,
  BriefcaseBusiness,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui";
import { DatePicker } from "@/components/date-picker";
import { flavors } from "@/data/products";
import {
  getEarliestAvailableDate,
  isDateAvailable,
  isSundayDate,
  toLocalDateString,
  formatDateForDisplay,
} from "@/lib/dates";
import { phoneIsValid, whatsappUrl } from "@/lib/utils";

const occasions = [
  { name: "Birthday", Icon: CakeSlice },
  { name: "Wedding", Icon: Heart },
  { name: "Graduation", Icon: GraduationCap },
  { name: "Anniversary", Icon: PartyPopper },
  { name: "Corporate", Icon: BriefcaseBusiness },
  { name: "Other", Icon: Sparkles },
];
const sizes = [
  { id: "6-inch", label: '6"', servings: "6–8" },
  { id: "8-inch", label: '8"', servings: "10–12" },
  { id: "10-inch", label: '10"', servings: "16–20" },
  { id: "tiered", label: "Tiered", servings: "custom" },
];

type Inquiry = {
  occasion: string;
  size: string;
  flavor: string;
  otherFlavor: string;
  design: string;
  date: string;
  name: string;
  phone: string;
  notes: string;
};
const initial: Inquiry = {
  occasion: "",
  size: "",
  flavor: "",
  otherFlavor: "",
  design: "",
  date: "",
  name: "",
  phone: "",
  notes: "",
};

export function CustomCakeForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const minDate = toLocalDateString(getEarliestAvailableDate(true));
  const selectedSize = sizes.find((size) => size.id === form.size);
  const finalFlavor = form.flavor === "Other" ? form.otherFlavor : form.flavor;

  function update(field: keyof Inquiry, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (step === 1 && !form.occasion)
      next.occasion = "Choose an occasion to continue.";
    if (step === 2 && !form.size) next.size = "Choose a size to continue.";
    if (step === 3) {
      if (!form.flavor) next.flavor = "Choose a flavour to continue.";
      if (form.flavor === "Other" && !form.otherFlavor.trim())
        next.otherFlavor = "Tell us the flavour you have in mind.";
    }
    if (step === 4 && !form.design.trim())
      next.design = "Share a few details so we can picture your cake.";
    if (step === 5) {
      if (!form.date) next.date = "Choose a delivery date.";
      else if (!isDateAvailable(form.date, true))
        next.date =
          "Please choose a date at least 48 hours from now, and not a Sunday.";
    }
    if (step === 6) {
      if (!form.name.trim()) next.name = "Enter your name.";
      if (!form.phone.trim()) next.phone = "Enter your WhatsApp number.";
      else if (!phoneIsValid(form.phone))
        next.phone = "Enter a valid Kenyan mobile number, e.g. 0790 187 080.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLElement>(
            '[data-invalid="true"], [aria-invalid="true"]',
          )
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return false;
    }
    return true;
  }

  function goNext() {
    if (validate()) setStep((current) => Math.min(6, current + 1));
  }
  function sendInquiry() {
    if (!validate()) return;
    const message = [
      "🎂 *Custom Cake Inquiry – Tina Bakers*",
      "",
      `Occasion: ${form.occasion}`,
      `Size: ${selectedSize?.label} (~${selectedSize?.servings} servings)`,
      `Flavor: ${finalFlavor}`,
      `Design: ${form.design.trim()}`,
      `Delivery Date: ${formatDateForDisplay(form.date)}`,
      "",
      `Name: ${form.name.trim()}`,
      `WhatsApp: ${form.phone.trim()}`,
      `Notes: ${form.notes.trim() || "None"}`,
      "",
      "— tinabakers.co.ke",
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  function handleDateChange(value: string) {
    if (isSundayDate(value)) {
      update("date", "");
      setErrors((current) => ({
        ...current,
        date: "Tina Bakers is closed Sundays. Please choose another date.",
      }));
      return;
    }
    update("date", value);
    if (value && !isDateAvailable(value, true))
      setErrors((current) => ({
        ...current,
        date: "Please choose a date at least 48 hours from now.",
      }));
  }

  return (
    <div className="form-card">
      <div className="form-stepper">
        <span>Step {step} of 6</span>
        <span>{Math.round((step / 6) * 100)}% complete</span>
      </div>
      <div
        className="progress-track mt-3"
        role="progressbar"
        aria-label="Inquiry progress"
        aria-valuemin={1}
        aria-valuemax={6}
        aria-valuenow={step}
      >
        <div
          className="progress-fill"
          style={{ width: `${(step / 6) * 100}%` }}
        />
      </div>
      <div className="mt-7 min-h-[310px]">
        {step === 1 && (
          <section>
            <p className="eyebrow">First, the occasion</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              What are we celebrating?
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {occasions.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  className="choice-card"
                  data-invalid={Boolean(errors.occasion)}
                  aria-pressed={form.occasion === name}
                  onClick={() => update("occasion", name)}
                >
                  <Icon className="text-caramel" size={23} />
                  <span className="mt-3 block font-semibold text-plum">
                    {name}
                  </span>
                </button>
              ))}
            </div>
            {errors.occasion && (
              <p className="error-message mt-3" role="alert">
                {errors.occasion}
              </p>
            )}
          </section>
        )}
        {step === 2 && (
          <section>
            <p className="eyebrow">Make room at the table</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              What size do you have in mind?
            </h2>
            <p className="mt-2 text-sm text-[#746b70]">
              Not sure? Choose the approximate number of people you&apos;re
              serving.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  className="choice-card min-h-28"
                  data-invalid={Boolean(errors.size)}
                  aria-pressed={form.size === size.id}
                  onClick={() => update("size", size.id)}
                >
                  <span className="block font-display text-2xl text-plum">
                    {size.label}
                  </span>
                  <span className="mt-1 block text-sm text-[#746b70]">
                    {size.servings === "custom"
                      ? "We’ll plan this together"
                      : `About ${size.servings} servings`}
                  </span>
                </button>
              ))}
            </div>
            {errors.size && (
              <p className="error-message mt-3" role="alert">
                {errors.size}
              </p>
            )}
          </section>
        )}
        {step === 3 && (
          <section>
            <p className="eyebrow">A favourite flavour</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              What should it taste like?
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[...flavors, "Other"].map((flavor) => (
                <button
                  key={flavor}
                  type="button"
                  className="choice-card min-h-24"
                  data-invalid={Boolean(errors.flavor)}
                  aria-pressed={form.flavor === flavor}
                  onClick={() => update("flavor", flavor)}
                >
                  <CakeSlice className="text-caramel" size={22} />
                  <span className="mt-2 block font-semibold text-plum">
                    {flavor}
                  </span>
                </button>
              ))}
            </div>
            {form.flavor === "Other" && (
              <div className="field-wrap mt-4">
                <label htmlFor="other-flavor">Tell us your flavour idea</label>
                <input
                  id="other-flavor"
                  className="field-input"
                  value={form.otherFlavor}
                  onChange={(event) =>
                    update("otherFlavor", event.target.value)
                  }
                  aria-invalid={Boolean(errors.otherFlavor)}
                />
                {errors.otherFlavor && (
                  <p className="error-message" role="alert">
                    {errors.otherFlavor}
                  </p>
                )}
              </div>
            )}
            {errors.flavor && (
              <p className="error-message mt-3" role="alert">
                {errors.flavor}
              </p>
            )}
          </section>
        )}
        {step === 4 && (
          <section>
            <p className="eyebrow">Make it yours</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              Tell us what you&apos;re imagining.
            </h2>
            <p className="mt-2 text-sm text-[#746b70]">
              Colours, decorations, theme, a favourite detail—describe it in
              your own words. You can share a reference photo with us on
              WhatsApp afterwards.
            </p>
            <textarea
              className="field-textarea mt-5"
              id="design-notes"
              maxLength={1000}
              placeholder="I’m imagining soft cream and gold with little pressed flowers…"
              value={form.design}
              onChange={(event) => update("design", event.target.value)}
              aria-invalid={Boolean(errors.design)}
            />
            {errors.design && (
              <p className="error-message mt-1" role="alert">
                {errors.design}
              </p>
            )}
            <p className="mt-1 text-right text-xs text-[#746b70]">
              {form.design.length}/1000
            </p>
          </section>
        )}
        {step === 5 && (
          <section>
            <p className="eyebrow">Choose the day</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              When do you need it?
            </h2>
            <p className="mt-2 text-sm text-[#746b70]">
              Custom cakes need at least 48 hours notice. We&apos;re closed
              Sundays.
            </p>
            <div className="field-wrap mt-5 max-w-sm">
              <label htmlFor="delivery-date">Preferred delivery date</label>
              <DatePicker
                id="delivery-date"
                value={form.date}
                minDate={minDate}
                isCustom
                onChange={handleDateChange}
                invalid={Boolean(errors.date)}
                errorId="delivery-date-error"
              />
              {errors.date && (
                <p id="delivery-date-error" className="error-message" role="alert">
                  {errors.date}
                </p>
              )}
            </div>
          </section>
        )}
        {step === 6 && (
          <section>
            <p className="eyebrow">A way to reach you</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              Who are we baking for?
            </h2>
            <div className="form-grid mt-5">
              <div className="field-wrap">
                <label htmlFor="inquiry-name">Your name</label>
                <input
                  id="inquiry-name"
                  className="field-input"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="error-message" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field-wrap">
                <label htmlFor="inquiry-phone">WhatsApp number</label>
                <input
                  id="inquiry-phone"
                  className="field-input"
                  type="tel"
                  autoComplete="tel"
                  placeholder="0790 187 080"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p className="error-message" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="field-wrap span-two">
                <label htmlFor="inquiry-additional">
                  Anything else we should know?{" "}
                  <span className="font-normal text-[#746b70]">(optional)</span>
                </label>
                <textarea
                  id="inquiry-additional"
                  className="field-textarea min-h-24"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Allergies, delivery details, or a good time to call."
                />
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-plum/10 pt-5">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={() => {
              setStep((current) => current - 1);
              setErrors({});
            }}
          >
            <ChevronLeft size={17} />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 6 ? (
          <Button onClick={goNext}>
            Continue <ChevronRight size={17} />
          </Button>
        ) : (
          <Button variant="gold" onClick={sendInquiry}>
            Send inquiry via WhatsApp <ChevronRight size={17} />
          </Button>
        )}
      </div>
    </div>
  );
}
