import Hero from "../components/Hero";
import Section from "../components/Section";
import ServiceCard from "../components/ServiceCard";
import CanvasReveal from "../components/CanvasReveal";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer";
import BuzzwordBlock from "../components/BuzzwordBlock";
import CTASection from "../components/CTASection";

import {
  Brain,
  Search,
  Workflow,
  Server as ServerIcon,
  Wrench,
  BarChart,
} from "lucide-react";
import CleanPrivacy from "../components/CleanPrivacy";
import {
  Lock,
  ShieldCheck,
  Zap,
  EyeOff,
  Server,
  Database,
} from "lucide-react";

const privacyFeatures = [
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


export default function Recs() {
  return (
    <>
      <Hero
      title = "Recommendation Engines. Built For Startups."
      subtitle = "Stop dumping OpenAI credits into the void"
      direction="tl" />
      <Marquee />
      
      <section className="flex justify-center px-6 py-20 bg-white text-black">
  <div className="max-w-3xl w-full text-left space-y-6">
    <h2 className="text-4xl font-bold text-center">What Is a Matching Model?</h2>
    <p className="text-lg text-zinc-700 leading-relaxed">
      A matching model is a type of machine learning system that evaluates how well two entities align. 
      It can power use cases like pairing job seekers with open roles, users with content, or buyers with products.
    </p>
    <p className="text-lg text-zinc-700 leading-relaxed">
      Unlike generic models, these are trained on your unique data—making them far more accurate and useful in production. 
      We build, fine-tune, and deploy these systems so they deliver results from day one. They are also faster and cheaper to run than general-purpose LLMs without the overhead of language procession.
    </p>
  </div>
</section>



      <Section
        id="services"
        title="What We Do"
        subtitle="From MVP to scale, we slot into your stack and ship impact-fast."
      >
        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto auto-rows-fr">
          <ServiceCard
            title="Custom Recommenders"
            desc="Product, content, or deal matching—trained on your data, tuned to your KPIs."
            Icon={Brain}
            delay={0.0}
          />
          <ServiceCard
            title="Semantic Search"
            desc="Vector search that actually finds what users want, not just keywords."
            Icon={Search}
            delay={0.05}
          />
          <ServiceCard
            title="Workflow Integration"
            desc="We wire models into your existing backend, frontend, or analytics stack."
            Icon={Workflow}
            delay={0.1}
          />
          <ServiceCard
            title="On-Prem / Private Cloud"
            desc="Keep everything in-house. Full control, zero leakage."
            Icon={ServerIcon}
            delay={0.15}
          />
          <ServiceCard
            title="Ongoing Optimization"
            desc="Drift monitoring, retraining, A/B testing, continuous improvement."
            Icon={Wrench}
            delay={0.2}
          />
          <ServiceCard
            title="Analytics & A/B Infra"
            desc="Measure lift, iterate quickly, prove ROI."
            Icon={BarChart}
            delay={0.25}
          />
        </div>
      </Section>

      <CanvasReveal />

      <CleanPrivacy features={privacyFeatures} />;

      <CTASection />

      <Footer />
    </>
  );
}
