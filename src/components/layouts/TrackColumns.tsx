import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeIn, staggerChildren } from "../../utils/motion";

type Track = {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  detail?: string;
};

export default function TrackColumns({ tracks }: { tracks: Track[] }) {
  return (
    <motion.div
      variants={staggerChildren(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto border-t border-b border-zinc-200"
    >
      {tracks.map((track, i) => {
        const Icon = track.Icon;
        return (
          <motion.div
            key={i}
            variants={fadeIn(i * 0.06)}
            className={`relative p-8 lg:p-10 group transition-colors hover:bg-zinc-50 ${
              i < tracks.length - 1 ? "md:border-r border-zinc-200" : ""
            } ${i > 0 ? "border-t md:border-t-0 border-zinc-200" : ""}`}
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Track
              </span>
              <span className="text-5xl lg:text-6xl font-semibold text-redmesa/15 group-hover:text-redmesa/30 transition-colors tabular-nums leading-none">
                {track.number}
              </span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-redmesa/10 grid place-items-center text-redmesa mb-5">
              <Icon size={18} strokeWidth={2} />
            </div>

            <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-darkmesa mb-3">
              {track.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{track.body}</p>

            {track.detail && (
              <div className="mt-6 pt-4 border-t border-dashed border-zinc-300 text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                {track.detail}
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
