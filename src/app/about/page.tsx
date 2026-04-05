"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Globe, HeartHandshake, Shield, Gem } from "lucide-react";

export default function AboutPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-7xl mx-auto">
      <div className="text-center mb-20"><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-4xl md:text-6xl font-bold mb-6 text-white">About <span className="text-gradient">Cavo</span></motion.h1>
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-zinc-400 text-lg max-w-2xl mx-auto">Cavo is a footwear brand built around sharp design, premium materials, and a shopping experience that feels modern from first click to final delivery.</motion.p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32"><motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="space-y-6"><h2 className="text-3xl font-bold text-white">Our Story</h2><p className="text-zinc-400 leading-relaxed">We created Cavo for people who want premium sneakers and everyday footwear without compromising on style, comfort, or detail.</p><p className="text-zinc-400 leading-relaxed">From statement silhouettes to versatile daily pairs, every collection is curated to help customers move confidently.</p></motion.div><motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} className="glass p-1 rounded-[3rem]"><div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-12 rounded-[2.8rem] flex items-center justify-center"><Globe className="w-32 h-32 text-yellow-500 opacity-50" /></div></motion.div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[
        { icon: HeartHandshake, title: "Customer Focused", desc: "Every collection and every touchpoint is built around what customers actually want to wear." },
        { icon: Shield, title: "Premium Quality", desc: "We prioritize comfort, durability, and polished finishing in every pair we present." },
        { icon: Gem, title: "Curated Selection", desc: "Cavo brings together timeless essentials and fresh drops in one refined storefront." },
      ].map((item, i) => <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5"><item.icon className="w-10 h-10 text-yellow-500 mb-6" /><h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3><p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p></motion.div>)}</div>
    </div></section><Footer /></main>;
}
