"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// هنا هتقدر تغير العناوين والصور بعدين
const galleryItems = [
  { id: 1, title: "LV Trainer Blue", brand: "Louis Vuitton", color: "from-yellow-600/20 to-zinc-900" },
  { id: 2, title: "NB 9060 Rain Cloud", brand: "New Balance", color: "from-zinc-500/20 to-zinc-900" },
  { id: 3, title: "AJ1 Retro High", brand: "Jordan", color: "from-red-600/20 to-zinc-900" },
  { id: 4, title: "Adidas Campus 00s", brand: "Adidas", color: "from-green-600/20 to-zinc-900" },
  { id: 5, title: "Dunk Low Panda", brand: "Nike", color: "from-zinc-300/10 to-zinc-900" },
  { id: 6, title: "Travis Scott Canary", brand: "Jordan", color: "from-yellow-500/20 to-zinc-900" },
];

export function GalleryGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Lookbook</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Premium <span className="text-amber-400">Archive</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 relative shadow-2xl">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
                
                {/* Placeholder text for shoe image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center group-hover:scale-110 transition-transform duration-700">
                    <Search className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <span className="text-zinc-600 font-black uppercase text-[10px] tracking-widest italic">{item.brand}</span>
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{item.brand}</p>
                        <p className="text-xl font-black text-white uppercase tracking-tighter">{item.title}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox - Full View */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-8 right-8 text-white hover:bg-white/10"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 md:left-8 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-12 h-12" />
          </Button>

          <div
            className="aspect-[4/5] w-full max-w-[500px] rounded-[3rem] overflow-hidden relative border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${galleryItems[currentIndex].color}`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <span className="text-amber-500 font-black uppercase tracking-[0.4em] mb-4 text-sm">{galleryItems[currentIndex].brand}</span>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">{galleryItems[currentIndex].title}</h3>
                <div className="w-20 h-1 bg-amber-500 rounded-full mb-8" />
                <p className="text-zinc-400 font-medium">1:1 Mirror Quality - Original Grade Materials</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 md:right-8 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-12 h-12" />
          </Button>
        </motion.div>
      )}
    </section>
  );
}
