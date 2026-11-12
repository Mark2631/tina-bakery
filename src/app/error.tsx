"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Tina Bakers] A page could not be displayed.", error);
  }, [error]);

  return (
    <main className="section-wrap py-20">
      <div className="form-card mx-auto max-w-xl text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-2 font-display text-4xl text-plum">
          Let&apos;s try that again.
        </h1>
        <p className="mt-3 text-[#746b70]">
          Your cart stays here. Please retry or return to the shop.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="button button-plum" onClick={reset}>
            <RefreshCw size={16} />
            Try again
          </button>
          <Link className="button button-outline" href="/shop">
            Back to the shop
          </Link>
        </div>
      </div>
    </main>
  );
}
