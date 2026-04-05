"use client";

import Link from "next/link";
import { Crown, Instagram, MessageCircle, Mail, MapPin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/shop" },
    { label: "Best Sellers", href: "/shop" },
    { label: "Mirror Quality Guide", href: "/features" },
    { label: "All Collection", href: "/shop" },
  ],
  brand: [
    { label: "Our Story", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Wholesale", href: "#" },
  ],
  support: [
    { label: "Order Tracking", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Returns & Exchanges", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 backdrop-blur-md">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">CAVO</span>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] -mt-1">Premium Store</p>
              </div>
            </Link>
            <p className="text-sm text-zinc-500 mb-8 max-w-xs font-medium leading-relaxed">
              The ultimate destination for 1:1 mirror quality sneakers. We bring the world's most exclusive footwear directly to your doorstep.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black transition-all"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-5 h-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Brand</h4>
            <ul className="space-y-3">
              {footerLinks.brand.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} CAVO PREMIUM STORE.
            </p>
            <p className="text-[10px] text-zinc-600 font-bold uppercase">
              All rights reserved. Designed for the elite.
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
             <MapPin className="w-3 h-3 text-amber-500" />
             <span className="text-[10px] font-black uppercase tracking-widest">Available in Cairo & Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
