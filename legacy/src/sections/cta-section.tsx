"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Crown, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-zinc-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden border border-white/5 bg-zinc-900/30 backdrop-blur-xl shadow-2xl">
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-24 h-24 rounded-3xl bg-amber-500 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
              >
                <Crown className="w-12 h-12 text-black" />
              </motion.div>

              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                Elevate Your <br />
                <span className="text-amber-400">Sneaker Game</span>
              </h2>

              <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join our elite community of sneaker enthusiasts. Experience the pinnacle of mirror quality craftsmanship and step into a new world of luxury.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="https://wa.me/YOUR_NUMBER" target="_blank" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-12 py-8 text-xl font-black rounded-2xl group uppercase tracking-tighter w-full shadow-xl shadow-amber-500/10 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Order Now
                  </Button>
                </Link>
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-12 py-8 text-xl font-black rounded-2xl group uppercase tracking-tighter w-full transition-all active:scale-95"
                  >
                    View Catalog
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { label: "Mirror Quality", icon: Star },
                  { label: "Secure Payments", icon: ShieldCheck },
                  { label: "Direct Import", icon: Crown },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
                    <item.icon className="w-4 h-4 text-amber-500/40" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
