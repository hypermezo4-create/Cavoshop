"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20",
  {
    variants: {
      variant: {
        default: "border-transparent bg-amber-500 text-black shadow-lg shadow-amber-500/10",
        secondary: "border-white/5 bg-zinc-900 text-zinc-400 hover:text-white",
        destructive: "border-transparent bg-red-500/10 text-red-500 border border-red-500/20",
        outline: "border-white/10 text-white bg-white/5 backdrop-blur-sm",
        // وسم خاص بجودة المرايا (Cavo Signature)
        mirror: "border-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 text-black shadow-xl",
        success: "border-transparent bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
        warning: "border-transparent bg-amber-500/10 text-amber-500 border border-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
