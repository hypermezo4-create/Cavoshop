"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ShoppingBag, Ruler, Loader2, MessageCircle } from "lucide-react";
import { CAVO_BRAND, createWhatsAppLink } from "@/lib/brand";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "general", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setSubmitted(true); setFormData({ name: "", email: "", type: "general", subject: "", message: "" }); }
    } finally { setSubmitting(false); }
  };
  const types=[{ value:"general", icon:ShoppingBag, label:"General Inquiry" },{ value:"order", icon:Mail, label:"Order Help" },{ value:"size", icon:Ruler, label:"Sizing Help" }];
  return <main className="min-h-screen relative"><Starfield /><Navbar />
    <section className="pt-40 pb-20 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"><Mail className="w-3.5 h-3.5" /> Contact Cavo</motion.div>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Contact & <span className="text-yellow-500">Support</span></motion.h1>
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-zinc-400 text-lg mb-12 leading-relaxed">Need help with sizing, orders, stock, or wholesale? Send us a message or go directly to WhatsApp for the fastest response.</motion.p>
      <div className="mb-8 flex flex-wrap gap-4"><a href={createWhatsAppLink("Hello Cavo, I need help with an order.")} target="_blank" className="inline-flex items-center gap-3 rounded-2xl bg-amber-500 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black"><MessageCircle className="w-4 h-4" /> WhatsApp {CAVO_BRAND.phoneLocal}</a></div>{submitted ? <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="bg-green-500/10 border border-green-500/20 rounded-3xl p-12 text-center"><div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><MessageSquare className="w-8 h-8 text-green-500" /></div><h2 className="text-3xl font-bold text-white mb-4">Message Sent</h2><p className="text-zinc-400 mb-8">Thanks for contacting Cavo. Our team will reply as soon as possible.</p><button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all">Send Another Message</button></motion.div> :
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-2"><label className="text-zinc-400 text-sm font-semibold ml-2">Your Name</label><input required type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="John Doe" /></div><div className="space-y-2"><label className="text-zinc-400 text-sm font-semibold ml-2">Email</label><input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="john@example.com" /></div></div>
        <div className="space-y-3"><label className="text-zinc-400 text-sm font-semibold ml-2">Topic</label><div className="grid md:grid-cols-3 gap-4">{types.map((type)=><button key={type.value} type="button" onClick={()=>setFormData({...formData,type:type.value})} className={`p-5 rounded-2xl border transition-all text-left ${formData.type===type.value ? "border-yellow-500/40 bg-yellow-500/10" : "border-white/10 bg-white/5 hover:border-yellow-500/20"}`}><type.icon className="w-5 h-5 text-yellow-500 mb-3" /><div className="text-white font-semibold">{type.label}</div></button>)}</div></div>
        <div className="space-y-2"><label className="text-zinc-400 text-sm font-semibold ml-2">Subject</label><input required type="text" value={formData.subject} onChange={(e)=>setFormData({...formData,subject:e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="How can we help?" /></div>
        <div className="space-y-2"><label className="text-zinc-400 text-sm font-semibold ml-2">Message</label><textarea required rows={6} value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-yellow-500/50 outline-none resize-none" placeholder="Tell us more about your question..." /></div>
        <button type="submit" disabled={submitting} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl font-bold text-white shadow-xl shadow-yellow-500/20 inline-flex items-center gap-3">{submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}</button>
      </form>}
    </div></section><Footer /></main>
}
