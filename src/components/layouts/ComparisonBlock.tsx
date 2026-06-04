import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeIn, staggerChildren } from "../../utils/motion";

type Side = {
  label: string;
  caption: string;
  items: string[];
};

export default function ComparisonBlock({
  left,
  right,
}: {
  left: Side;
  right: Side;
}) {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
    >
      <motion.div
        variants={fadeIn(0)}
        className="relative rounded-2xl border border-redmesa/30 bg-gradient-to-br from-redmesa/5 to-transparent p-8 lg:p-10"
      >
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-redmesa font-semibold">
            {left.label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            yours
          </span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-darkmesa mb-6">
          {left.caption}
        </h3>
        <ul className="space-y-3">
          {left.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
              <Check size={16} className="text-redmesa shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={fadeIn(0.1)}
        className="relative rounded-2xl border border-zinc-200 bg-zinc-50/60 p-8 lg:p-10"
      >
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
            {right.label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            theirs
          </span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-500 mb-6">
          {right.caption}
        </h3>
        <ul className="space-y-3">
          {right.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-500 leading-relaxed">
              <X size={16} className="text-zinc-400 shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="line-through decoration-zinc-300">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
