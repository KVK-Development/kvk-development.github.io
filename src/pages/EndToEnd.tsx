import Hero from "../components/Hero";
import Section from "../components/Section";
import Lede from "../components/Lede";
import ServiceCard from "../components/ServiceCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import WorkExamples from "../components/WorkExamples";
import StackPipeline from "../components/signatures/StackPipeline";
import TrackColumns from "../components/layouts/TrackColumns";
import ProcessStrip from "../components/layouts/ProcessStrip";
import {
  Code2,
  Brain,
  Database,
  Container,
  Handshake,
  RefreshCw,
  PenTool,
  Rocket,
  PackageCheck,
} from "lucide-react";

const exampleCompanies = [
  { name: "DialDynamics", url: "https://app.dialdynamics.ca/signup", logo: "/assets/dial-dynamics.png" },
  { name: "Infinimatch", url: "https://infinimatch.app", logo: "/assets/infinimatch.png", fill: true },
];

export default function EndToEnd() {
  return (
    <>
      <Hero
        eyebrow="End-to-End Application Building"
        title="Built End to End."
        subtitle="Full-stack AI-focused applications, from idea to production, with infrastructure you own."
        direction="bl"
        signature={<StackPipeline />}
      />

      <Lede
        eyebrow="What End-to-End Means"
        title={<>One team, one stack, <em className="not-italic text-redmesa">no handoff friction.</em></>}
      >
        <p>
          We build complete software systems — from the backend and database to the frontend
          and the AI models running inside them. No handoff friction, no "the AI team will
          add that later." Your product ships as a unified whole.
        </p>
        <p>
          Every product we build starts with the assumption that you should own it. Open source
          tooling, on-premises deployment, and full documentation come standard. We don't build
          things that hold you hostage.
        </p>
      </Lede>

      <Section
        id="development"
        title="How We Engage"
        subtitle="Three tracks. Pick the one that fits where you are."
      >
        <TrackColumns
          tracks={[
            {
              number: "01",
              title: "New Builds",
              body: "Greenfield development for new clients and our own products. We take you from idea to production — design, backend, AI, and infrastructure — with no handoff friction.",
              Icon: Code2,
              detail: "Typical: 8–16 weeks",
            },
            {
              number: "02",
              title: "Equity Partnerships",
              body: "We co-build startups we believe in. You get our full stack and founding-level commitment; we take a stake in the outcome.",
              Icon: Handshake,
              detail: "Current partner: DialDynamics",
            },
            {
              number: "03",
              title: "Support Retainers",
              body: "An ongoing technical partnership. We embed on your team — shipping features, maintaining your AI stack, and moving with you as requirements change.",
              Icon: RefreshCw,
              detail: "Monthly engagement",
            },
          ]}
        />
      </Section>

      <Section
        id="process"
        title="From Idea to Production"
        subtitle="A predictable path from a conversation to a shipped, owned product."
        light
      >
        <ProcessStrip
          stages={[
            { label: "Design",   desc: "Architecture and product shape, before any code.", Icon: PenTool },
            { label: "Backend",  desc: "APIs, data models, services built for reliability.", Icon: Container },
            { label: "AI Layer", desc: "Models, agents, and search wired into the core.",     Icon: Brain },
            { label: "Deploy",   desc: "On your hardware, your cloud, or air-gapped.",       Icon: Rocket },
            { label: "Handoff",  desc: "Documentation, runbooks, and a team that can own it.", Icon: PackageCheck },
          ]}
        />
      </Section>

      <Section
        id="depth"
        title="Built on Real Foundations"
        subtitle="The backend you don't see, designed to outlast the things you do."
      >
        <div className="max-w-4xl mx-auto">
          <ServiceCard
            title="Backend Systems & APIs"
            desc="Data pipelines, service integrations, and backend logic built for reliability and scale from day one. Postgres, Redis, message queues, observability — the right tool for the job, wired so your product keeps shipping after we're gone."
            Icon={Database}
            delay={0.0}
            wobbleIntensity={0.2}
          />
        </div>
      </Section>

      <WorkExamples
        companies={exampleCompanies}
        heading="See the Results for Yourself"
        light
      />

      <CTASection
        title="Build It End to End"
        subtitle="You bring the vision, we bring the stack — frontend, backend, AI, and infrastructure. Built end to end so there's no handoff friction and no one holding your product hostage."
      />
      <Footer />
    </>
  );
}
