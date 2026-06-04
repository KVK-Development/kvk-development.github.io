import { useEffect, useMemo, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Files,
  PencilLine,
  MapPin,
  Instagram,
  Palette,
  Smartphone,
  Mail,
  Github,
  Star,
  Globe,
  RotateCcw,
  KeyRound,
  Check,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { fadeIn, staggerChildren } from "../../utils/motion";

const BASE_PRICE = 500;

type AddonKind = "qty" | "toggle";

type Addon = {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  kind: AddonKind;
  max?: number;
  Icon: LucideIcon;
};

const ADDONS: Addon[] = [
  {
    id: "photo",
    name: "Photography Session",
    desc: "On-site shoot for authentic, original imagery — no stock photos.",
    price: 100,
    unit: "session",
    kind: "qty",
    max: 5,
    Icon: Camera,
  },
  {
    id: "pages",
    name: "Extra Pages",
    desc: "Go beyond the 3 pages included in the base build.",
    price: 75,
    unit: "page",
    kind: "qty",
    max: 12,
    Icon: Files,
  },
  {
    id: "content",
    name: "Content Update",
    desc: "We make a change for you — copy, images, or layout tweaks.",
    price: 50,
    unit: "update",
    kind: "qty",
    max: 10,
    Icon: PencilLine,
  },
  {
    id: "gbp",
    name: "Google Business Profile",
    desc: "Full setup so you show up on Maps and local Search.",
    price: 100,
    unit: "one-time",
    kind: "toggle",
    Icon: MapPin,
  },
  {
    id: "ig",
    name: "Instagram Feed Embed",
    desc: "A live social feed wired straight into your site.",
    price: 30,
    unit: "one-time",
    kind: "toggle",
    Icon: Instagram,
  },
];

const INCLUDED: { label: string; Icon: LucideIcon }[] = [
  { label: "Custom design — zero templates", Icon: Palette },
  { label: "Up to 3 pages", Icon: Files },
  { label: "Mobile responsive", Icon: Smartphone },
  { label: "Email contact form", Icon: Mail },
  { label: "Free hosting · GitHub Pages", Icon: Github },
  { label: "Google review prompt", Icon: Star },
  { label: "Domain setup assistance", Icon: Globe },
  { label: "2 revisions included", Icon: RotateCcw },
  { label: "You own all code & accounts", Icon: KeyRound },
];

function useCountUp(value: number) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return Math.round(display);
}

