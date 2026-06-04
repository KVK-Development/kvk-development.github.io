import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeIn, staggerChildren } from "../../utils/motion";

type Item = {
  title: string;
  desc: string;
  Icon: LucideIcon;
};

type Feature = Item & {
  tag?: string;
};

export default function SpotlightGrid({
  feature,
  items,
}: {
  feature: Feature;
  items: Item[];
}) {
  const FIcon = feature.Icon;

  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
    >
      <motion.div
        variants={fadeIn(0)}
        className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-darkmesa to-black text-white p-10 lg:p-12 min-h-[420px] flex flex-col justify-between"
      >
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #ff4b3a, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ffcc33, transparent 70%)" }}
        />

        <div className="relative">
          {feature.tag && (
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-redmesa mb-6">
              <span className="w-2 h-2 rounded-full bg-redmesa animate-pulse" />
              {feature.tag}
            </span>
          )}
          <div className="w-14 h-14 rounded-2xl bg-redmesa/15 border border-redmesa/30 grid place-items-center text-redmesa mb-8">
            <FIcon size={26} strokeWidth={1.8} />
          </div>
          <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-5 leading-tight">
            {feature.title}
          </h3>
          <p className="text-zinc-300 leading-relaxed text-base lg:text-lg max-w-xl">
            {feature.desc}
          </p>
        </div>

        <div className="relative flex items-center gap-3 mt-10 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          <div className="flex-1 h-px bg-gradient-to-r from-redmesa/40 to-transparent" />
          <span>featured capability</span>
        </div>
      </motion.div>

      {items.slice(0, 3).map((item, i) => {
        const ItemIcon = item.Icon;
        return (
          <motion.div
            key={i}
            variants={fadeIn(i * 0.05)}
            className="rounded-3xl border border-zinc-200 bg-white p-7 hover:border-redmesa/40 hover:shadow-[0_8px_30px_-10px_rgba(255,75,58,0.25)] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 grid place-items-center text-darkmesa group-hover:bg-redmesa/10 group-hover:text-redmesa transition-colors mb-5">
              <ItemIcon size={18} strokeWidth={2} />
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-darkmesa mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
