"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Order, 
  Crown, 
  Check,
  AlertCircle,
  BookOpen,
  Ruler
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

const brandColors: Record<string, string> = {
  NIKE: "from-yellow-500/10 to-yellow-600/10 border-yellow-500/20",
  ADIDAS: "from-zinc-500/10 to-zinc-600/10 border-zinc-500/20",
  JORDAN: "from-red-500/10 to-red-600/10 border-red-500/20",
  LV: "from-amber-500/10 to-amber-600/10 border-amber-500/20",
};

const brandBadgeColors: Record<string, string> = {
  NIKE: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  ADIDAS: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  JORDAN: "bg-red-500/20 text-red-400 border-red-500/30",
  LV: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function ProductDetail({ product }: any) {
  // ملاحظة: قمت بترك اسم الـ Function والـ Props كما هي (ProductDetail) 
  // مؤقتاً لتجنب كسر الربط مع الصفحات الأخرى حتى نغيرها لاحقاً.
  
  return (
    <div className="container mx-auto px-4">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link href="/shop">
          <Button variant="ghost" className="pl-0 text-zinc-400 hover:text-amber-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </Link>
      </motion.div>

      {/* Product Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${brandColors[product.brand] || 'from-zinc-900 to-black'} border border-white/5 p-8 md:p-12 mb-8 shadow-2xl`}
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={`${brandBadgeColors[product.brand]} font-black uppercase tracking-widest text-[10px]`}>
                  {product.brand}
                </Badge>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-black text-[10px] uppercase">
                  <Crown className="w-3 h-3 mr-1" />
                  Mirror Quality
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-amber-400 mb-6">
                ${product.price} <span className="text-sm text-zinc-500 font-medium tracking-normal ml-2">Inc. original box</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-amber-500 hover:bg-amber-400 text-black font-black px-8 py-6 rounded-2xl uppercase tracking-tight shadow-xl shadow-amber-500/20">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>
                <Button variant="outline" className="border-white/10 text-white font-black px-8 py-6 rounded-2xl uppercase tracking-tight hover:bg-white/5">
                  View Gallery
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/3 aspect-square rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="text-zinc-700 font-black uppercase tracking-widest italic group-hover:scale-110 transition-transform duration-700">Shoe Image</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="glass mb-8 p-1 bg-zinc-900/50 border-white/5 rounded-2xl">
            <TabsTrigger value="details" className="rounded-xl px-8">Product Details</TabsTrigger>
            <TabsTrigger value="sizing" className="rounded-xl px-8">Sizing Guide</TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-xl px-8">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass border-white/5 bg-zinc-900/30 p-8 rounded-[2rem]">
                    <h3 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                        Premium Specifications
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: "Material", val: "Authentic Leather / Suede" },
                            { label: "Technology", val: "Original Cushioning Systems" },
                            { label: "Packaging", val: "Full Original Box & Tags" },
                            { label: "Weight", val: "1:1 Original Specs" }
                        ].map((item, i) => (
                            <li key={i} className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-zinc-500 font-bold uppercase text-xs">{item.label}</span>
                                <span className="text-zinc-200 font-black text-xs uppercase">{item.val}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="glass border-white/5 bg-zinc-900/30 p-8 rounded-[2rem]">
                    <h3 className="text-xl font-black text-white uppercase mb-6">Description</h3>
                    <p className="text-zinc-400 leading-relaxed font-medium">
                        Experience the pinnacle of footwear craftsmanship with Cavo's mirror quality collection. 
                        This pair is meticulously crafted using original materials to ensure the exact look, 
                        feel, and performance of the authentic version.
                    </p>
                </Card>
            </div>
          </TabsContent>

          <TabsContent value="sizing">
            <Card className="glass border-white/5 bg-zinc-900/30 p-8 rounded-[2rem]">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2 text-white uppercase font-black tracking-tighter">
                  <Ruler className="w-5 h-5 text-amber-400" />
                  Find Your Perfect Fit
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="font-black text-white uppercase text-sm mb-4">Available EU Sizes</h3>
                    <div className="flex flex-wrap gap-3">
                      {["40", "41", "42", "43", "44", "45"].map((size) => (
                        <div key={size} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center font-black text-zinc-400 hover:border-amber-500 hover:text-amber-400 cursor-pointer transition-all">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                    <h4 className="font-black text-amber-400 uppercase text-xs mb-2">Pro Tip</h4>
                    <p className="text-zinc-400 text-sm font-medium">
                      Our mirror quality sneakers fit "True to Size" (TTS). If you usually wear a 42 in original brands, order a 42 here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card className="glass border-white/5 bg-zinc-900/30 p-8 rounded-[2rem]">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2 text-white uppercase font-black">
                  <Truck className="w-5 h-5 text-amber-400" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-white font-black uppercase text-xs mb-2">Local Shipping</h4>
                        <p className="text-zinc-500 text-xs font-bold uppercase">24-48 Hours</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-white font-black uppercase text-xs mb-2">International</h4>
                        <p className="text-zinc-500 text-xs font-bold uppercase">5-10 Business Days</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-white font-black uppercase text-xs mb-2">Tracking</h4>
                        <p className="text-zinc-500 text-xs font-bold uppercase">Full ID provided</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                        <h4 className="text-red-500 font-black uppercase text-xs">Return Policy</h4>
                        <p className="text-zinc-500 text-sm font-medium mt-1">
                            Returns are only accepted if the product has a manufacturing defect or the wrong size was sent. 
                            The product must be in its original, unworn condition with all tags and box.
                        </p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
