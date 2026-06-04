import Hero from "../components/Hero";
import Seo, { serviceStructuredData } from "../components/Seo";
import Section from "../components/Section";
import Lede from "../components/Lede";
import ServiceCard from "../components/ServiceCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import WorkExamples from "../components/WorkExamples";
import ServerRack from "../components/signatures/ServerRack";
import ComparisonBlock from "../components/layouts/ComparisonBlock";
import StackInventory from "../components/layouts/StackInventory";
import { ShieldCheck, Lock } from "lucide-react";

const exampleCompanies = [
  { name: "Your Startup", url: "#" },
  { name: "Client Name", url: "#" },
  { name: "Partner Co", url: "#" },
];

export default function Infrastructure() {
  return (
    <>
      <Seo
        title="On-Premises AI Infrastructure"
        description="Own your AI stack with on-premises hosting, private cloud deployment, air-gapped infrastructure, open source LLMs, and compliant handoff documentation."
        path="/infrastructure"
        keywords={[
          "on premises AI infrastructure",
          "private AI hosting",
          "air gapped deployment",
          "open source LLM deployment",
          "AI infrastructure consulting",
        ]}
        structuredData={serviceStructuredData(
          "On-Premises AI Infrastructure",
          "Private AI hosting and infrastructure deployments where clients own the hardware, models, and data.",
          "/infrastructure"
        )}
      />
      <Hero
        eyebrow="On-Prem Hosting"
        title="Your Stack. Your Sovereignty."
        subtitle="On-premises hosting where you own the hardware, the models, and the data. No managed services, no usage bills, no one to ask permission."
        direction="tr"
        signature={<ServerRack />}
      />

      <Lede
        eyebrow="What On-Prem Means"
        title={<>You ship it. <em className="not-italic text-redmesa">You own it.</em></>}
      >
        <p>
          On-premises hosting means the hardware, the model weights, and the operating system
          all sit inside your perimeter. There's no managed service in the hot path, no per-token
          meter ticking up, no vendor account standing between you and your own data.
        </p>
        <p>
          We deliver the rack, the runtime, and the documentation to operate it. Your team gets
          the keys — not a customer support number. The same stack we'd run for ourselves, handed
          over so you can run it without us.
        </p>
      </Lede>

      <Section
        id="why-onprem"
        title="Why On-Premises?"
        subtitle="You built the product. You should own the infrastructure it runs on."
      >
        <div className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto auto-rows-fr">
            <ServiceCard
              title="Full Stack Ownership"
              desc="Hardware, OS, runtime, models — all yours. We deliver working infrastructure with documentation and handoff, not a managed service dependency."
              Icon={ShieldCheck}
              delay={0.0}
            />
            <ServiceCard
              title="Zero Vendor Lock-In"
              desc="No AWS, GCP, or Azure account required. Open source tooling throughout. Switch providers, move hardware, or take over operations yourself without asking permission."
              Icon={Lock}
              delay={0.05}
            />
          </div>

          <ComparisonBlock
            left={{
              label: "On-Prem",
              caption: "What you own",
              items: [
                "Physical hardware sized for your workload",
                "Model weights, runtime, and inference code",
                "Immutable audit logs and full operational visibility",
                "Air-gapped deployment for regulated data",
                "Documentation and handoff — your team can run it",
              ],
            }}
            right={{
              label: "Managed Cloud",
              caption: "What they keep",
              items: [
                "Per-token billing that scales with your success",
                "Opaque inference behind a vendor's API",
                "Data exfiltrated to a third party by default",
                "Compliance posture inherited from a vendor",
                "A rate-limited dial that can be twisted at any time",
              ],
            }}
          />
        </div>
      </Section>

      <Section
        id="stack"
        title="What We Deploy"
        subtitle="Open source models and infrastructure your team can actually own."
        light
      >
        <StackInventory
          groups={[
            {
              groupTitle: "Models",
              groupCaption: "open-weights",
              items: [
                { name: "LLaMA 3", role: "general-purpose chat & reasoning, fine-tunable", status: "live" },
                { name: "Mistral", role: "lean, fast inference for high-throughput workloads", status: "live" },
                { name: "Falcon", role: "permissive license, multilingual variants", status: "ready" },
                { name: "Custom Trained", role: "domain-specific, distilled to your dataset", status: "optional" },
              ],
            },
            {
              groupTitle: "Inference",
              groupCaption: "backend runtimes",
              items: [
                { name: "vLLM", role: "high-throughput batched serving, PagedAttention", status: "live" },
                { name: "TGI", role: "Hugging Face text-generation-inference, streaming", status: "ready" },
                { name: "Ollama", role: "single-host deployment, simplest operations", status: "ready" },
                { name: "llama.cpp", role: "edge / CPU-only / quantized GGUF inference", status: "optional" },
              ],
            },
            {
              groupTitle: "Infrastructure",
              groupCaption: "your hardware",
              items: [
                { name: "Docker / Compose", role: "containerized services, reproducible builds", status: "live" },
                { name: "Postgres + pgvector", role: "primary database with vector embeddings", status: "live" },
                { name: "Prometheus + Grafana", role: "metrics, alerting, dashboards configured for your stack", status: "live" },
                { name: "Caddy / nginx", role: "reverse proxy, TLS, and rate-limiting at the edge", status: "ready" },
              ],
            },
          ]}
        />
      </Section>

      <WorkExamples companies={exampleCompanies} />

      <CTASection
        title="Own Your Stack"
        subtitle="Get your AI running on hardware you control. No vendor lock-in, no usage bills creeping up — just infrastructure you own and documentation you can hand off."
      />
      <Footer />
    </>
  );
}
