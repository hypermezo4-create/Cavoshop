import { Metadata } from "next";
import { FeaturesList } from "@/sections/features-list";
import { ComparisonTable } from "@/sections/comparison-table";
import { ScreenshotsGallery } from "@/sections/screenshots-gallery";

export const metadata: Metadata = {
  title: "Cavo Features | Premium Quality Sneakers",
  description: "Explore the premium features of Cavo mirror sneakers. 1:1 original materials, perfect craftsmanship, and ultimate comfort.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16 bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-amber-400 font-bold uppercase tracking-widest mb-4 block text-sm">Cavo Standards</span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Exactly Like <span className="text-amber-400">The Original</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed font-medium">
            At Cavo Store, we don't just sell sneakers; we provide the highest mirror quality (1:1) imported directly. 
            From the stitching to the materials, everything is crafted to perfection.
          </p>
        </div>
      </div>

      <ScreenshotsGallery />
      <FeaturesList />
      <ComparisonTable />
    </div>
  );
}
