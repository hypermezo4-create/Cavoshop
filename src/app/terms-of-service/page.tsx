"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-4xl mx-auto"><motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"><FileText className="w-3.5 h-3.5" /> Legal</motion.div><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Terms of <span className="text-yellow-500">Service</span></motion.h1><div className="space-y-8 text-zinc-400 leading-relaxed"><section><h2 className="text-2xl font-bold text-white mb-4">1. Store Use</h2><p>By using Cavo Store, you agree to use the website lawfully and provide accurate information when contacting us or placing orders.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">2. Product Information</h2><p>We aim to present product details, images, and descriptions as accurately as possible, but minor variations may occur.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">3. Orders and Availability</h2><p>Orders are subject to product availability, verification, and acceptance. We may update or discontinue products at any time.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">4. Support and Conduct</h2><p>When interacting with Cavo support or social channels, please remain respectful and avoid abusive or misleading behavior.</p></section></div></div></section><Footer /></main>
}
