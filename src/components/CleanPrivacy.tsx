// src/components/CleanPrivacy.tsx
import { useRef, useState } from "react";
import { motion, Variants, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  Zap,
  EyeOff,
  Server,
  Database,
  X,
} from "lucide-react";

const features = [
  {
    title: "Encryption at Rest & In Transit",
    icon: Lock,
    desc: "AES-256 encryption at rest and TLS 1.3 in transit across all channels.",
  },
  {
    title: "Air-Gapped Deployment",
    icon: ShieldCheck,
    desc: "Completely isolated networks—no external connectivity for maximum security.",
  },
  {
    title: "Audit Trails & Logging",
    icon: Zap,
    desc: "Detailed, tamper-proof logs with real-time alerts and reporting.",
  },
  {
    title: "Least-Privilege Access",
    icon: EyeOff,
    desc: "Role-based access control with granular permissions.",
  },
  {
    title: "Compliance-Ready (SOC2, HIPAA)",
    icon: Database,
    desc: "Built-in controls and documentation to satisfy SOC2 and HIPAA audits.",
  },
  {
    title: "On-Premise & Private Cloud",
    icon: Server,
    desc: "Deploy on your servers or in your private cloud with full data ownership.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const modalBg: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};
const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8 },
};

type Feature = {
  title: string;
  icon: React.ElementType;
  desc: string;
};

export default function CleanPrivacy({ features }: { features: Feature[] }) {
  const ref = useRef<HTMLOptionElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <motion.section
        ref={ref}
        id="privacy"
        className="relative py-20 bg-darkmesa overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {/* ...existing content unchanged... */}
        <motion.div
          variants={item}
          className="relative z-10 mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              layoutId={`feature-${i}`}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(i)}
              className="bg-lightmesa rounded-2xl p-6 flex items-start gap-4 cursor-pointer min-h-[120px]"
            >
              <div className="p-3 bg-redmesa text-white rounded-lg">
                <f.icon size={24} />
              </div>
              <p className="text-darkmesa font-medium">{f.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={modalBg}
              onClick={() => setSelected(null)}
            >
              <motion.div
                layoutId={`feature-${selected}`}
                variants={modalContent}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-white rounded-2xl p-8 max-w-md mx-auto mt-24 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelected(null)}
                >
                  <X size={24} />
                </button>
                <h3 className="text-2xl font-semibold mb-4">
                  {features[selected].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {features[selected].desc}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </LayoutGroup>
  );
}