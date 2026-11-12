import {
  CustomCakeCta,
  FeaturedProducts,
  HeroSection,
  HomeLocation,
  HomeTrustNote,
  HowToOrder,
  OccasionGrid,
  StoryTeaser,
} from "@/components/home-sections";
import { InstagramStrip } from "@/components/instagram-strip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="py-5">
        <HomeTrustNote />
      </div>
      <OccasionGrid />
      <FeaturedProducts />
      <StoryTeaser />
      <CustomCakeCta />
      <HowToOrder />
      <InstagramStrip />
      <HomeLocation />
    </>
  );
}
