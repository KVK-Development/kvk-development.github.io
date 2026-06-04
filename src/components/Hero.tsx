import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { fadeIn, staggerChildren } from "../utils/motion";

type Direction = "br" | "bl" | "tr" | "tl";

const gradientMap: Record<Direction, string> = {
  br: "bg-gradient-to-br from-redmesa via-darkmesa to-black",
  bl: "bg-gradient-to-bl from-redmesa via-darkmesa to-black",
  tr: "bg-gradient-to-tr from-redmesa via-darkmesa to-black",
  tl: "bg-gradient-to-tl from-redmesa via-darkmesa to-black",
};

function Orbs({ direction }: { direction: Direction }) {
  const config = {
    br: { red: "-top-40 -left-40", yellow: "bottom-[-30vw] right-[-30vw]" },
    bl: { red: "-top-40 -right-40", yellow: "bottom-[-30vw] left-[-30vw]" },
    tr: { red: "-bottom-40 -left-40", yellow: "top-[-30vw] right-[-30vw]" },
    tl: { red: "-bottom-40 -right-40", yellow: "top-[-30vw] left-[-30vw]" },
  }[direction];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, transition: { delay: 1.2, duration: 1.5 } }}
        className={`absolute w-[120vw] h-[120vw] rounded-full bg-red-500 blur-3xl ${config.red}`}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, transition: { delay: 1.4, duration: 1.5 } }}
        className={`absolute w-[90vw] h-[90vw] rounded-full bg-yellow-400 blur-3xl ${config.yellow}`}
      />
    </>
  );
}

export default function Hero({
  title,
  subtitle,
  direction = "br",
  cta,
  signature,
  eyebrow,
}: {
  title: string;
  subtitle: string;
  direction?: Direction;
  cta?: React.ReactNode;
  signature?: React.ReactNode;
  eyebrow?: string;
}) {
  const defaultCta = (
    <motion.a
      variants={fadeIn(0.45)}
      href="#contact"
      className="inline-block px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-100 transition"
    >
      Start a Project
    </motion.a>
  );

  if (!signature) {
    return (
      <section className="min-h-screen flex items-start lg:items-center justify-center relative overflow-hidden pt-28 pb-16 lg:py-0">
        <div className={`absolute inset-0 ${gradientMap[direction]}`} />
        <motion.div
          variants={staggerChildren(0.15)}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <Logo size={240} />
          <motion.h1
            variants={fadeIn(0.1)}
            className="mt-8 text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeIn(0.25)}
            className="mt-6 max-w-2xl text-lg md:text-xl text-zinc-300"
          >
            {subtitle}
          </motion.p>
          {cta ? (
            <motion.div variants={fadeIn(0.45)} className="mt-10">
              {cta}
            </motion.div>
          ) : (
            <div className="mt-10">{defaultCta}</div>
          )}
        </motion.div>
        <Orbs direction={direction} />
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      <div className={`absolute inset-0 ${gradientMap[direction]}`} />
      <Orbs direction={direction} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <motion.div
          variants={staggerChildren(0.12)}
          initial="hidden"
          animate="show"
          className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div variants={fadeIn(0)} className="mb-8">
            <Logo size={64} />
          </motion.div>

          {eyebrow && (
            <motion.div
              variants={fadeIn(0.05)}
              className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-redmesa/90 font-medium"
            >
              <span className="h-px w-8 bg-redmesa/60" />
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            variants={fadeIn(0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeIn(0.25)}
            className="mt-6 max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeIn(0.45)} className="mt-10">
            {cta || defaultCta}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex items-center justify-center w-full"
          aria-hidden="true"
        >
          <div className="w-full max-w-[480px] mx-auto scale-90 lg:scale-100 origin-center">
            {signature}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
