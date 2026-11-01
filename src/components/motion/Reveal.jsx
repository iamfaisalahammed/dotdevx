"use client";

import { motion, useReducedMotion } from "motion/react";

// page.jsx সার্ভার কম্পোনেন্ট (metadata আছে), তাই animation এই ছোট ক্লায়েন্ট কম্পোনেন্টে আলাদা রাখলাম
export default function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}