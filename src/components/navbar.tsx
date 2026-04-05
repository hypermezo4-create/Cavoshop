"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Phone, Home, Grid, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CavoLogo } from "@/components/cavo-logo";
import { CAVO_BRAND, createWhatsAppLink } from "@/lib/brand";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Men", href: "/men", icon: Grid },
  { name: "Women", href: "/women", icon: Grid },
  { name: "Kids", href: "/kids", icon: Grid },
  { name: "Shop", href: "/shop", icon: Sparkles },
  { name: "Offers", href: "/offers", icon: ShieldCheck },
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
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4", "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5", scrolled && "bg-zinc-950/95 border-white/10 py-3 shadow-2xl")}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <CavoLogo compact />
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("relative px-4 py-2 text-sm font-bold transition-colors rounded-lg flex items-center gap-2 uppercase tracking-wide", isActive ? "text-amber-400" : "text-zinc-400 hover:text-amber-300")}>
                {isActive && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-amber-500/10 rounded-lg -z-10 border border-amber-500/20" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                <item.icon className="w-4 h-4" />{item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={createWhatsAppLink("Hello Cavo, I want to order shoes from your store.")} target="_blank" className="rounded-2xl bg-amber-500 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:brightness-110">
            WhatsApp Order
          </a>
          <div className="rounded-2xl border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-300">
            {CAVO_BRAND.phoneLocal}
          </div>
        </div>
        <button className="md:hidden p-2 text-zinc-400 hover:text-amber-400 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-2xl mt-2 mx-4 rounded-2xl overflow-hidden p-3 flex flex-col gap-1 border border-white/10 shadow-2xl">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={cn("px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-xl flex items-center gap-3 transition-colors", pathname === item.href ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "text-zinc-400 hover:bg-white/5 hover:text-amber-300")}>
              <item.icon className="w-5 h-5" />{item.name}
            </Link>
          ))}
          <a href={createWhatsAppLink("Hello Cavo, I want help choosing shoes.")} target="_blank" className="mt-2 px-4 py-3 rounded-xl bg-amber-500 text-center text-sm font-black uppercase tracking-wide text-black">
            WhatsApp {CAVO_BRAND.phoneLocal}
          </a>
        </motion.div>
      )}
    </nav>
  );
}
