"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
const products = [
  { name: "New Arrivals Runner", tag: "Best Seller" },
  { name: "New Arrivals Street Low", tag: "New Drop" },
  { name: "New Arrivals Classic", tag: "Everyday" },
  { name: "New Arrivals Elite", tag: "Premium" },
];
export default function CategoryPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
  <section className="pt-32 pb-20 px-6"><div className="max-w-7xl mx-auto">
  <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl font-black text-white mb-4">New Arrivals</motion.h1>
  <p className="text-zinc-400 max-w-2xl mb-10">Discover standout pairs from the Cavo New Arrivals lineup. Clean design, premium comfort, and versatile styling.</p>
  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">{products.map((p,i)=><motion.div key={p.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"><div className="aspect-square rounded-[1.5rem] bg-gradient-to-br from-yellow-500/10 to-orange-500/10 mb-5" /><div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-2">{p.tag}</div><h3 className="text-white font-bold text-xl mb-2">{p.name}</h3><p className="text-zinc-500 text-sm">Premium Cavo footwear crafted for style and all-day wear.</p></motion.div>)}</div></div></section><Footer /></main>
}
