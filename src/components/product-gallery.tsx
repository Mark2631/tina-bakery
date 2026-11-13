import { SafeImage } from "@/components/safe-image";
import type { Product } from "@/data/products";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="product-gallery" role="group" aria-label={product.name + " reference photograph"}>
      <div className="gallery-main">
        <SafeImage
          src={product.imageUrl}
          alt={product.name + " style reference"}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="gallery-photo"
        />
        <span className="gallery-image-note">Style reference · final design agreed with Tina</span>
      </div>
      <p className="gallery-caption">
        Reference photography. Your cake is prepared to the size, flavour and finish confirmed with Tina Bakers.
      </p>
    </div>
  );
}
