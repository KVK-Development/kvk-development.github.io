import React from "react";

const items = [
  "Custom Recommenders",
  "Semantic Search",
  "Cold-Start Solutions",
  "Private Cloud",
  "On-Prem Deployments",
  "Workflow Automation",
  "MLOps",
  "Drift Monitoring",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-black text-white py-4">
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="mx-10 text-sm tracking-wide opacity-80 hover:opacity-100"
            style={{ whiteSpace: "nowrap" }}
          >
            {t}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
