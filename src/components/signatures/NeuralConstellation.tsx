import {
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const VB_W = 480;
const VB_H = 520;
const EDGE_RADIUS = 130;
const MAX_NEIGHBORS = 3;
const SIGNAL_COUNT = 4;
const SIGNAL_DURATION = 1.4;

type Node = { id: number; x: number; y: number; r: number; phase: number };
type Edge = { a: number; b: number };

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildGraph(count: number): { nodes: Node[]; edges: Edge[] } {
  const rand = seedRandom(11);
  const nodes: Node[] = [];

  // Poisson-ish disk sampling: reject if too close to existing nodes
  const minDist = 60;
  const padding = 40;
  let attempts = 0;
  while (nodes.length < count && attempts < count * 60) {
    const x = padding + rand() * (VB_W - padding * 2);
    const y = padding + rand() * (VB_H - padding * 2);
    const ok = nodes.every((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return dx * dx + dy * dy > minDist * minDist;
    });
    if (ok) {
      nodes.push({
        id: nodes.length,
        x,
        y,
        r: 1.8 + rand() * 1.2,
        phase: rand() * Math.PI * 2,
      });
    }
    attempts++;
  }

  // Edges: connect each node to up to N nearest neighbors within radius
  const edgeSet = new Set<string>();
  const edges: Edge[] = [];
  for (const node of nodes) {
    const others = nodes
      .filter((o) => o.id !== node.id)
      .map((o) => ({
        o,
        d: Math.hypot(o.x - node.x, o.y - node.y),
      }))
      .filter((p) => p.d < EDGE_RADIUS)
      .sort((a, b) => a.d - b.d)
      .slice(0, MAX_NEIGHBORS);

    for (const { o } of others) {
      const key = node.id < o.id ? `${node.id}-${o.id}` : `${o.id}-${node.id}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ a: node.id, b: o.id });
      }
    }
  }

  return { nodes, edges };
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function Signal({
  nodes,
  adjacency,
  reduce,
  initialEdge,
}: {
  nodes: Node[];
  adjacency: Map<number, number[]>;
  reduce: boolean;
  initialEdge: Edge;
}) {
  const [edge, setEdge] = useState<Edge>(initialEdge);
  const [tick, setTick] = useState(0);

  const from = nodes[edge.a];
  const to = nodes[edge.b];

  if (reduce) {
    return (
      <circle
        cx={(from.x + to.x) / 2}
        cy={(from.y + to.y) / 2}
        r={2}
        fill="#ff4b3a"
        opacity={0.7}
      />
    );
  }

  return (
    <motion.circle
      key={tick}
      r={2.2}
      fill="#ff4b3a"
      style={{
        filter: "drop-shadow(0 0 4px #ff4b3a) drop-shadow(0 0 10px rgba(255,75,58,0.6))",
      }}
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: to.x,
        cy: to.y,
        opacity: [0, 1, 1, 0.4],
      }}
      transition={{
        duration: SIGNAL_DURATION,
        ease: "easeInOut",
        opacity: { times: [0, 0.15, 0.85, 1], duration: SIGNAL_DURATION },
      }}
      onAnimationComplete={() => {
        const neighbors = adjacency.get(edge.b) || [];
        const candidates = neighbors.filter((n) => n !== edge.a);
        const next = candidates.length
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : neighbors[Math.floor(Math.random() * neighbors.length)];
        setEdge({ a: edge.b, b: next ?? edge.a });
        setTick((t) => t + 1);
      }}
    />
  );
}

export default function NeuralConstellation() {
  const reduce = useReducedMotion() ?? false;
  const isCompact = useMediaQuery("(max-width: 1024px)");
  const nodeCount = isCompact ? 16 : 24;

  const { nodes, edges } = useMemo(() => buildGraph(nodeCount), [nodeCount]);

  const adjacency = useMemo(() => {
    const map = new Map<number, number[]>();
    for (const e of edges) {
      if (!map.has(e.a)) map.set(e.a, []);
      if (!map.has(e.b)) map.set(e.b, []);
      map.get(e.a)!.push(e.b);
      map.get(e.b)!.push(e.a);
    }
    return map;
  }, [edges]);

  const initialEdges = useMemo(() => {
    const seedR = seedRandom(99);
    return Array.from({ length: SIGNAL_COUNT }, () => {
      const idx = Math.floor(seedR() * edges.length);
      return edges[idx];
    });
  }, [edges]);

  const glowX = useMotionValue(VB_W / 2);
  const glowY = useMotionValue(VB_H / 2);
  const glowOpacity = useMotionValue(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * VB_W;
      const y = ((e.clientY - rect.top) / rect.height) * VB_H;
      glowX.set(x);
      glowY.set(y);
      glowOpacity.set(1);
    };
    const handleLeave = () => glowOpacity.set(0);

    svg.addEventListener("pointermove", handleMove);
    svg.addEventListener("pointerleave", handleLeave);
    return () => {
      svg.removeEventListener("pointermove", handleMove);
      svg.removeEventListener("pointerleave", handleLeave);
    };
  }, [glowX, glowY, glowOpacity]);

  return (
    <div className="relative w-full aspect-[12/13]">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,75,58,0.10), transparent 70%)",
        }}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-full relative cursor-crosshair"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="glow-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ff4b3a" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#ff4b3a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff4b3a" stopOpacity="0" />
          </radialGradient>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        <g stroke="#ffcc33" strokeWidth="0.6" strokeLinecap="round">
          {edges.map((e, i) => {
            const a = nodes[e.a];
            const b = nodes[e.b];
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                opacity={0.12}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g filter="url(#node-glow)">
          {nodes.map((n) => (
            <motion.circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              fill="#ffcc33"
              initial={{ r: n.r, opacity: 0.55 }}
              animate={
                reduce
                  ? { r: n.r, opacity: 0.7 }
                  : {
                      r: [n.r, n.r + 0.9, n.r],
                      opacity: [0.55, 0.95, 0.55],
                    }
              }
              transition={
                reduce
                  ? {}
                  : {
                      duration: 3 + (n.id % 5) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: n.phase / 2,
                    }
              }
            />
          ))}
        </g>

        {/* Outer node halos */}
        <g>
          {nodes.map((n) => (
            <circle
              key={`halo-${n.id}`}
              cx={n.x}
              cy={n.y}
              r={n.r + 4}
              fill="none"
              stroke="#ffcc33"
              strokeWidth="0.4"
              opacity={0.18}
            />
          ))}
        </g>

        {/* Mouse glow */}
        <motion.circle
          r={70}
          fill="url(#glow-grad)"
          cx={glowX}
          cy={glowY}
          style={{ opacity: glowOpacity }}
          transition={{ opacity: { duration: 0.5 } }}
          pointerEvents="none"
        />

        {/* Signals */}
        {initialEdges.map((e, i) => (
          <Signal
            key={i}
            nodes={nodes}
            adjacency={adjacency}
            reduce={reduce}
            initialEdge={e}
          />
        ))}
      </svg>

      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-white/40 pointer-events-none">
        active inference
      </div>
    </div>
  );
}
