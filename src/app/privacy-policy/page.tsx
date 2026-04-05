"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-4xl mx-auto"><motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"><Shield className="w-3.5 h-3.5" /> Privacy</motion.div><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Privacy <span className="text-yellow-500">Policy</span></motion.h1><div className="space-y-8 text-zinc-400 leading-relaxed"><section><h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2><p>We may collect your name, email, shipping-related details, messages, and basic browsing data when you interact with Cavo Store.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">How We Use It</h2><p>We use this information to respond to messages, improve the storefront, process customer inquiries, and support orders.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2><p>We use reasonable safeguards to protect submitted information and limit access to authorized staff only.</p></section><section><h2 className="text-2xl font-bold text-white mb-4">Your Choices</h2><p>You can contact us any time to request updates or removal of personal information shared through our contact forms.</p></section></div></div></section><Footer /></main>
}
