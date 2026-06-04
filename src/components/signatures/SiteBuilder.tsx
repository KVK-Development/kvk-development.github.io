import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Lock, Infinity as InfinityIcon, KeyRound, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Build order of the assembling landing page. Each block appears when
// `step` reaches its order, the finished page holds, then it rebuilds.
const STEPS = 6;
const TICK = 600; // ms between block reveals
const HOLD = 8; // ticks the finished page lingers before rebuilding

const FEATURES: { label: string; Icon: LucideIcon }[] = [
  { label: "Free hosting, for life", Icon: InfinityIcon },
  { label: "Total hand-off", Icon: KeyRound },
  { label: "You own the domain", Icon: Globe },
];

function Block({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 8,
        scale: show ? 1 : 0.97,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function SiteBuilder() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? STEPS : -1);

  useEffect(() => {
    if (reduce) {
      setStep(STEPS);
      return;
    }
    let s = -1;
    const id = setInterval(() => {
      s = s >= STEPS + HOLD ? -1 : s + 1;
      setStep(s);
    }, TICK);
    return () => clearInterval(id);
  }, [reduce]);

  const vis = (order: number) => step >= order;
  const progress = Math.min(1, Math.max(0, (step + 1) / (STEPS + 1)));

  return (
    <div className="relative w-full aspect-[12/13] select-none">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(255,75,58,0.16), transparent 68%)",
        }}
      />

      {/* Browser chrome */}
      <div className="absolute inset-0 flex flex-col rounded-2xl border border-white/12 bg-zinc-900/80 backdrop-blur-md overflow-hidden shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)]">
        {/* top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-zinc-800/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-redmesa" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellowmesa" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="flex-1 flex items-center gap-2 rounded-md bg-zinc-950/60 border border-white/5 px-3 py-1.5">
            <Lock size={10} className="text-emerald-400/80 shrink-0" strokeWidth={2.4} />
            <span className="text-[10px] font-mono tracking-tight text-zinc-400">
              yourbusiness.com
            </span>
          </div>
        </div>

        {/* page viewport */}
        <div className="relative flex-1 bg-white overflow-hidden">
          {/* mesa accent in corner */}
          <Block show={vis(1)} className="absolute -top-6 -right-6 z-0">
            <span className="block w-24 h-24 rounded-full bg-yellowmesa/25 blur-md" />
          </Block>

          <div className="relative z-10 h-full flex flex-col p-4 gap-3">
            {/* nav */}
            <Block show={vis(0)} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-redmesa grid place-items-center">
                  <span className="w-1.5 h-1.5 rounded-sm bg-white" />
                </span>
                <span className="text-[11px] font-bold tracking-tight text-darkmesa">
                  Red Mesa
                </span>
              </div>
              <span className="text-[9px] font-semibold text-white bg-darkmesa rounded-full px-2.5 py-1">
                Start
              </span>
            </Block>

            {/* hero */}
            <div className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-100 px-4 py-4">
              <Block show={vis(1)}>
                <h3 className="text-[19px] leading-[1.12] font-extrabold tracking-tight text-darkmesa">
                  Designed, built,{" "}
                  <span className="text-redmesa">yours.</span>
                </h3>
              </Block>
              <Block show={vis(2)} className="mt-1.5">
                <p className="text-[10px] leading-snug text-zinc-500">
                  A custom site built for your business — then handed over, code
                  and accounts and all.
                </p>
              </Block>
              <Block show={vis(3)} className="mt-3 flex items-center gap-2">
                <span className="text-[10px] font-semibold text-white bg-redmesa rounded-full px-3 py-1.5">
                  Start your build
                </span>
                <span className="text-[9px] font-medium text-zinc-400">
                  $500 flat
                </span>
              </Block>
            </div>

            {/* feature cards */}
            <Block show={vis(4)} className="grid grid-cols-3 gap-2">
              {FEATURES.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 flex flex-col gap-1.5"
                >
                  <span className="w-6 h-6 rounded-md bg-redmesa/10 text-redmesa grid place-items-center">
                    <Icon size={13} strokeWidth={2} />
                  </span>
                  <span className="text-[9px] font-bold leading-tight text-darkmesa">
                    {label}
                  </span>
                </div>
              ))}
            </Block>

            {/* stat strip */}
            <Block
              show={vis(5)}
              className="rounded-lg bg-darkmesa text-white px-3 py-2 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.14em] font-semibold"
            >
              <span>No subscriptions</span>
              <span className="text-redmesa">·</span>
              <span>No lock-in</span>
              <span className="text-redmesa">·</span>
              <span>Yours forever</span>
            </Block>

            {/* footer */}
            <Block show={vis(6)} className="mt-auto text-center">
              <span className="text-[9px] text-zinc-400">
                © redmesa.dev — you own everything
              </span>
            </Block>
          </div>
        </div>

        {/* build progress bar */}
        <div className="h-1 w-full bg-zinc-800">
          <motion.div
            className="h-full bg-gradient-to-r from-redmesa to-yellowmesa"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="absolute -bottom-1 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-white/40 pointer-events-none">
        github pages · live
      </div>
    </div>
  );
}
