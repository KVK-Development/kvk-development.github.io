import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../utils/motion";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Let's Build",
  subtitle = "On-prem hosting, AI integration, or a full stack product from scratch — tell us what you're building and we'll help you ship it.",
}: CTASectionProps) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black text-white min-h-screen flex items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute inset-0"
      >
        <div className="absolute w-[80vw] h-[80vw] bg-red-500/20 blur-3xl -top-1/3 -left-1/4 rounded-full" />
        <div className="absolute w-[60vw] h-[60vw] bg-yellow-400/10 blur-3xl bottom-[-20vw] right-[-10vw] rounded-full" />
      </motion.div>

      <motion.div
        variants={staggerChildren(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.h2
          variants={fadeIn()}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeIn(0.1)}
          className="mt-8 text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

          <motion.div
            variants={fadeIn(0.15)}
            className="mt-10 flex flex-col items-center gap-10"
          >
            <motion.a
              variants={fadeIn(0.2)}
              href="mailto:contact@redmesa.dev"
              className="inline-block px-12 py-5 rounded-full bg-white text-black text-lg font-medium hover:bg-zinc-100 transition"
            >
              contact@redmesa.dev
            </motion.a>
            <motion.p
              variants={fadeIn(0.25)}
              className="text-sm text-zinc-500"
            >
              or schedule a call - we'll figure out if we're a fit.
            </motion.p>
          </motion.div>
      </motion.div>
    </section>
  );
}
