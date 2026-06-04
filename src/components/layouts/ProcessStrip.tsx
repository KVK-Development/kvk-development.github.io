import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeIn, staggerChildren } from "../../utils/motion";

type Stage = {
  label: string;
  desc: string;
  Icon: LucideIcon;
};

export default function ProcessStrip({ stages }: { stages: Stage[] }) {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-6xl mx-auto"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2">
        <div
          className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-redmesa/40 to-transparent"
          aria-hidden="true"
        />

        {stages.map((stage, i) => {
          const Icon = stage.Icon;
          return (
            <motion.div
              key={i}
              variants={fadeIn(i * 0.05)}
              className="relative flex flex-col items-center text-center px-3"
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-redmesa/20 blur-md scale-110" aria-hidden="true" />
                <div className="relative w-14 h-14 rounded-full bg-white border-2 border-redmesa/40 grid place-items-center text-redmesa shadow-sm">
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>

              <div className="text-[10px] tabular-nums tracking-[0.2em] text-zinc-400 mb-1">
                0{i + 1}
              </div>
              <h4 className="text-sm font-semibold tracking-tight text-darkmesa mb-2 uppercase">
                {stage.label}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-[16ch] mx-auto">
                {stage.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
