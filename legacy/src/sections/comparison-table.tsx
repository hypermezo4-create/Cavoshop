"use client";

import { motion } from "framer-motion";
import { Check, X, Crown, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  { name: "Material Grade", market: "Standard Synthetic", cavo: "Original Leather/Suede" },
  { name: "Stitching Precision", market: "Machine Made", cavo: "1:1 Hand-Crafted" },
  { name: "Sole Comfort", market: "Basic Rubber", cavo: "Original Tech (Boost/Air)" },
  { name: "Box & Accessories", market: "Generic Box", cavo: "Full Original Packaging" },
  { name: "Weight Accuracy", market: "Lighter/Heavier", cavo: "Identical to Original" },
  { name: "UV Light Details", market: false, cavo: true },
  { name: "Direct Import", market: "Local Wholesalers", cavo: "Direct Factory Source" },
  { name: "Stock Quality Check", market: "Random", cavo: "Every Single Pair" },
  { name: "Smell Test (Glue)", market: "Strong Chemical", cavo: "Authentic Scent" },
  { name: "Durability", market: "3-6 Months", cavo: "Long-Term Performance" },
];

export function ComparisonTable() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Quality <span className="text-amber-400">Battle</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Don't get fooled by cheap replicas. See how Cavo Mirror Quality stands against the standard market versions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900/20 backdrop-blur-md shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-8 border-b border-white/5 bg-white/5">
              <div className="font-black text-xs uppercase tracking-widest text-zinc-400">Criteria</div>
              <div className="text-center">
                <span className="font-black text-xs uppercase tracking-widest text-zinc-500">Market Quality</span>
              </div>
              <div className="text-center">
                <span className="font-black text-xs uppercase tracking-widest text-amber-400 flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4" />
                  Cavo Mirror
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="divide-y divide-white/5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-3 gap-4 p-5 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{feature.name}</div>
                  <div className="flex items-center justify-center text-center">
                    {typeof feature.market === "boolean" ? (
                      feature.market ? (
                        <Check className="w-5 h-5 text-zinc-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-900/50" />
                      )
                    ) : (
                      <span className="text-xs font-bold text-zinc-600 uppercase tracking-tight">{feature.market}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {typeof feature.cavo === "boolean" ? (
                      feature.cavo ? (
                        <ShieldCheck className="w-5 h-5 text-amber-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500/50" />
                      )
                    ) : (
                      <span className="text-xs font-black text-amber-400 uppercase tracking-tight bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">{feature.cavo}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-3 gap-4 p-8 border-t border-white/5 bg-white/5">
              <div></div>
              <div className="hidden md:block"></div>
              <div className="text-center col-span-3 md:col-span-1">
                <Link href="/shop" className="w-full">
                  <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-tighter rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95">
                    Experience Perfection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
