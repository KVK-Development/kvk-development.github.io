import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../utils/motion";

const words = [
  "Least-Privilege",
  "Air-Gapped",
  "Audit Trails",
  "Zero-Leakage",
  "Compliance-Ready",
  "SOC2",
  "HIPAA",
  "PII Safe",
];

export default function BuzzwordBlock({ words }: { words: string[] }) {
  return (
    <motion.div
      variants={staggerChildren(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-wrap justify-center gap-3 mt-10"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={fadeIn(i * 0.02)}
          className="px-4 py-2 rounded-full bg-black text-white text-xs uppercase tracking-wide"
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}
