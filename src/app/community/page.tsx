"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Instagram, Music2, MessageCircle } from "lucide-react";

export default function CommunityPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center"><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black text-white mb-6">Join the <span className="text-amber-400">Cavo</span> Community</motion.h1><p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-12">Follow Cavo for product drops, styling ideas, and customer updates across our social channels.</p><div className="grid md:grid-cols-3 gap-6">{[{icon:Instagram,title:'Instagram',desc:'See fresh drops and campaign visuals.'},{icon:Music2,title:'TikTok',desc:'Watch styling clips and product highlights.'},{icon:MessageCircle,title:'Support',desc:'Reach out for order help and sizing questions.'}].map((item,i)=><motion.div key={item.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"><item.icon className="w-10 h-10 text-amber-400 mx-auto mb-5" /><h3 className="text-white font-bold text-2xl mb-3">{item.title}</h3><p className="text-zinc-400">{item.desc}</p></motion.div>)}</div></div></section><Footer /></main>
}
