"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // الزرار الأساسي بتاع كافو (ذهبي ملكي)
        default: "bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/40",
        destructive: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white",
        outline: "border-2 border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20",
        secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
        ghost: "text-zinc-500 hover:text-white hover:bg-white/5",
        link: "text-amber-500 underline-offset-4 hover:underline",
        // جرايدينت الذهب المخصص للكوليكشن الفخم
        gradient: "bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 text-black hover:opacity-90 shadow-xl",
        // زرار القزاز الأسود
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 rounded-xl px-4 text-[10px]",
        lg: "h-14 rounded-[1.5rem] px-10 text-sm",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
