"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { whatsappUrl } from "@/lib/utils";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!message.trim()) next.message = "Please add a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return;
    }
    window.open(
      whatsappUrl(
        `Hello Tina Bakers, my name is ${name.trim()} (${email.trim()}).\n\n${message.trim()}`,
      ),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form
      className="form-card flex flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="field-wrap">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          className="field-input"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setErrors((current) => ({ ...current, name: "" }));
          }}
          aria-invalid={Boolean(errors.name)}
          required
        />
        {errors.name && (
          <p className="error-message" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="field-wrap">
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          className="field-input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors((current) => ({ ...current, email: "" }));
          }}
          aria-invalid={Boolean(errors.email)}
          required
        />
        {errors.email && (
          <p className="error-message" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div className="field-wrap">
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          className="field-textarea"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setErrors((current) => ({ ...current, message: "" }));
          }}
          aria-invalid={Boolean(errors.message)}
          required
        />
        {errors.message && (
          <p className="error-message" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <Button type="submit">
        Continue on WhatsApp <ArrowUpRight size={17} />
      </Button>
    </form>
  );
}
