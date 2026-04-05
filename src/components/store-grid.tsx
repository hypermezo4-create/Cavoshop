"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Package2, MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "@/lib/brand";

type Product = {
  id: string;
  name: string;
  brand: string;
  description?: string | null;
  image?: string | null;
  price?: string;
  badge?: string;
  categoryName?: string;
};

export function StoreGrid({ title, description, category }: { title: string; description: string; category?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category ? `/api/products?category=${category}` : "/api/products";
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const featured = useMemo(() => products, [products]);

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black text-white mb-4">{title}</motion.h1>
        <p className="text-zinc-400 max-w-2xl mb-10">{description}</p>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-80 rounded-[2rem] bg-white/[0.03] animate-pulse" />) : featured.length > 0 ? featured.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
              <div className="aspect-square rounded-t-[2rem] bg-gradient-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center overflow-hidden">
                {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <Package2 className="w-14 h-14 text-amber-400/70" />}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-2">{p.badge || p.categoryName || "Cavo"}</div>
                <h3 className="text-white font-bold text-xl mb-2">{p.name}</h3>
                <p className="text-zinc-500 text-sm mb-4 min-h-[40px]">{p.description || `Premium Cavo footwear crafted for style and all-day wear.`}</p>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-white font-black text-lg">{p.price || "Price on request"}</span>
                  <span className="text-zinc-500 text-sm">{p.brand}</span>
                </div>
                <a
                  href={createWhatsAppLink(`Hello Cavo, I want to order ${p.name}. Please send available sizes, colors, and final price.`)}
                  target="_blank"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
                >
                  <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                </a>
              </div>
            </motion.div>
          )) : <div className="col-span-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center text-zinc-400">No products found in this category yet. Add some from the admin dashboard.</div>}
        </div>
      </div>
    </section>
  );
}
