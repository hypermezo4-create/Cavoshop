"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Crown, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { Icon: Crown, delay: 0, x: "10%", y: "20%" },
  { Icon: Star, delay: 0.2, x: "85%", y: "15%" },
  { Icon: ShieldCheck, delay: 0.4, x: "75%", y: "75%" },
  { Icon: ShoppingBag, delay: 0.6, x: "15%", y: "70%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-zinc-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Golden/Amber Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[128px] animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,158,11,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245,158,11,0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Luxury Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.2, 
              scale: 1,
              y: [0, -25, 0],
            }}
            transition={{
              opacity: { delay: delay + 0.5, duration: 0.5 },
              scale: { delay: delay + 0.5, duration: 0.5 },
              y: { delay: delay + 1, duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Icon className="w-10 h-10 text-amber-500" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              New Collection 2026 Live
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter uppercase text-white"
          >
            CAVO <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700">STORE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-3xl text-zinc-400 mb-6 font-black uppercase tracking-tight"
          >
            Step Into <span className="text-white italic">Premium</span> Experience
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Discover the world's most exclusive 1:1 mirror quality sneakers. 
            Imported directly, crafted with original materials for the true elite.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black px-12 py-8 text-xl font-black rounded-2xl group uppercase tracking-tighter w-full shadow-2xl shadow-amber-500/20"
              >
                <ShoppingBag className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Shop Now
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-12 py-8 text-xl font-black rounded-2xl group uppercase tracking-tighter w-full"
              >
                Our Story
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Footer Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/5 pt-12"
          >
            {[
              { label: "Mirror Quality 1:1", icon: Crown },
              { label: "Original Materials", icon: ShieldCheck },
              { label: "Worldwide Shipping", icon: Star },
            ].map(({ label, icon: Icon }, index) => (
              <div key={index} className="flex items-center gap-3 text-zinc-500 group">
                <Icon className="w-5 h-5 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                <span className="text-xs font-black uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-12 rounded-full border-2 border-amber-500/20 flex justify-center pt-2 backdrop-blur-sm"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
