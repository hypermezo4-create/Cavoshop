import Link from "next/link";
import { Instagram, MessageCircle, PhoneCall } from "lucide-react";
import { CavoLogo } from "@/components/cavo-logo";
import { CAVO_BRAND, createWhatsAppLink } from "@/lib/brand";

const quickLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Offers", href: "/offers" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <CavoLogo />
            <p className="mt-4 text-zinc-500 max-w-sm text-sm">
              Premium footwear store with professional catalog management, direct WhatsApp ordering, and a unified Cavo identity across the whole experience.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">{quickLinks.map((link) => <Link key={link.href} href={link.href} className="text-zinc-500 hover:text-amber-400 transition-colors text-sm">{link.label}</Link>)}</div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Order & Support</h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <a href={createWhatsAppLink()} target="_blank" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp: {CAVO_BRAND.phoneLocal}
              </a>
              <a href={`tel:${CAVO_BRAND.phoneLocal}`} className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <PhoneCall className="w-4 h-4" /> Call us directly
              </a>
              <a href={createWhatsAppLink("Hello Cavo, I want your latest offers and available sizes.")} target="_blank" className="inline-flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-bold text-amber-300">
                <Instagram className="w-4 h-4" /> Order now on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 justify-between text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Cavo Store. Premium footwear, professional service, fast WhatsApp orders.</p>
          <div className="flex gap-4"><Link href="/privacy-policy" className="hover:text-amber-400">Privacy Policy</Link><Link href="/terms-of-service" className="hover:text-amber-400">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
}
