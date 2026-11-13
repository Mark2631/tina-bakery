"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

/**
 * Displays an online product/photo reference and switches to a local illustrated
 * fallback if the remote host is unavailable. Prevents blank or broken image
 * frames from appearing throughout the storefront.
 */
export function SafeImage({
  src,
  fallbackSrc = "/images/cake-placeholder.svg",
  alt,
  ...props
}: SafeImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  function handleError() {
    if (activeSrc !== fallbackSrc) setActiveSrc(fallbackSrc);
  }

  return (
    <Image
      {...props}
      src={activeSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
