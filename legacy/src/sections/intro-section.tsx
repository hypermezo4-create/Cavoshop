"use client";

import { motion } from "framer-motion";
import { Crown, Star, ShieldCheck, Zap, Heart, Box } from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "Elite Selection",
    description: "Curated collections of the most sought-after sneakers, imported directly from top-tier global factories.",
  },
  {
    icon: ShieldCheck,
    title: "1:1 Verification",
    description: "Every pair undergoes a rigorous 5-point inspection to ensure absolute mirror-quality accuracy.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Fast local shipping within 24-48 hours. We value your time as much as your style.",
  },
  {
    icon: Box,
    title: "Full Packaging",
    description: "Receive your pair with the original-style box, extra laces, and all authentic accessories included.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Dedicated support for our elite community. We ensure your satisfaction from order to unboxing.",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "More than just a store; Cavo is a lifestyle for those who demand perfection in every step.",
  },
];

export function IntroSection() {
  return (
    <section className="py-32 relative bg-zinc-950 overflow-hidden">
        {/* إضاءة خلفية خفيفة */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Cavo Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            Step Into <span className="text-amber-400">Excellence</span>
          </h2>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Cavo Store is the premier destination for high-end mirror quality sneakers. 
            We specialize in providing 1:1 replicas that are indistinguishable from the original, 
            crafted with authentic materials for the true sneaker enthusiast.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-[2.5rem] p-8 h-full bg-zinc-900/20 border border-white/5 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden shadow-2xl">
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
