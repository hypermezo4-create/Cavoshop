"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types";

interface ProductListProps {
  products: any[]; // تم تغيير المسمى ليتناسب مع المتجر
}

// ألوان البراندات العالمية للأحذية
const brandColors: Record<string, string> = {
  NIKE: "from-blue-600/10 to-zinc-900/40",
  ADIDAS: "from-zinc-100/10 to-zinc-900/40",
  JORDAN: "from-red-600/10 to-zinc-900/40",
  LV: "from-amber-500/10 to-amber-900/40",
};

const brandBadgeColors: Record<string, string> = {
  NIKE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ADIDAS: "bg-zinc-100/10 text-zinc-400 border-white/10",
  JORDAN: "bg-red-500/20 text-red-400 border-red-500/30",
  LV: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function DeviceList({ products }: any) {
  if (!products || products.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-20 bg-zinc-900/20 rounded-[3rem] border border-white/5 backdrop-blur-md">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Our Collection is coming soon</h3>
            <p className="text-zinc-500 font-medium">
              We are currently updating our mirror-quality inventory.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/shop/${product.slug || product.id}`}>
                <Card className="group glass border-white/5 hover:border-amber-500/20 transition-all duration-500 overflow-hidden rounded-[2.5rem] bg-zinc-900/30">
                  <CardContent className="p-0">
                    {/* Image Area */}
                    <div className={`relative h-64 bg-gradient-to-br ${brandColors[product.brand] || brandColors.NIKE} overflow-hidden flex items-center justify-center`}>
                      <div className="relative z-10 text-center group-hover:scale-110 transition-transform duration-700">
                        <ShoppingBag className="w-16 h-16 text-zinc-700 opacity-50 mx-auto mb-2" />
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">{product.brand}</span>
                      </div>
                      
                      <div className="absolute top-6 right-6">
                        <Badge 
                          variant="outline" 
                          className={`${brandBadgeColors[product.brand] || brandBadgeColors.NIKE} font-black uppercase text-[10px] px-3 py-1 rounded-full`}
                        >
                          {product.brand}
                        </Badge>
                      </div>

                      <div className="absolute bottom-6 left-6">
                        <Badge className="bg-amber-500 text-black border-0 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-lg">
                          <Crown className="w-3 h-3 mr-1" />
                          Mirror Quality
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-amber-400 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                            {product.quality || "1:1 Original Specs"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-black text-amber-400">${product.price || '---'}</span>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase">Inc. Box</span>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-green-500">
                          <Check className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">In Stock</span>
                        </div>
                        <Button size="sm" variant="ghost" className="group/btn text-white font-black uppercase text-xs tracking-tighter hover:text-amber-400">
                          Shop Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
