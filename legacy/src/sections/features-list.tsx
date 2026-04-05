"use client";

import { motion } from "framer-motion";
import { 
  Crown, 
  Footprints, 
  ShieldCheck, 
  Sparkles, 
  Truck,
  Box,
  Layers,
  HeartPulse,
  Gem,
  Award,
  Search,
  PackageCheck
} from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "1:1 Mirror Quality",
    description: "Every pair is an exact mirror of the original. We use the same blueprints and materials for 100% accuracy.",
  },
  {
    icon: Gem,
    title: "Original Materials",
    description: "From authentic Italian leather to genuine suede, we use the exact material grades used by luxury brands.",
  },
  {
    icon: HeartPulse,
    title: "Comfort Technology",
    description: "Our soles feature the same cushioning tech (Air, Boost, or Zoom) for maximum all-day comfort.",
  },
  {
    icon: Layers,
    title: "Precision Stitching",
    description: "Hand-finished stitching with zero loose threads. Our craftsmen pay attention to the smallest details.",
  },
  {
    icon: Box,
    title: "Original Packaging",
    description: "Receive your sneakers in the original-style box with all tags, extra laces, and accessories included.",
  },
  {
    icon: ShieldCheck,
    title: "Durability Guaranteed",
    description: "Built to last. Our shoes undergo stress tests to ensure they maintain their shape and grip over time.",
  },
  {
    icon: Search,
    title: "UV Detail Accuracy",
    description: "Even under UV light, our sneakers show the same hidden markings and stamps as the retail pairs.",
  },
  {
    icon: Footprints,
    title: "True to Size Fit",
    description: "Our molds are based on original lasts, ensuring a perfect 'True to Size' (TTS) fit every time.",
  },
  {
    icon: PackageCheck,
    title: "Double Boxed Shipping",
    description: "We protect your investment. All orders are double-boxed to ensure the original shoe box arrives mint.",
  },
  {
    icon: Award,
    title: "Expert QC Check",
    description: "Every pair is manually inspected by our Quality Control staff before being cleared for shipping.",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Fast and secure shipping lines directly from our warehouse to your doorstep in record time.",
  },
  {
    icon: Sparkles,
    title: "Elite Aesthetics",
    description: "Colors, textures, and shapes that are indistinguishable from retail. Wear your pair with total confidence.",
  },
];

export function FeaturesList() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Cavo Advantage</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Premium <span className="text-amber-400">Craftsmanship</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="glass rounded-[2rem] p-8 h-full bg-zinc-900/30 border border-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
