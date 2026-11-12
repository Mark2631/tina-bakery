import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number;
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
