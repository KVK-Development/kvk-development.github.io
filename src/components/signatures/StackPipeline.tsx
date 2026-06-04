import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout, Server, Cpu, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Slab = {
  label: string;
  sub: string;
  Icon: LucideIcon;
  width: string;
  offsetX: number;
};

const SLABS: Slab[] = [
  { label: "UI",    sub: "React + Tailwind", Icon: Layout,   width: "88%", offsetX: 6 },
  { label: "API",   sub: "REST · GraphQL",   Icon: Server,   width: "100%", offsetX: 0 },
  { label: "LOGIC", sub: "Models · Workers", Icon: Cpu,      width: "92%", offsetX: 4 },
  { label: "DATA",  sub: "Postgres · Redis", Icon: Database, width: "76%", offsetX: 12 },
];

const SLAB_GAP = 88;
const PULSE_DURATION = 4.2;

export default function StackPipeline() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const tick = () => {
      const seq = [0, 1, 2, 3, 2, 1, 0];
      setActiveIdx(seq[i % seq.length]);
      i++;
    };
    tick();
    const id = setInterval(tick, (PULSE_DURATION * 1000) / 7);
    return () => clearInterval(id);
  }, [reduce]);

  const pulseY = SLABS.map((_, i) => i * SLAB_GAP);
  const fullPulseY = [...pulseY, ...[...pulseY].reverse().slice(1)];

  return (
    <div className="relative w-full aspect-[12/13] flex items-center justify-center select-none">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,75,58,0.18), transparent 65%)",
        }}
      />

      <div
        className="relative w-full h-full"
        style={{ perspective: "1100px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transform:
              "translate(-50%, -50%) rotateX(58deg) rotateZ(-32deg)",
            transformStyle: "preserve-3d",
            width: "320px",
            height: `${(SLABS.length - 1) * SLAB_GAP + 56}px`,
          }}
        >
          {SLABS.map((slab, i) => {
            const Icon = slab.Icon;
            const isActive = activeIdx === i;
            return (
              <motion.div
                key={slab.label}
                className="absolute left-0 right-0 flex items-center justify-between rounded-md border border-white/10 bg-darkmesa/95 backdrop-blur-sm pl-4 pr-3 py-3"
                style={{
                  top: `${i * SLAB_GAP}px`,
                  width: slab.width,
                  marginLeft: `${slab.offsetX}px`,
                  borderLeft: "2px solid #ff4b3a",
                }}
                animate={{
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(255,75,58,0.55), 0 12px 32px -8px rgba(255,75,58,0.45), 0 0 22px rgba(255,75,58,0.35)"
                    : "0 6px 18px -10px rgba(0,0,0,0.6)",
                  borderLeftColor: isActive ? "#ffcc33" : "#ff4b3a",
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-sm bg-white/5 grid place-items-center text-redmesa">
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {slab.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                      {slab.sub}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] tabular-nums text-zinc-500">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}

          {!reduce && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                top: "0px",
                background: "#ffcc33",
                boxShadow:
                  "0 0 14px #ff4b3a, 0 0 28px rgba(255,75,58,0.7), 0 0 44px rgba(255,204,51,0.5)",
                transform: "translateZ(28px)",
              }}
              animate={{ y: fullPulseY }}
              transition={{
                duration: PULSE_DURATION,
                ease: "easeInOut",
                repeat: Infinity,
                times: fullPulseY.map((_, idx) => idx / (fullPulseY.length - 1)),
              }}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
        request · response
      </div>
    </div>
  );
}
