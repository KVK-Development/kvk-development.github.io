import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutTemplate, Brain, Rocket, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

function NavPill({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: LucideIcon;
  label: string;
}) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const [hovered, setHovered] = useState(false);
  const expanded = isActive || hovered;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.94 }}
      className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors duration-200 ${
        isActive
          ? "bg-redmesa text-white"
          : "text-darkmesa hover:bg-redmesa/10 hover:text-redmesa"
      }`}
    >
      <Link
        to={to}
        aria-current={isActive ? "page" : undefined}
        aria-label={label}
        className="flex items-center gap-2"
      >
        <Icon size={20} strokeWidth={2.2} />
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -6, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: -6, width: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden whitespace-nowrap text-sm font-medium tracking-tight"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md"
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between py-5 px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold tracking-tight text-darkmesa"
          >
            <Home size={24} className="shrink-0" />
            {!isHome && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="hidden sm:inline-block whitespace-nowrap"
              >
                Red Mesa Development
              </motion.span>
            )}
          </Link>
          <NavPill to="/blog" Icon={BookOpen} label="Blog" />
        </div>

        <div className="flex items-center gap-2">
          <NavPill to="/websites" Icon={LayoutTemplate} label="Website Building" />
          <NavPill to="/solutions" Icon={Brain} label="AI Implementation" />
          <NavPill to="/end-to-end" Icon={Rocket} label="End-to-End" />
        </div>
      </div>
    </motion.nav>
  );
}
