"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Crown, Star, Info, LayoutGrid, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/shop", label: "Collection", icon: ShoppingBag },
  { href: "/features", label: "Quality", icon: Star },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 text-black" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-amber-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-black text-white text-xl leading-none uppercase tracking-tighter">
              CAVO
            </span>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
              Store
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/5 p-1 rounded-2xl backdrop-blur-md">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "relative px-6 py-2 text-xs font-black uppercase tracking-widest transition-all",
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                )}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/shop">
            <Button variant="ghost" size="sm" className="text-zinc-400 font-black uppercase text-[10px] tracking-widest hover:text-amber-500">
              Catalog
            </Button>
          </Link>
          <Link href="https://wa.me/YOUR_NUMBER" target="_blank">
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-[10px] tracking-widest rounded-xl px-6 h-10 shadow-lg shadow-amber-500/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[350px] bg-zinc-950 border-white/5 p-0">
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none">CAVO</span>
                  <p className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">Premium Store</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-4 h-16 rounded-2xl px-6 text-sm font-black uppercase tracking-widest",
                          pathname === link.href ? "bg-white/10 text-amber-500" : "text-zinc-500"
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <Link href="/shop" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-white font-black uppercase text-xs tracking-widest">
                    <ShoppingBag className="w-5 h-5 mr-3 text-amber-500" />
                    Browse Shop
                  </Button>
                </Link>
                <Link href="https://wa.me/01221204322" target="_blank" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-xs tracking-widest">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Order via WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
