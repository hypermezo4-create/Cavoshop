"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag, Sparkles, Phone, Home, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Men", href: "/men", icon: Grid },
    { name: "Women", href: "/women", icon: Grid },
    { name: "Kids", href: "/kids", icon: Grid },
    { name: "New Arrivals", href: "/new", icon: Sparkles },
    { name: "Contact", href: "/contact", icon: Phone },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5",
                scrolled && "bg-zinc-950/95 border-white/10 py-3 shadow-2xl"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                        <ShoppingBag className="text-zinc-950 w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white uppercase">
                        Cavo<span className="text-amber-400 text-sm ml-1 tracking-normal font-bold">Store</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-bold transition-colors rounded-lg flex items-center gap-2 uppercase tracking-wide",
                                    isActive ? "text-amber-400" : "text-zinc-400 hover:text-amber-300"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-amber-500/10 rounded-lg -z-10 border border-amber-500/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-zinc-400 hover:text-amber-400 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-2xl mt-2 mx-4 rounded-2xl overflow-hidden p-3 flex flex-col gap-1 border border-white/10 shadow-2xl"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-xl flex items-center gap-3 transition-colors",
                                pathname === item.href ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "text-zinc-400 hover:bg-white/5 hover:text-amber-300"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </nav>
    );
}