function Stepper({
  value,
  max = 99,
  onChange,
}: {
  value: number;
  max?: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "w-8 h-8 grid place-items-center rounded-lg text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
  return (
    <div className="flex items-center gap-1.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        disabled={value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="Decrease"
        className={`${btn} bg-zinc-800 hover:bg-zinc-700`}
      >
        <Minus size={14} strokeWidth={2.6} />
      </motion.button>
      <span className="w-6 text-center text-base font-semibold tabular-nums text-darkmesa">
        {value}
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase"
        className={`${btn} bg-redmesa hover:bg-redmesa/85`}
      >
        <Plus size={14} strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-redmesa" : "bg-zinc-300"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 750, damping: 38 }}
        className={`absolute h-5 w-5 rounded-full bg-white shadow ${
          on ? "right-1" : "left-1"
        }`}
      />
    </span>
  );
}

export default function PackageBuilder() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const setCount = (id: string, n: number) =>
    setCounts((c) => ({ ...c, [id]: n }));

  const total = useMemo(
    () =>
      ADDONS.reduce(
        (sum, a) => sum + (counts[a.id] ?? 0) * a.price,
        BASE_PRICE
      ),
    [counts]
  );

  const animatedTotal = useCountUp(total);

  // brief glow flash whenever the total changes
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    setPulse((p) => p + 1);
  }, [total]);

  const selected = ADDONS.filter((a) => (counts[a.id] ?? 0) > 0);
  const hasAddons = selected.length > 0;

  const mailto = useMemo(() => {
    const lines = [
      `• Starter Website — $${BASE_PRICE}`,
      ...selected.map(
        (a) =>
          `• ${a.name} ×${counts[a.id]} — $${(counts[a.id] ?? 0) * a.price}`
      ),
    ];
    const body =
      `Hi Red Mesa,\n\nI'd like to start a website build:\n\n` +
      `${lines.join("\n")}\n\n` +
      `Estimated total: $${total} one-time (plus domain renewal ~$10–20/yr).\n\n` +
      `Here's a bit about my business:`;
    return `mailto:contact@redmesa.dev?subject=${encodeURIComponent(
      `Website Build — $${total}`
    )}&body=${encodeURIComponent(body)}`;
  }, [selected, counts, total]);

  return (
    <motion.div
      variants={staggerChildren(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative max-w-6xl mx-auto"
    >
      {/* blueprint grid atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-0 rounded-[2rem] opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 100%)",
        }}
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* ───────── Left: foundation + add-ons ───────── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Foundation card */}
          <motion.div
            variants={fadeIn(0)}
            className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-redmesa via-redmesa/40 to-yellowmesa/60"
          >
            <div className="relative rounded-[calc(1.5rem-1.5px)] bg-white p-7 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-redmesa font-semibold">
                    <span className="w-2 h-2 rounded-full bg-redmesa animate-pulse" />
                    The Foundation
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-darkmesa">
                    Starter Website
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-extrabold tracking-tight text-darkmesa">
                    $500
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                    one-time · included
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {INCLUDED.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 text-sm text-zinc-700"
                  >
                    <span className="grid place-items-center w-5 h-5 rounded-md bg-redmesa/10 text-redmesa shrink-0">
                      <Icon size={12} strokeWidth={2.4} />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Add-ons */}
          <motion.div variants={fadeIn(0.05)} className="space-y-3">
            <div className="flex items-baseline justify-between px-1">
              <h4 className="text-sm uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Add only what you need
              </h4>
              <AnimatePresence>
                {hasAddons && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setCounts({})}
                    className="text-xs text-zinc-400 hover:text-redmesa transition-colors"
                  >
                    Reset
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {ADDONS.map((addon) => {
              const count = counts[addon.id] ?? 0;
              const active = count > 0;
              const Icon = addon.Icon;
              const isToggle = addon.kind === "toggle";

              const cardClasses = `group flex items-center gap-4 rounded-2xl border p-4 lg:p-5 text-left w-full transition-colors duration-150 ${
                active
                  ? "border-redmesa/50 bg-redmesa/[0.04] shadow-[0_10px_30px_-16px_rgba(255,75,58,0.5)]"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`;

              const inner = (
                <>
                  <span
                    className={`grid place-items-center w-12 h-12 rounded-xl shrink-0 transition-colors ${
                      active
                        ? "bg-redmesa text-white"
                        : "bg-zinc-100 text-darkmesa group-hover:bg-zinc-200"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold tracking-tight text-darkmesa">
                        {addon.name}
                      </span>
                      <span className="text-xs font-medium text-redmesa tabular-nums">
                        ${addon.price}
                        <span className="text-zinc-400">/{addon.unit}</span>
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-snug mt-0.5 truncate">
                      {addon.desc}
                    </p>
                  </div>

                  {isToggle ? (
                    <Toggle on={active} />
                  ) : (
                    <Stepper
                      value={count}
                      max={addon.max}
                      onChange={(n) => setCount(addon.id, n)}
                    />
                  )}
                </>
              );

              return isToggle ? (
                <motion.button
                  key={addon.id}
                  type="button"
                  variants={fadeIn(0)}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCount(addon.id, active ? 0 : 1)}
                  className={cardClasses}
                >
                  {inner}
                </motion.button>
              ) : (
                <motion.div key={addon.id} variants={fadeIn(0)} className={cardClasses}>
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ───────── Right: live receipt ───────── */}
        <motion.div
          variants={fadeIn(0.1)}
          className="lg:col-span-5 lg:sticky lg:top-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-darkmesa to-black text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            <div
              className="absolute -top-24 -right-16 w-72 h-72 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #ff4b3a, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-28 -left-16 w-80 h-80 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #ffcc33, transparent 70%)" }}
            />

            {/* header */}
            <div className="relative flex items-center justify-between px-6 py-3.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-redmesa" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellowmesa" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                ~/your-build
              </span>
            </div>

            {/* line items */}
            <div className="relative px-6 pt-6 pb-2 font-mono text-sm min-h-[180px]">
              <div className="flex items-baseline justify-between text-white">
                <span className="tracking-tight">Starter Website</span>
                <span className="tabular-nums text-zinc-300">${BASE_PRICE}</span>
              </div>
              <div className="text-[11px] text-zinc-500 mb-2">base package</div>

              <motion.ul layout className="space-y-2.5">
                <AnimatePresence mode="popLayout" initial={false}>
                  {selected.map((a) => (
                    <motion.li
                      key={a.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ type: "spring", stiffness: 760, damping: 42 }}
                      className="flex items-baseline justify-between gap-3 border-t border-white/5 pt-2.5"
                    >
                      <span className="flex items-baseline gap-2 min-w-0">
                        <span className="text-redmesa tabular-nums">
                          {counts[a.id]}×
                        </span>
                        <span className="text-zinc-200 truncate">{a.name}</span>
                      </span>
                      <span className="tabular-nums text-zinc-300 shrink-0">
                        ${(counts[a.id] ?? 0) * a.price}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              {!hasAddons && (
                <p className="text-[12px] text-zinc-600 mt-2 italic">
                  {"// toggle add-ons to customize your build"}
                </p>
              )}
            </div>

            {/* total */}
            <div className="relative mx-6 mt-2 mb-6 rounded-2xl bg-white/[0.04] border border-white/10 p-5 overflow-hidden">
              <AnimatePresence>
                <motion.div
                  key={pulse}
                  aria-hidden
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 50%, rgba(255,75,58,0.5), transparent 65%)",
                  }}
                />
              </AnimatePresence>
              <div className="relative flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                    Your total
                  </div>
                  <div className="text-[11px] text-zinc-500">one-time payment</div>
                </div>
                <div className="text-4xl font-extrabold tracking-tight tabular-nums">
                  ${animatedTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative px-6 pb-6">
              <motion.a
                href={mailto}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-white text-black font-semibold py-4 hover:bg-zinc-100 transition-colors"
              >
                Start this build
                <ArrowRight size={18} strokeWidth={2.4} />
              </motion.a>
              <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-zinc-500">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.6} />
                The only ongoing cost is domain renewal — roughly $10–20/yr, billed
                by your registrar, never by us.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
