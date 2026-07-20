import FeaturesSection from "@/components/modules/common/home/FeaturesSection";
import HeroSection from "@/components/modules/common/home/HeroSection";
import HowItWorksSection from "@/components/modules/common/home/HowItWorksSection";
import StatsSection from "@/components/modules/common/home/StatsSection";
import TestimonialsSection from "@/components/modules/common/home/TestimonialSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Streamline your HR operations with Zentro's comprehensive payroll management, attendance tracking, and workforce analytics platform.",
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
