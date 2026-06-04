import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../utils/motion";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  light?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  light,
}: SectionProps) {
  return (
    <section id={id} className={light ? "bg-white" : "bg-gray-50"}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={staggerChildren()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeIn()}
            className="text-3xl md:text-4xl font-semibold text-darkmesa tracking-tight text-center"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={fadeIn(0.1)}
              className="mt-4 text-center text-zinc-600 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div variants={fadeIn(0.2)} className="mt-16">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
