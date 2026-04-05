"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ShoppingBag, Star, CheckCircle2, Users } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: 12500, suffix: "+", icon: Users },
  { label: "Premium Models", value: 850, suffix: "+", icon: ShoppingBag },
  { label: "Quality Rating", value: 99, suffix: "%", icon: Star },
  { label: "Verified Imports", value: 100, suffix: "%", icon: CheckCircle2 },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = Math.max(value / steps, 1);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 relative bg-zinc-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass rounded-[2rem] p-8 text-center bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-lg shadow-amber-500/5">
                  <stat.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
