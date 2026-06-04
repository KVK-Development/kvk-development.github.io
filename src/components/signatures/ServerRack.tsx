import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const VB_W = 320;
const VB_H = 380;
const UNIT_COUNT = 8;
const UNIT_TOP = 30;
const UNIT_H = 23;
const UNIT_GAP = 2;
const RACK_LEFT = 14;
const RACK_RIGHT = VB_W - 14;
const SPARK_TOP = 234;
const SPARK_ROW_H = 38;
const SPARK_LABEL_W = 32;
const SPARK_BUFFER = 36;

type LedSeed = {
  color: string;
  dur: number;
  delay: number;
};

type UnitSeed = {
  hostname: string;
  status: string;
  leds: LedSeed[];
};

const LED_PALETTE = [
  "#3ddc84", // green primary
  "#3ddc84",
  "#3ddc84",
  "#3ddc84",
  "#ffcc33", // yellowmesa
  "#ffcc33",
  "#ff4b3a", // redmesa (rare)
];

const HOSTS = [
  "node-01 / inference",
  "node-02 / inference",
  "node-03 / vector-db",
  "node-04 / vector-db",
  "node-05 / api",
  "node-06 / api",
  "node-07 / storage",
  "node-08 / observe",
];

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildPath(values: number[], baseX: number, baseY: number, w: number, h: number) {
  if (values.length === 0) return "";
  const stepX = w / (values.length - 1);
  return values
    .map((v, i) => {
      const x = baseX + i * stepX;
      const y = baseY + h - v * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function ServerRack() {
  const reduce = useReducedMotion();

  const units = useMemo<UnitSeed[]>(() => {
    const rand = seedRandom(73);
    return Array.from({ length: UNIT_COUNT }, (_, i) => ({
      hostname: HOSTS[i],
      status: rand() > 0.85 ? "WARN" : "OK",
      leds: Array.from({ length: 3 }, () => ({
        color: LED_PALETTE[Math.floor(rand() * LED_PALETTE.length)],
        dur: 1.6 + rand() * 1.8,
        delay: rand() * 1.5,
      })),
    }));
  }, []);

  const cpuRef = useRef<SVGPathElement>(null);
  const netRef = useRef<SVGPathElement>(null);
  const ramRef = useRef<SVGPathElement>(null);

  const cpuVals = useRef<number[]>(Array.from({ length: SPARK_BUFFER }, () => 0.4 + Math.random() * 0.3));
  const netVals = useRef<number[]>(Array.from({ length: SPARK_BUFFER }, () => 0.3 + Math.random() * 0.4));
  const ramVals = useRef<number[]>(Array.from({ length: SPARK_BUFFER }, () => 0.55 + Math.random() * 0.2));

  useEffect(() => {
    if (reduce) return;

    const sparkX = RACK_LEFT + SPARK_LABEL_W + 4;
    const sparkW = RACK_RIGHT - sparkX - 4;

    let raf = 0;
    let last = 0;
    let cpuPhase = 0;
    let netPhase = 0;
    let ramPhase = 0;
    const TICK = 180; // ms

    const update = (t: number) => {
      if (t - last > TICK) {
        last = t;

        cpuPhase += 0.18;
        netPhase += 0.27;
        ramPhase += 0.09;

        cpuVals.current.shift();
        cpuVals.current.push(
          0.5 + Math.sin(cpuPhase) * 0.18 + Math.sin(cpuPhase * 2.7) * 0.08 + (Math.random() - 0.5) * 0.06
        );

        netVals.current.shift();
        const burst = Math.random() > 0.85 ? 0.25 : 0;
        netVals.current.push(
          0.42 + Math.sin(netPhase * 0.6) * 0.12 + burst + (Math.random() - 0.5) * 0.08
        );

        ramVals.current.shift();
        ramVals.current.push(
          Math.min(0.92, 0.6 + Math.sin(ramPhase) * 0.05 + (Math.random() - 0.5) * 0.03)
        );

        const yCpu = SPARK_TOP + 4;
        const yNet = SPARK_TOP + SPARK_ROW_H + 4;
        const yRam = SPARK_TOP + SPARK_ROW_H * 2 + 4;
        const rowH = SPARK_ROW_H - 12;

        cpuRef.current?.setAttribute(
          "d",
          buildPath(cpuVals.current, sparkX, yCpu, sparkW, rowH)
        );
        netRef.current?.setAttribute(
          "d",
          buildPath(netVals.current, sparkX, yNet, sparkW, rowH)
        );
        ramRef.current?.setAttribute(
          "d",
          buildPath(ramVals.current, sparkX, yRam, sparkW, rowH)
        );
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const sparkX = RACK_LEFT + SPARK_LABEL_W + 4;
  const sparkW = RACK_RIGHT - sparkX - 4;

  const initialCpu = buildPath(cpuVals.current, sparkX, SPARK_TOP + 4, sparkW, SPARK_ROW_H - 12);
  const initialNet = buildPath(netVals.current, sparkX, SPARK_TOP + SPARK_ROW_H + 4, sparkW, SPARK_ROW_H - 12);
  const initialRam = buildPath(ramVals.current, sparkX, SPARK_TOP + SPARK_ROW_H * 2 + 4, sparkW, SPARK_ROW_H - 12);

  return (
    <div className="relative w-full aspect-[12/13]">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="rack-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="rack-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="unit-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="2"
          width={VB_W - 4}
          height={VB_H - 4}
          rx="14"
          fill="url(#rack-bg)"
          stroke="rgba(255,75,58,0.22)"
          strokeWidth="1"
        />

        <rect
          x="2"
          y="2"
          width={VB_W - 4}
          height={VB_H - 4}
          rx="14"
          fill="none"
          stroke="rgba(255,75,58,0.45)"
          strokeWidth="0.5"
          filter="url(#rack-glow)"
          opacity="0.5"
        />

        <text
          x={RACK_LEFT}
          y="20"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#a1a1aa"
        >
          RACK-01 / DC-LOCAL
        </text>
        <text
          x={RACK_RIGHT}
          y="20"
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#3ddc84"
        >
          ● ONLINE
        </text>

        {units.map((unit, i) => {
          const y = UNIT_TOP + i * (UNIT_H + UNIT_GAP);
          return (
            <g key={i}>
              <rect
                x={RACK_LEFT}
                y={y}
                width={RACK_RIGHT - RACK_LEFT}
                height={UNIT_H}
                rx="2"
                fill="url(#unit-bg)"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
              />
              <rect x={RACK_LEFT + 4} y={y + 4} width="3" height={UNIT_H - 8} rx="0.5" fill="rgba(255,75,58,0.6)" />
              <rect x={RACK_LEFT + 9} y={y + 4} width="3" height={UNIT_H - 8} rx="0.5" fill="rgba(255,255,255,0.1)" />

              <text
                x={RACK_LEFT + 18}
                y={y + UNIT_H / 2 + 3.5}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                fontSize="8"
                letterSpacing="0.5"
                fill="#d4d4d8"
              >
                {unit.hostname}
              </text>

              <text
                x={RACK_RIGHT - 64}
                y={y + UNIT_H / 2 + 3.5}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                fontSize="7"
                letterSpacing="1"
                fill={unit.status === "OK" ? "#71717a" : "#ffcc33"}
                textAnchor="end"
              >
                {unit.status}
              </text>

              {unit.leds.map((led, j) => (
                <circle
                  key={j}
                  cx={RACK_RIGHT - 38 + j * 11}
                  cy={y + UNIT_H / 2}
                  r="2.4"
                  fill={led.color}
                >
                  {!reduce && (
                    <animate
                      attributeName="opacity"
                      values="0.25;1;0.25"
                      dur={`${led.dur}s`}
                      begin={`${led.delay}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {reduce && <animate attributeName="opacity" values="0.7" />}
                </circle>
              ))}
            </g>
          );
        })}

        <line
          x1={RACK_LEFT}
          y1={SPARK_TOP - 8}
          x2={RACK_RIGHT}
          y2={SPARK_TOP - 8}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />

        {(["CPU", "NET", "RAM"] as const).map((label, i) => {
          const yLabel = SPARK_TOP + i * SPARK_ROW_H + (SPARK_ROW_H - 12) / 2 + 6;
          return (
            <text
              key={label}
              x={RACK_LEFT + 2}
              y={yLabel}
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fontSize="8"
              letterSpacing="1.5"
              fill="#71717a"
            >
              {label}
            </text>
          );
        })}

        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={sparkX}
            y={SPARK_TOP + i * SPARK_ROW_H + 4}
            width={sparkW}
            height={SPARK_ROW_H - 12}
            fill="rgba(255,255,255,0.015)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        ))}

        <path
          ref={cpuRef}
          d={initialCpu}
          fill="none"
          stroke="#ff4b3a"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={netRef}
          d={initialNet}
          fill="none"
          stroke="#ffcc33"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={ramRef}
          d={initialRam}
          fill="none"
          stroke="#3ddc84"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x={RACK_LEFT}
          y={VB_H - 10}
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="7"
          letterSpacing="2"
          fill="#52525b"
        >
          UPTIME 218d · LOAD 0.42 · OWN ✓
        </text>
      </svg>
    </div>
  );
}
