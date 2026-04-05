"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Ruler, Shirt, Footprints, Truck } from "lucide-react";

export default function SizeGuidePage() {
  const steps = [
    { icon: Footprints, title: "Measure Your Foot", desc: "Stand on paper, mark heel and longest toe, then measure the length in centimeters." },
    { icon: Ruler, title: "Compare With the Size Chart", desc: "Use the product-specific size chart whenever available for the best fit." },
    { icon: Shirt, title: "Consider Your Preferred Fit", desc: "Go true to size for a clean fit or size up if you prefer extra room." },
    { icon: Truck, title: "Need Help? Contact Support", desc: "If you are between sizes, our support team can guide you before you place the order." },
  ];
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-5xl mx-auto">
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black text-white mb-6">Cavo <span className="text-amber-400">Size Guide</span></motion.h1>
      <p className="text-zinc-400 text-lg mb-12 max-w-2xl">Use this guide to choose the right fit before ordering. For the most accurate result, always check the size notes on each product page.</p>
      <div className="grid md:grid-cols-2 gap-6">{steps.map((step,i)=><motion.div key={step.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className="rounded-[2rem] bg-white/[0.03] border border-white/10 p-8"><step.icon className="w-10 h-10 text-amber-400 mb-5" /><h3 className="text-white font-bold text-2xl mb-3">{step.title}</h3><p className="text-zinc-400">{step.desc}</p></motion.div>)}</div>
    </div></section><Footer /></main>
}
