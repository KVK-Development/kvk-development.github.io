import { motion } from "framer-motion";
import LogoNoBG from "../assets/Red_Mesa_NoBG.png";

export default function Logo({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className="border-8 border-white rounded-full inline-block"
      initial={{ rotate: -12, scale: 0.8, opacity: 0 }}
      animate={{
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{ rotate: 3, scale: 1.03 }}
    >
      <img src={LogoNoBG} alt="Red Mesa Logo" className="w-full h-full" />
    </motion.div>
  );
}  