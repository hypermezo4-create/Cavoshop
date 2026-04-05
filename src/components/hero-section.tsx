"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";
import { PremiumButton } from "./ui/premium-button";
import { useRouter } from "next/navigation";

export function HeroSection() {
    const [heroAlert, setHeroAlert] = useState("New Arrivals: Premium Mirror Sneakers");
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data.heroAlertText) setHeroAlert(data.heroAlertText);
            } catch (err) {
                console.error("Hero fetch failed", err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-pulse border border-white/5"
                    >
                        <span className="w-2 h-2 bg-amber-400 rounded-full" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{heroAlert}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white uppercase"
                    >
                        Step Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Premium</span><br />
                        Footwear
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
                    >
                        Discover the ultimate collection of exact 1:1 mirror sneakers. Perfectly crafted details, top-tier imported materials, and unmatched comfort for your everyday style.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 mb-20"
                    >
                        <PremiumButton
                            onClick={() => router.push("/shop")}
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            Shop Now
                        </PremiumButton>
                        <button
                            onClick={() => router.push("/categories")}
                            className="px-8 py-4 glass border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide"
                        >
                            Explore Collections
                        </button>
                    </motion.div>

                    {/* Key Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {[
                            { icon: Star, title: "Top Quality", desc: "Exact mirror quality with premium imported materials." },
                            { icon: Truck, title: "Fast Shipping", desc: "Quick and secure delivery right to your doorstep." },
                            { icon: ShieldCheck, title: "Secure Shopping", desc: "100% safe payments and dedicated customer support." },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                className="p-8 rounded-3xl glass border border-white/5 text-left group hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/5">
                                    <feature.icon className="text-amber-400 w-6 h-6" />
                                </div>
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
