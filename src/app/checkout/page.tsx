import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your handmade Tina Bakers cake order and send the details to us on WhatsApp.",
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
