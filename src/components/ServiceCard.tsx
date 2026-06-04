import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";

const cardFlip: Variants = {
  hidden: { opacity: 0, rotateY: -180, scale: 0.92 },
  show: (d: number) => ({
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { delay: d, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ServiceCard({
  title,
  desc,
  Icon,
  delay = 0,
  wobbleIntensity = 0.4,
}: {
  title: string;
  desc: React.ReactNode;
  Icon: LucideIcon;
  delay?: number;
  wobbleIntensity?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8].map(v => v * wobbleIntensity));
  const rotateY = useTransform(x, [-50, 50], [-8, 8].map(v => v * wobbleIntensity));
  const shadow = useTransform(
    y,
    [-50, 50],
    [
      `0 ${40 * wobbleIntensity}px ${60 * wobbleIntensity}px -20px rgba(0,0,0,${0.25 * wobbleIntensity})`,
      `0 ${15 * wobbleIntensity}px ${30 * wobbleIntensity}px -10px rgba(0,0,0,${0.15 * wobbleIntensity})`,
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      x.set(mx);
      y.set(my);
    },
    [x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div className="[perspective:1200px]">
      <motion.div
        style={{
          rotateX,
          rotateY,
          boxShadow: shadow,
          transformStyle: "preserve-3d",
        }}
        variants={cardFlip}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className="relative h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur px-10 py-16 shadow-md group will-change-transform"
      >
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-yellow-400/10 to-red-500/10" />
        {/* glossy sweep */}
        <motion.div
          className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-60"
          initial={false}
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "linear",
            delay: delay + 0.6,
          }}
          style={{ rotate: "-20deg" }}
        />
        <div className="relative flex flex-col gap-6">
          <div className="w-16 h-16 rounded-2xl bg-black text-white grid place-items-center group-hover:scale-105 transition-transform">
            <Icon size={30} />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="text-zinc-600 leading-7 text-base">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
}
