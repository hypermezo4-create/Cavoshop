"use client";

import { motion } from "framer-motion";
import { Target, Eye, Star, Trophy, Crown, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Crown,
    title: "Mirror Quality",
    description: "We don't settle for 'good'. We only import 1:1 mirror quality that matches the original in every single detail and stitch.",
  },
  {
    icon: Trophy,
    title: "Hand-Picked",
    description: "Every pair in Cavo is personally inspected. We travel to the source to ensure the materials meet our premium standards.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    description: "Cavo is built on trust. We provide honest descriptions and real photos of our stock, ensuring you get exactly what you see.",
  },
  {
    icon: Star,
    title: "Elite Experience",
    description: "Shopping at Cavo is more than a transaction; it's an entry into an elite club of sneaker enthusiasts who value perfection.",
  },
];

const milestones = [
  { year: "2023", event: "Cavo Brand founded with a vision for quality" },
  { year: "2024", event: "First physical shop opened for elite customers" },
  { year: "2024", event: "Established direct import lines from top factories" },
  { year: "2025", event: "Opened our second flagship branch" },
  { year: "2026", event: "Launched Cavo Digital Store for worldwide reach" },
];

export function AboutContent() {
  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <span className="text-amber-400 font-black uppercase tracking-[0.3em] mb-4 block text-xs">Our Heritage</span>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
          The <span className="text-amber-400">Cavo</span> Story
        </h1>
        <p className="text-lg text-zinc-400 font-medium">
          From a passion for authentic aesthetics to becoming a leading name in premium mirror sneakers.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass border-white/5 h-full bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-6 border border-amber-500/20">
                <Target className="w-7 h-7 text-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed font-medium">
                To bridge the gap between luxury and accessibility by providing the highest 
                available quality of mirror sneakers. We aim to empower sneaker lovers 
                to wear their dreams without compromising on the authentic feel and durability.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass border-white/5 h-full bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-400/20 to-zinc-600/20 flex items-center justify-center mb-6 border border-white/10">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Our Vision</h2>
              <p className="text-zinc-400 leading-relaxed font-medium">
                To become the ultimate destination for premium footwear in the region, 
                known for our integrity, exclusive collections, and unparalleled 
                customer service. We envision a community where style knows no limits.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-4xl font-black text-white text-center uppercase tracking-tighter mb-12">
          Our Core <span className="text-amber-400">Values</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass border-white/5 h-full hover:border-amber-500/30 transition-colors duration-500 bg-zinc-900/30">
                <CardContent className="p-6 text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <value.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mb-2">{value.title}</h3>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quality Commitment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-20"
      >
        <Card className="glass border-white/5 bg-gradient-to-br from-zinc-900 to-black overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -mr-32 -mt-32" />
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">
                  Quality <span className="text-amber-400">Commitment</span>
                </h2>
                <p className="text-zinc-400 font-medium mb-8 leading-relaxed">
                  Every product at Cavo undergoes a rigorous 5-point inspection before 
                  reaching your hands. We ensure that every material, from the leather 
                  to the sole, is identical to the original manufacture.
                </p>
                <ul className="space-y-4">
                  {[
                    "Directly imported from top-tier factories",
                    "Authentic original-grade materials",
                    "Real-time stock tracking",
                    "Premium packaging included",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-zinc-300 font-bold uppercase tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="aspect-square max-w-sm mx-auto rounded-[3rem] bg-zinc-800 flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="text-center relative z-10">
                    <Crown className="w-20 h-20 text-amber-400 mx-auto mb-4 drop-shadow-2xl" />
                    <p className="text-xl font-black text-white uppercase">Mirror Grade</p>
                    <p className="text-xs text-amber-500/60 font-black uppercase tracking-[0.2em]">Cavo Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pb-20"
      >
        <h2 className="text-2xl md:text-4xl font-black text-white text-center uppercase tracking-tighter mb-16">
          Our <span className="text-amber-400">Journey</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  {index % 2 === 0 && (
                    <>
                      <span className="text-3xl font-black text-white">{milestone.year}</span>
                      <p className="text-zinc-500 font-bold uppercase text-xs mt-1">{milestone.event}</p>
                    </>
                  )}
                </div>
                
                <div className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-amber-500 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-3xl font-black text-white md:hidden">{milestone.year}</span>
                  {index % 2 !== 0 ? (
                    <>
                      <span className="text-3xl font-black text-white hidden md:inline">{milestone.year}</span>
                      <p className="text-zinc-500 font-bold uppercase text-xs mt-1">{milestone.event}</p>
                    </>
                  ) : (
                    <p className="text-zinc-500 font-bold uppercase text-xs mt-1 md:hidden">{milestone.event}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
