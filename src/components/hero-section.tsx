"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { PremiumButton } from "./ui/premium-button";
import { useRouter } from "next/navigation";
import { CAVO_BRAND, createWhatsAppLink } from "@/lib/brand";

export function HeroSection() {
    const router = useRouter();

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-pulse border border-white/5">
                        <span className="w-2 h-2 bg-amber-400 rounded-full" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{CAVO_BRAND.heroAlert}</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white uppercase">
                        Walk Bold With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Cavo</span><br />Professional Shoe Store
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                        Explore premium sneakers, casual pairs, everyday essentials, and limited offers for men, women, and kids. Every product can be ordered instantly through WhatsApp.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-col sm:flex-row gap-6 mb-20">
                        <PremiumButton onClick={() => router.push("/shop")} icon={<ArrowRight className="w-5 h-5" />}>Shop Now</PremiumButton>
                        <a href={createWhatsAppLink("Hello Cavo, I want to place an order and know the available sizes.")} target="_blank" className="px-8 py-4 glass border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide">
                          <MessageCircle className="w-5 h-5 text-amber-400" /> Order on WhatsApp
                        </a>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {[
                            { icon: Star, title: "Premium Quality", desc: "High-grade materials, clean finishing, and carefully selected silhouettes." },
                            { icon: Truck, title: "Fast Response", desc: `Quick support and direct ordering on WhatsApp: ${CAVO_BRAND.phoneLocal}.` },
                            { icon: ShieldCheck, title: "Professional Store", desc: "Unified identity, organized categories, active offers, and smooth customer flow." },
                        ].map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }} className="p-8 rounded-3xl glass border border-white/5 text-left group hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-300">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/5"><feature.icon className="text-amber-400 w-6 h-6" /></div>
                                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
