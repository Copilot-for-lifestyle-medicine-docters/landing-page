"use client";

import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MotionFadeProps extends ComponentPropsWithoutRef<typeof motion.div> {
  delay?: number;
}

export function MotionFade({
  className,
  delay = 0,
  children,
  ...props
}: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
