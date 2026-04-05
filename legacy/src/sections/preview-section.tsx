"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const shoePreviews = [
  {
    id: 1,
    title: "LV Trainer Blue",
    description: "Premium calf leather with signature monogram embossing.",
    color: "from-blue-600/40 to-zinc-900/40",
  },
  {
    id: 2,
    title: "NB 9060 Rain Cloud",
    description: "Luxury suede overlays with mesh underlays for the ultimate dad-shoe vibe.",
    color: "from-zinc-500/40 to-zinc-900/40",
  },
  {
    id: 3,
    title: "AJ1 Retro High OG",
    description: "The timeless classic in original-grade leather and perfect shape.",
    color: "from-red-600/40 to-zinc-900/40",
  },
  {
    id: 4,
    title: "Adidas Campus 00s",
    description: "Bold proportions and premium suede for the perfect streetwear look.",
    color: "from-zinc-100/10 to-zinc-900/40",
  },
  {
    id: 5,
    title: "Dunk Low Panda",
    description: "High-quality leather construction in the most iconic colorway.",
    color: "from-zinc-400/20 to-zinc-900/40",
  },
];

export function PreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % shoePreviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shoePreviews.length) % shoePreviews.length);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-zinc-950">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.03)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">New Arrivals</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            The <span className="text-amber-400">Archive</span> Preview
          </h2>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Take a glimpse at our latest mirror-quality additions. Each pair is selected for its 
            unmatched attention to detail and original-grade materials.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Display Area */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden bg-zinc-900/50 border border-white/5 shadow-2xl backdrop-blur-md">
            <div className={`absolute inset-0 bg-gradient-to-br ${shoePreviews[currentIndex].color} opacity-40 transition-all duration-1000`} />
            
            {/* Center Content Mockup */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative w-full max-w-md h-full flex flex-col items-center justify-center">
                {/* Visual Placeholder for Shoe */}
                <div className="w-64 md:w-80 h-48 md:h-56 bg-zinc-800/80 rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ShoppingBag className="w-16 h-16 text-zinc-700 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Cavo Premium Store</div>
                </div>
                
                {/* Text Info */}
                <div className="mt-8 text-center px-4">
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                    {shoePreviews[currentIndex].title}
                  </h4>
                  <p className="text-sm text-zinc-400 font-medium max-w-xs mx-auto">
                    {shoePreviews[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 px-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/5 bg-white/5 text-white hover:bg-amber-500 hover:text-black transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div className="flex gap-3">
                {shoePreviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-10 bg-amber-500"
                        : "w-3 bg-white/10 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/5 bg-white/5 text-white hover:bg-amber-500 hover:text-black transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Fullscreen Viewer Trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/5 text-white border border-white/5 hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-zinc-950 border-white/10 backdrop-blur-2xl p-0 overflow-hidden rounded-[2rem]">
                <div className={`aspect-video w-full bg-gradient-to-br ${shoePreviews[currentIndex].color} flex items-center justify-center p-12`}>
                  <div className="text-center">
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                      {shoePreviews[currentIndex].title}
                    </h3>
                    <p className="text-lg text-white/60 font-medium max-w-md mx-auto">
                      {shoePreviews[currentIndex].description}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Thumbnails Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            {shoePreviews.map((shoe, index) => (
              <button
                key={shoe.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-24 h-16 rounded-2xl overflow-hidden transition-all duration-500 border-2 ${
                  index === currentIndex
                    ? "border-amber-500 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${shoe.color}`} />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
