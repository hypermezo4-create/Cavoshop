"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { HeroSection } from "@/components/hero-section";
import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";

function Counter({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(Math.floor(latest)),
        });
        return () => controls.stop();
    }, [value]);

    return <span>{display.toLocaleString()}</span>;
}

function StatsGrid() {
    const items = [
        { label: "Happy Customers", value: 12500, suffix: "+" },
        { label: "Premium Styles", value: 850, suffix: "+" },
        { label: "Fast Delivery", value: "24-48", isString: true, suffix: "h" },
        { label: "Quality Rating", value: "4.9", isString: true, suffix: "/5" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {items.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                            {stat.isString ? (
                                <>{stat.value}{stat.suffix}</>
                            ) : (
                                <><Counter value={stat.value as number} />{stat.suffix}</>
                            )}
                        </div>
                        <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen relative bg-zinc-950">
            <Starfield />
            <Navbar />

            <HeroSection />

            {/* Stats Section */}
            <section className="py-20 px-6">
                <StatsGrid />
            </section>

            {/* Shop Categories Section */}
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Men', 'Women', 'Kids'].map((category, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative h-96 rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-xl"
                            >
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                                
                                {/* Placeholder for Shoe Image (Can be replaced with actual <img> tag later) */}
                                <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                    <span className="text-zinc-700 font-bold text-xl">Image Placeholder</span>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{category}</h3>
                                    <div className="flex items-center text-amber-400 font-bold text-sm uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                                        <span>Explore Collection</span>
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Access Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-[1px] relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
                    <div className="absolute inset-0 bg-zinc-950 rounded-[3.5rem] m-[2px]" />

                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64 group-hover:bg-indigo-500/20 transition-colors duration-1000" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-500/10 blur-[100px] -ml-40 -mb-40 group-hover:bg-fuchsia-500/20 transition-colors duration-1000" />

                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Limited Editions</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
