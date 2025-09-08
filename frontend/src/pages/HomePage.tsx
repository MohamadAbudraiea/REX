import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ReviewsSection } from "@/components/sections/reviews-section";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ReviewsSection />
    </>
  );
}

export default HomePage;
