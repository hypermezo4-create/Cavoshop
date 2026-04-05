"use client";

import { motion } from "motion/react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSearch() {
  return (
    <section className="py-12 bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-[2rem] p-6 md:p-8 border border-white/5 bg-zinc-900/30 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                <Input
                  placeholder="Search for your next pair (e.g. Jordan 4, LV Trainer)..."
                  className="pl-12 bg-black/40 border-white/10 text-white h-14 rounded-2xl focus:border-amber-500/50 font-medium placeholder:text-zinc-600"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] h-14 bg-black/40 border-white/10 text-white rounded-2xl focus:ring-amber-500/20 font-black uppercase text-[10px] tracking-widest">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
                    <SelectItem value="all" className="focus:bg-amber-500 focus:text-black">All Brands</SelectItem>
                    <SelectItem value="NIKE" className="focus:bg-amber-500 focus:text-black">Nike</SelectItem>
                    <SelectItem value="JORDAN" className="focus:bg-amber-500 focus:text-black">Jordan</SelectItem>
                    <SelectItem value="ADIDAS" className="focus:bg-amber-500 focus:text-black">Adidas</SelectItem>
                    <SelectItem value="LV" className="focus:bg-amber-500 focus:text-black">Louis Vuitton</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="h-14 px-6 border-white/10 bg-black/40 text-white rounded-2xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-black uppercase text-[10px] tracking-widest">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
