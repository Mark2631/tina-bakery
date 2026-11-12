import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number | null;
  prefix?: string;
  className?: string;
  detail?: string;
};

export function PriceDisplay({
  amount,
  prefix = "From",
  className,
  detail,
}: PriceDisplayProps) {
  if (amount === null) {
    return (
      <p className={cn("price-display price-on-request", className)}>
        Price confirmed on WhatsApp
      </p>
    );
  }

  return (
    <p
      className={cn("price-display", className)}
      aria-label={`${prefix ? `${prefix} ` : ""}${formatPrice(amount)}${detail ? `, ${detail}` : ""}`}
    >
      {prefix ? <span>{prefix} </span> : null}
      {formatPrice(amount)}
      {detail ? <span className="price-detail"> · {detail}</span> : null}
    </p>
  );
}
