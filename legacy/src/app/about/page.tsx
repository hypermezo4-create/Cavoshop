import { Metadata } from "next";
import { AboutContent } from "@/sections/about-content";

export const metadata: Metadata = {
  title: "About Cavo | Premium Mirror Sneakers",
  description: "Learn about Cavo Store, our vision of providing the best 1:1 mirror quality sneakers imported directly for our elite customers.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-zinc-950">
      <AboutContent />
    </div>
  );
}
