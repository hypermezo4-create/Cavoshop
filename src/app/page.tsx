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

            <section className="py-20 px-6">
                <StatsGrid />
            </section>

            <section className="py-32 px-6 text-center">
                <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-amber-500/20 to-zinc-900 p-[1px] relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-zinc-950 rounded-[3.5rem] m-[2px]" />
                    <div className="relative z-10 p-12 md:p-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase">
                            The <span className="text-amber-400">Premium</span> Choice
                        </h2>
                        <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                            High-quality mirror sneakers with perfect details and unmatched comfort.
                        </p>
                        <button className="px-12 py-6 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-tight">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
