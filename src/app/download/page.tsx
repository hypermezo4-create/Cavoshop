"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Search, Monitor, Cpu, ShoppingBag as OrderIcon, ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OrderPage() {

    const [search, setSearch] = useState("");
    const [activeBrand, setActiveBrand] = useState("All");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/devices");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Order page product fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const brands = ["All", ...Array.from(new Set(products.map((d) => d.brand)))];

    const filteredProducts = products.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.codename.toLowerCase().includes(search.toLowerCase());
        const matchesBrand = activeBrand === "All" || d.brand === activeBrand;
        return matchesSearch && matchesBrand;
    });

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-8 font-display"
                        >
                            Shop <span className="text-yellow-500">Cavo</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-500 text-lg max-w-2xl mx-auto mb-16"
                        >
                            Choose a collection to explore available styles and order links.
                        </motion.p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto mb-16">
                            <div className="flex-1 relative group w-full">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-yellow-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 backdrop-blur-xl transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar w-full md:w-auto">
                                {brands.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => setActiveBrand(brand)}
                                        className={cn(
                                            "px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shrink-0 whitespace-nowrap",
                                            activeBrand === brand
                                                ? "bg-yellow-600 text-white shadow-lg shadow-yellow-600/20"
                                                : "bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 border border-white/5"
                                        )}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[400px] rounded-[2.5rem] glass border border-white/5 p-10 flex flex-col justify-between overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -mr-16 -mt-16" />
                                    <div>
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="w-16 h-16 bg-white/5 rounded-2xl animate-pulse" />
                                            <div className="w-20 h-6 bg-white/5 rounded-lg animate-pulse" />
                                        </div>
                                        <div className="w-3/4 h-8 bg-white/5 rounded-xl animate-pulse mb-4" />
                                        <div className="w-1/2 h-4 bg-white/5 rounded-lg animate-pulse" />
                                    </div>
                                    <div className="w-full h-14 bg-white/5 rounded-2xl animate-pulse" />
                                </div>
                            ))
                        ) : (
                            filteredProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    layout
                                    className="relative group"
                                >
                                    <Link href={`/order/${product.codename}`} className="block h-full">
                                        <div className="h-full rounded-[2.5rem] glass group-hover:bg-white/[0.03] transition-all duration-500 overflow-hidden relative border border-white/10 group-hover:border-yellow-500/50 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
                                            {/* Premium Glare Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/5 blur-[40px] -mr-16 -mt-16 rounded-full group-hover:bg-yellow-600/20 transition-all duration-700" />

                                            <div className="p-10 relative z-10">
                                                <div className="flex items-start justify-between mb-10">
                                                    <div className="w-16 h-16 bg-yellow-500/10 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-500">
                                                        <Monitor className="text-yellow-500 w-8 h-8" />
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="px-3 py-1 bg-white/5 text-zinc-400 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5 group-hover:border-yellow-500/30 group-hover:text-yellow-400 transition-colors">
                                                            {product.brand}
                                                        </span>
                                                        <span className="text-[10px] text-zinc-600 mt-2 font-mono uppercase tracking-tighter group-hover:text-zinc-400 transition-colors">{product.codename}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-yellow-400 transition-all duration-500">{product.name}</h3>

                                                <div className="space-y-3 mb-10 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Cpu className="w-4 h-4 text-zinc-600 group-hover:text-yellow-500/50 transition-colors" />
                                                        {product.chipset}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                                        <OrderIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-yellow-500/50 transition-colors" />
                                                        {product.romCount || 0} Styles Available
                                                    </div>
                                                </div>

                                                <div className="w-full py-5 bg-yellow-600/10 group-hover:bg-yellow-600 text-yellow-500 group-hover:text-white rounded-2xl font-bold transition-all duration-500 flex items-center justify-center gap-3 border border-yellow-500/20 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-yellow-600/30">
                                                    View Details <ChevronLeft className="w-5 h-5 group-hover:translate-x-1 rotate-180 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-32 rounded-[3rem] border border-white/5 glass">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-zinc-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No product matches found</h3>
                            <p className="text-zinc-500 mb-8">We couldn't find any products matching "{search}" in {activeBrand}.</p>
                            <button
                                onClick={() => { setSearch(""); setActiveBrand("All"); }}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                            >
                                Reset Search Parameters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
