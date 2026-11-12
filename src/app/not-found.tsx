import Link from "next/link";
import { CakeSlice } from "lucide-react";

export default function NotFound() {
  return (
    <main className="section-wrap py-20">
      <div className="form-card mx-auto max-w-xl text-center">
        <CakeSlice
          className="mx-auto text-caramel"
          size={38}
          strokeWidth={1.3}
        />
        <p className="eyebrow mt-4">A little detour</p>
        <h1 className="mt-2 font-display text-4xl text-plum">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-3 text-[#746b70]">
          The page may have moved, but something lovely is still in the oven.
        </p>
        <Link className="button button-plum mt-6" href="/shop">
          Browse the cakes
        </Link>
      </div>
    </main>
  );
}
