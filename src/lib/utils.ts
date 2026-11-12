import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const whatsappUrl = (message?: string) => {
  const base = "https://wa.me/254790187080";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const phoneIsValid = (phone: string) =>
  /^((\+?254)|0)7\d{8}$/.test(phone.replace(/[\s-]/g, ""));
