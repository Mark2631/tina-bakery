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
  prefix = "Demo from",
  className,
  detail,
}: PriceDisplayProps) {
  if (amount === null) {
    return (
      <div className={cn("price-display price-on-request", className)}>
        <strong>Custom quote</strong>
        <small>Price on request</small>
      </div>
    );
  }

  return (
    <div className={cn("price-display price-demo", className)}>
      <p>
        {prefix ? <span>{prefix} </span> : null}
        <strong>{formatPrice(amount)}</strong>
        {detail ? <span className="price-detail"> · {detail}</span> : null}
      </p>
      <small>Illustrative website price · confirm with Tina</small>
    </div>
  );
}
