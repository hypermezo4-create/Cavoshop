import { Metadata } from "next";
import { HeroSection } from "@/sections/hero-section";
import { IntroSection } from "@/sections/intro-section";
import { PreviewSection } from "@/sections/preview-section";
import { CTASection } from "@/sections/cta-section";
import { StatsSection } from "@/sections/stats-section";

export const metadata: Metadata = {
  title: "CAVO STORE | Official Home of Premium Mirror Sneakers",
  description: "Step into luxury with Cavo Store. We provide the highest quality 1:1 mirror sneakers, perfectly crafted for style and comfort.",
};

export default function HomePage() {
  return (
    <>
      {/* قسم الواجهة الرئيسية */}
      <HeroSection />
      
      {/* قسم أرقام المبيعات والجودة */}
      <StatsSection />
      
      {/* مقدمة عن براند كافو */}
      <IntroSection />
      
      {/* معرض معاينة أحدث الأحذية */}
      <PreviewSection />
      
      {/* قسم دعوة الزبائن للشراء (Shop Now) */}
      <CTASection />
    </>
  );
}
