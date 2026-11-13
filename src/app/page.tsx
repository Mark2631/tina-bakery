import {
  CustomCakeCta,
  FeaturedProducts,
  HeroSection,
  HomeLocation,
  HomeTrustNote,
  HowToOrder,
  OccasionGrid,
  SnackBouquetSpotlight,
  StoryTeaser,
} from "@/components/home-sections";
import { InstagramStrip } from "@/components/instagram-strip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeTrustNote />
      <OccasionGrid />
      <FeaturedProducts />
      <SnackBouquetSpotlight />
      <StoryTeaser />
      <CustomCakeCta />
      <HowToOrder />
      <InstagramStrip />
      <HomeLocation />
    </>
  );
}
