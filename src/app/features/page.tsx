"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Shield, Zap, Footprints, Truck, Gem, Lock, LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Gem, title: "Premium Materials", description: "Carefully selected materials and sharp finishing across every pair." },
  { icon: Footprints, title: "All-Day Comfort", description: "Built for movement with supportive fits and easy everyday wear." },
  { icon: Zap, title: "Fresh Drops", description: "New styles and curated releases added to keep the catalog current." },
  { icon: Truck, title: "Fast Delivery", description: "Efficient order handling and reliable shipping support." },
  { icon: Shield, title: "Quality Control", description: "Each product is chosen with consistency, comfort, and detail in mind." },
  { icon: Lock, title: "Secure Checkout", description: "A smooth, modern storefront experience backed by secure browsing." },
];

export default function FeaturesPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-7xl mx-auto">
      <div className="text-center mb-16"><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black text-white mb-6">Why <span className="text-amber-400">Cavo</span></motion.h1><p className="text-zinc-400 max-w-2xl mx-auto text-lg">Cavo is built for customers who want a premium footwear experience, from clean visuals to dependable service and standout product selection.</p></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{features.map((feature, i)=><motion.div key={feature.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"><feature.icon className="w-10 h-10 text-amber-400 mb-5" /><h3 className="text-white font-bold text-2xl mb-3">{feature.title}</h3><p className="text-zinc-400 leading-relaxed">{feature.description}</p></motion.div>)}</div>
    </div></section><Footer /></main>
}
