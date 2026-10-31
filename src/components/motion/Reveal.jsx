"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const directions = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();

  const offset = directions[direction] || directions.up;

  const initialPosition = {
    opacity: 0,
    ...(offset.x !== undefined
      ? { x: offset.x > 0 ? distance : -distance }
      : {}),
    ...(offset.y !== undefined
      ? { y: offset.y > 0 ? distance : -distance }
      : {}),
  };

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : initialPosition}
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}