"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  PackageCheck,
} from "lucide-react";
import { CartLine } from "@/components/cart-line";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui";
import { useCart } from "@/components/cart-context";
import { formatPrice, products } from "@/data/products";
import {
  formatDateForDisplay,
  getEarliestAvailableDate,
  isDateAvailable,
  isSundayDate,
  toLocalDateString,
} from "@/lib/dates";
import { phoneIsValid, whatsappUrl } from "@/lib/utils";

const steps = ["Review cart", "Your details", "Delivery", "Review & send"];
type CheckoutData = {
  name: string;
  phone: string;
  email: string;
  isGift: boolean;
  recipientName: string;
  recipientPhone: string;
  date: string;
  time: string;
  area: string;
  otherArea: string;
  address: string;
  instructions: string;
};
const initial: CheckoutData = {
  name: "",
  phone: "",
  email: "",
  isGift: false,
  recipientName: "",
  recipientPhone: "",
  date: "",
  time: "",
  area: "",
  otherArea: "",
  address: "",
  instructions: "",
};

export function CheckoutFlow() {
  const { items, subtotal, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isCustom = items.some(
    (item) =>
      item.size === "tiered" ||
      products.find((product) => product.id === item.productId)?.custom ===
        true,
  );
  const earliest = useMemo(
    () => toLocalDateString(getEarliestAvailableDate(isCustom)),
    [isCustom],
  );

  function setValue(field: keyof CheckoutData, value: string | boolean) {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (step === 1 && items.length === 0)
      next.items = "Your cart is empty. Add a cake before checkout.";
    if (step === 2) {
      if (!data.name.trim()) next.name = "Enter your full name.";
      if (!data.phone.trim()) next.phone = "Enter your WhatsApp number.";
      else if (!phoneIsValid(data.phone))
        next.phone = "Use a Kenyan mobile number, e.g. 0790 187 080.";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        next.email = "Enter a valid email address or leave this blank.";
      if (data.isGift && !data.recipientName.trim())
        next.recipientName = "Enter the recipient’s name.";
      if (data.isGift && !data.recipientPhone.trim())
        next.recipientPhone = "Enter the recipient’s WhatsApp number.";
      else if (data.isGift && !phoneIsValid(data.recipientPhone))
        next.recipientPhone = "Enter a valid Kenyan mobile number.";
    }
    if (step === 3) {
      if (!data.date) next.date = "Choose a delivery date.";
      else if (!isDateAvailable(data.date, isCustom))
        next.date = `Choose a date at least ${isCustom ? "48" : "24"} hours from now. Tina Bakers is closed Sundays.`;
      if (!data.time) next.time = "Choose a time preference.";
      if (!data.area) next.area = "Choose a delivery area.";
      if (data.area === "Other" && !data.otherArea.trim())
        next.otherArea = "Enter your delivery area.";
      if (!data.address.trim()) next.address = "Enter an address or landmark.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return false;
    }
    return true;
  }

  function advance() {
    if (validate()) setStep((current) => Math.min(4, current + 1));
  }

  const whatsappMessage = useMemo(() => {
    if (!data.date || !data.time || !data.name || !data.phone) return "";
    const ref = `TB-${String(Date.now()).slice(-6)}`;
    const lines = [
      "🧁 *New Order – Tina Bakers*",
      `Ref: ${ref}`,
      "",
      "*Items*",
      ...items.map(
        (item) =>
          `• ${item.name} (${item.sizeLabel}, ${item.flavor})${item.message ? ` — \"${item.message}\"` : ""} × ${item.quantity} = ${formatPrice(item.totalPrice)}`,
      ),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "Delivery fee: To be confirmed",
      "",
      "*Delivery*",
      `Date: ${formatDateForDisplay(data.date)} · ${data.time}`,
      `Area: ${data.area === "Other" ? data.otherArea : data.area}`,
      `Address: ${data.address}`,
      ...(data.isGift
        ? [
            `🎁 SURPRISE – for ${data.recipientName}, WhatsApp: ${data.recipientPhone}`,
          ]
        : []),
      "",
      "*Customer*",
      `Name: ${data.name}`,
      `WhatsApp: ${data.phone}`,
      "",
      `Notes: ${data.instructions.trim() || "None"}`,
      "— tinabakers.co.ke",
    ];
    return lines.join("\n");
  }, [data, items, subtotal]);

  function handleDateChange(value: string) {
    if (isSundayDate(value)) {
      setValue("date", "");
      setErrors((current) => ({
        ...current,
        date: "Tina Bakers is closed Sundays. Please choose another date.",
      }));
      return;
    }
    setValue("date", value);
    if (value && !isDateAvailable(value, isCustom))
      setErrors((current) => ({
        ...current,
        date: `Choose a date at least ${isCustom ? "48" : "24"} hours from now.`,
      }));
  }

  if (!hydrated)
    return (
      <section className="section-wrap py-16" aria-live="polite">
        <p className="text-center text-sm text-[#746b70]">
          Loading your order…
        </p>
      </section>
    );
  if (items.length === 0)
    return (
      <section className="section-wrap py-16">
        <div className="form-card mx-auto max-w-2xl text-center">
          <PackageCheck className="mx-auto text-caramel" size={34} />
          <h1 className="mt-4 font-display text-3xl text-plum">
            Nothing in your cart just yet.
          </h1>
          <p className="mt-2 text-[#746b70]">
            Choose a cake before we prepare your order details.
          </p>
          <Link className="button button-plum mt-5" href="/shop">
            Browse cakes
          </Link>
        </div>
      </section>
    );

  return (
    <section className="section-wrap py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Tina Bakers · Order details</p>
        <h1 className="mt-2 font-display text-4xl text-plum sm:text-5xl">
          Let&apos;s get your cake to the right table.
        </h1>
        <div
          className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4"
          aria-label="Checkout steps"
        >
          {steps.map((label, index) => (
            <div
              key={label}
              className={`border-t-2 pt-2 text-xs ${step === index + 1 ? "border-gold font-bold text-plum" : step > index + 1 ? "border-plum text-plum" : "border-plum/15 text-[#746b70]"}`}
            >
              <span className="mr-1">0{index + 1}</span>
              {label}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {step === 1 && (
              <div className="form-card">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow">Step 1 of 4</p>
                    <h2 className="mt-1 font-display text-2xl text-plum">
                      Review your cart
                    </h2>
                  </div>
                  <Link
                    className="text-sm font-bold text-plum underline underline-offset-4"
                    href="/shop"
                  >
                    Add another cake
                  </Link>
                </div>
                <div className="mt-3">
                  {items.map((item) => (
                    <CartLine item={item} key={item.id} />
                  ))}
                </div>
                {errors.items && (
                  <p className="error-message mt-3" role="alert">
                    {errors.items}
                  </p>
                )}
                <div className="mt-5 flex justify-end">
                  <Button onClick={advance}>
                    Your details <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="form-card">
                <p className="eyebrow">Step 2 of 4</p>
                <h2 className="mt-1 font-display text-2xl text-plum">
                  Who should we contact?
                </h2>
                <div className="form-grid mt-5">
                  <Field
                    label="Full name"
                    id="customer-name"
                    error={errors.name}
                  >
                    <input
                      id="customer-name"
                      className="field-input"
                      autoComplete="name"
                      value={data.name}
                      onChange={(event) => setValue("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field
                    label="WhatsApp number"
                    id="customer-phone"
                    error={errors.phone}
                  >
                    <input
                      id="customer-phone"
                      className="field-input"
                      type="tel"
                      autoComplete="tel"
                      placeholder="0790 187 080"
                      value={data.phone}
                      onChange={(event) =>
                        setValue("phone", event.target.value)
                      }
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </Field>
                  <Field
                    label="Email (optional)"
                    id="customer-email"
                    error={errors.email}
                  >
                    <input
                      id="customer-email"
                      className="field-input"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(event) =>
                        setValue("email", event.target.value)
                      }
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                  <div className="span-two border-t border-plum/10 pt-4">
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-plum">
                      <input
                        type="checkbox"
                        checked={data.isGift}
                        onChange={(event) =>
                          setValue("isGift", event.target.checked)
                        }
                        className="size-4 accent-[#4B2058]"
                      />
                      This is a gift or surprise
                    </label>
                  </div>
                  {data.isGift && (
                    <>
                      <Field
                        label="Recipient’s name"
                        id="recipient-name"
                        error={errors.recipientName}
                      >
                        <input
                          id="recipient-name"
                          className="field-input"
                          value={data.recipientName}
                          onChange={(event) =>
                            setValue("recipientName", event.target.value)
                          }
                          aria-invalid={Boolean(errors.recipientName)}
                        />
                      </Field>
                      <Field
                        label="Recipient’s WhatsApp"
                        id="recipient-phone"
                        error={errors.recipientPhone}
                      >
                        <input
                          id="recipient-phone"
                          className="field-input"
                          type="tel"
                          placeholder="07XX XXX XXX"
                          value={data.recipientPhone}
                          onChange={(event) =>
                            setValue("recipientPhone", event.target.value)
                          }
                          aria-invalid={Boolean(errors.recipientPhone)}
                        />
                      </Field>
                    </>
                  )}
                </div>
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft size={16} />
                    Back
                  </Button>
                  <Button onClick={advance}>
                    Delivery details <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="form-card">
                <p className="eyebrow">Step 3 of 4</p>
                <h2 className="mt-1 font-display text-2xl text-plum">
                  Where should we deliver?
                </h2>
                <p className="mt-2 text-sm text-[#746b70]">
                  Earliest available:{" "}
                  <strong className="text-plum">
                    {formatDateForDisplay(earliest)}
                  </strong>
                  . We are closed Sundays.
                </p>
                <div className="form-grid mt-5">
                  <Field
                    label="Delivery date"
                    id="delivery-date"
                    error={errors.date}
                  >
                    <DatePicker
                      id="delivery-date"
                      value={data.date}
                      minDate={earliest}
                      isCustom={isCustom}
                      onChange={handleDateChange}
                      invalid={Boolean(errors.date)}
                      errorId="delivery-date-error"
                    />
                  </Field>
                  <Field
                    label="Time preference"
                    id="delivery-time"
                    error={errors.time}
                  >
                    <select
                      id="delivery-time"
                      className="field-select"
                      value={data.time}
                      onChange={(event) => setValue("time", event.target.value)}
                      aria-invalid={Boolean(errors.time)}
                    >
                      <option value="">Choose a time</option>
                      <option>Morning (8am–12pm)</option>
                      <option>Afternoon (12pm–5pm)</option>
                      <option>Before 6:30pm</option>
                    </select>
                  </Field>
                  <Field
                    label="Delivery area"
                    id="delivery-area"
                    error={errors.area}
                  >
                    <select
                      id="delivery-area"
                      className="field-select"
                      value={data.area}
                      onChange={(event) => setValue("area", event.target.value)}
                      aria-invalid={Boolean(errors.area)}
                    >
                      <option value="">Choose an area</option>
                      <option>Meru Town</option>
                      <option>Meru CBD</option>
                      <option>Nchiru</option>
                      <option>Mitunguu</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  {data.area === "Other" && (
                    <Field
                      label="Please specify"
                      id="other-area"
                      error={errors.otherArea}
                    >
                      <input
                        id="other-area"
                        className="field-input"
                        value={data.otherArea}
                        onChange={(event) =>
                          setValue("otherArea", event.target.value)
                        }
                        aria-invalid={Boolean(errors.otherArea)}
                      />
                    </Field>
                  )}
                  <Field
                    label="Address or landmark"
                    id="delivery-address"
                    error={errors.address}
                    full
                  >
                    <input
                      id="delivery-address"
                      className="field-input"
                      placeholder="Estate, road, building, or a nearby landmark"
                      value={data.address}
                      onChange={(event) =>
                        setValue("address", event.target.value)
                      }
                      aria-invalid={Boolean(errors.address)}
                    />
                  </Field>
                  <Field
                    label="Special instructions (optional)"
                    id="delivery-instructions"
                    full
                  >
                    <textarea
                      id="delivery-instructions"
                      className="field-textarea min-h-24"
                      value={data.instructions}
                      onChange={(event) =>
                        setValue("instructions", event.target.value)
                      }
                      placeholder="Gate directions, delivery notes, or allergy information."
                    />
                  </Field>
                </div>
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ChevronLeft size={16} />
                    Back
                  </Button>
                  <Button onClick={advance}>
                    Review order <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="form-card">
                <p className="eyebrow">Step 4 of 4</p>
                <h2 className="mt-1 font-display text-2xl text-plum">
                  One last look.
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Summary
                    label="Customer"
                    lines={[
                      data.name,
                      data.phone,
                      data.email || "No email added",
                    ]}
                  />
                  <Summary
                    label="Delivery"
                    lines={[
                      formatDateForDisplay(data.date),
                      data.time,
                      data.area === "Other" ? data.otherArea : data.area,
                      data.address,
                    ]}
                  />
                  {data.isGift && (
                    <Summary
                      label="Gift delivery"
                      lines={[data.recipientName, data.recipientPhone]}
                    />
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl text-plum">
                  Your cakes
                </h3>
                <div className="mt-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 border-b border-plum/10 py-3 text-sm"
                    >
                      <span>
                        {item.name} · {item.sizeLabel} · {item.flavor} ×{" "}
                        {item.quantity}
                      </span>
                      <strong className="whitespace-nowrap text-plum">
                        {formatPrice(item.totalPrice)}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="summary-box mt-5">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Delivery fee</span>
                    <strong>To be confirmed</strong>
                  </div>
                </div>
                <div className="mt-5 border border-[#bd7b52]/30 bg-[#f8ebdc] p-4 text-sm text-[#684c42]">
                  ⚠️ Tapping &apos;Send&apos; will open WhatsApp. Your order is{" "}
                  <strong>NOT confirmed</strong> until Tina Bakers replies to
                  agree availability and send M-Pesa payment details.
                </div>
                <Button
                  variant="gold"
                  className="mt-5 w-full"
                  onClick={() =>
                    window.open(
                      whatsappUrl(whatsappMessage),
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <MessageCircle size={18} />
                  Send order via WhatsApp
                </Button>
                <p className="mt-3 text-center text-xs text-[#746b70]">
                  We&apos;ll confirm within 2 hours during business hours
                  (Mon–Sat 8am–6:30pm).
                </p>
                <button
                  type="button"
                  className="mt-3 text-sm font-bold text-plum underline underline-offset-4"
                  onClick={() => setStep(3)}
                >
                  Edit delivery details
                </button>
              </div>
            )}
          </div>
          <aside className="h-fit lg:sticky lg:top-36">
            <div className="summary-box">
              <h2 className="font-display text-xl text-plum">Order summary</h2>
              <p className="mt-1 text-xs text-[#746b70]">
                Delivery confirmed on order
              </p>
              <div className="mt-4">
                {items.map((item) => (
                  <div key={item.id} className="summary-row text-sm">
                    <span className="max-w-[180px]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="whitespace-nowrap">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="summary-row summary-total mt-3">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="mt-3 text-xs text-[#746b70]">
                No payment is collected on this website.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  full = false,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`field-wrap ${full ? "span-two" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
  <p id={error ? `${id}-error` : undefined} className="error-message" role="alert">
                    {error}
        </p>
      )}
    </div>
  );
}
function Summary({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="bg-[#f5efdf] p-4">
      <h3 className="font-bold text-plum">{label}</h3>
      {lines.map((line) => (
        <p key={line} className="mt-1 break-words text-sm text-[#746b70]">
          {line}
        </p>
      ))}
    </div>
  );
}
