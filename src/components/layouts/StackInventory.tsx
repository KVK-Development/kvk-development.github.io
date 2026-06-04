import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../../utils/motion";

type Item = {
  name: string;
  role: string;
  status?: "live" | "ready" | "optional";
};

type Group = {
  groupTitle: string;
  groupCaption?: string;
  items: Item[];
};

const STATUS_COLOR: Record<NonNullable<Item["status"]>, string> = {
  live: "bg-emerald-500",
  ready: "bg-redmesa",
  optional: "bg-yellowmesa",
};

const STATUS_LABEL: Record<NonNullable<Item["status"]>, string> = {
  live: "LIVE",
  ready: "READY",
  optional: "OPT.",
};

export default function StackInventory({ groups }: { groups: Group[] }) {
  return (
    <motion.div
      variants={staggerChildren(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono"
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-redmesa" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellowmesa" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          ~/stack — manifest
        </span>
        <span className="text-[10px] tabular-nums text-zinc-600">
          {groups.reduce((acc, g) => acc + g.items.length, 0).toString().padStart(2, "0")} items
        </span>
      </div>

      <div className="divide-y divide-zinc-900">
        {groups.map((group, gi) => (
          <motion.div key={gi} variants={fadeIn(0)} className="px-6 py-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-redmesa font-semibold">
                ▸ {group.groupTitle}
              </span>
              {group.groupCaption && (
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {group.groupCaption}
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {group.items.map((item, i) => {
                const status = item.status ?? "ready";
                return (
                  <motion.li
                    key={i}
                    variants={fadeIn(0)}
                    className="grid grid-cols-12 items-center gap-4 text-sm py-1.5 px-3 -mx-3 rounded hover:bg-zinc-900/60 transition-colors group"
                  >
                    <div className="col-span-1 flex items-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLOR[status]}`} />
                    </div>
                    <div className="col-span-4 text-white font-medium tracking-tight">
                      {item.name}
                    </div>
                    <div className="col-span-5 text-zinc-400 text-xs leading-relaxed">
                      {item.role}
                    </div>
                    <div className="col-span-2 text-right text-[10px] tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {STATUS_LABEL[status]}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        <span>$ ownership: 100%</span>
        <span className="text-emerald-500">✓ delivered</span>
      </div>
    </motion.div>
  );
}
