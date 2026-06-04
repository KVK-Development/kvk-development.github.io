import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function CanvasReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath: MotionValue<string> = useTransform(
    scrollYProgress,
    (v: number) => `inset(0% 0% ${v * 100}% 0%)`
  );

  return (
    <div ref={ref} className="relative h-[70vh] bg-black overflow-hidden">
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-red-500"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold">Seamless Integration</h2>
      </div>
    </div>
  );
}
