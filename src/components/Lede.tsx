import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../utils/motion";

interface LedeProps {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  light?: boolean;
}

export default function Lede({ eyebrow, title, children, light = true }: LedeProps) {
  return (
    <section className={`flex justify-center px-6 py-24 ${light ? "bg-white" : "bg-gray-50"} text-black`}>
      <motion.div
        variants={staggerChildren(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl w-full text-left space-y-6"
      >
        <motion.div
          variants={fadeIn(0)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-redmesa font-medium"
        >
          <span className="h-px w-8 bg-redmesa/60" />
          {eyebrow}
        </motion.div>
        <motion.h2
          variants={fadeIn(0.1)}
          className="text-4xl md:text-5xl font-bold tracking-tight text-darkmesa leading-tight"
        >
          {title}
        </motion.h2>
        <motion.div variants={fadeIn(0.2)} className="space-y-6 text-lg text-zinc-700 leading-relaxed">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
