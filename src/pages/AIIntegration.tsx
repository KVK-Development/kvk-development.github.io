import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Seo, { serviceStructuredData } from "../components/Seo";
import Section from "../components/Section";
import Lede from "../components/Lede";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import WorkExamples from "../components/WorkExamples";
import NeuralConstellation from "../components/signatures/NeuralConstellation";
import ServerRack from "../components/signatures/ServerRack";
import SpotlightGrid from "../components/layouts/SpotlightGrid";
import ComparisonBlock from "../components/layouts/ComparisonBlock";
import StackInventory from "../components/layouts/StackInventory";
import { fadeIn, staggerChildren } from "../utils/motion";
import {
  Mic,
  Brain,
  Search,
  Server as ServerIcon,
  Check,
  ArrowRight,
} from "lucide-react";

const exampleCompanies = [
  { name: "AI Client", url: "#" },
  { name: "Startup X", url: "#" },
  { name: "Project Y", url: "#" },
];

const onPremPoints = [
  "Run on your hardware, your VPC, or fully air-gapped",
  "Own the model weights, runtime, and inference code",
  "No usage bills — inference never ticks a meter",
  "Documentation and handoff so your team can run it",
];

export default function Solutions() {
  return (
    <>
      <Seo
        title="AI Integration and Full Stack Software Development"
        description="Build production software with AI included: voice agents, custom trained models, semantic search, workflow integration, and full stack application development."
        path="/solutions"
        keywords={[
          "AI integration",
          "custom AI models",
          "voice AI development",
          "semantic search",
          "full stack software development",
        ]}
        structuredData={serviceStructuredData(
          "AI Integration and Software Development",
          "Complete software product development with practical AI integration, custom models, semantic search, and voice AI pipelines.",
          "/solutions"
        )}
      />
      <Hero
        eyebrow="AI Implementation & On-Prem"
        title="Full Solutions. AI Included."
        subtitle="We build AI into the core of your product — and run it on infrastructure you own, on-premises wherever it matters."
        direction="tl"
        signature={<NeuralConstellation />}
      />

      <Lede
        eyebrow="What AI Implementation Means"
        title={<>We build the AI <em className="not-italic text-redmesa">into</em> the product, not on top of it.</>}
      >
        <p>
          We don't bolt AI onto existing products. We build the AI layer into the core of your
          application — from voice agents and custom-trained models to semantic search and intelligent
          automation. Every integration is chosen for your actual workload, not for a demo reel.
        </p>
        <p>
          Most teams reach for GPT-4 by reflex. More often, a custom-trained model, a voice pipeline,
          or a semantic search layer is faster, cheaper, and more accurate for the actual task.
          We pick the right tool, not the trending one — and we'll run it on hardware you own.
        </p>
      </Lede>

      <Section
        id="ai-integration"
        title="How We Integrate AI"
        subtitle="The AI layer of every product we build, designed around your actual workload."
      >
        <SpotlightGrid
          feature={{
            tag: "Featured Capability",
            title: "Voice AI with Vapi & Deepgram",
            desc: "Real-time voice agents for sales training, call automation, and conversational workflows. We integrate, configure, and deploy full voice pipelines — from speech-to-text through reasoning to natural-sounding response, all stitched into your existing backend.",
            Icon: Mic,
          }}
          items={[
            {
              title: "Custom Trained Models",
              desc: "Domain-specific models trained on your data. Smaller, faster, and more accurate than general-purpose LLMs for your specific use case.",
              Icon: Brain,
            },
            {
              title: "Semantic Search & Embeddings",
              desc: "Search that understands meaning, not just keywords — without the cost and latency of a full LLM round-trip.",
              Icon: Search,
            },
            {
              title: "On-Premises AI",
              desc: "Run inference on your own hardware or private cloud. Full control, no token bills, no third-party exposure.",
              Icon: ServerIcon,
            },
          ]}
        />
      </Section>

      <Section
        id="right-tool"
        title="Right Tool, Not Trending Tool"
        subtitle="A pattern we see often. A pattern we don't repeat."
        light
      >
        <ComparisonBlock
          left={{
            label: "How We Choose",
            caption: "Fit-for-purpose",
            items: [
              "Custom-trained small model when the task is narrow and repeated",
              "Semantic search and embeddings when retrieval beats generation",
              "Voice pipeline (Vapi + Deepgram) when latency matters more than reasoning depth",
              "GPT-4-class models only when the task genuinely needs that capability",
              "Local inference when data sensitivity or cost is the bottleneck",
            ],
          }}
          right={{
            label: "What We See",
            caption: "Reflexive GPT-4",
            items: [
              "GPT-4 wrapped around every problem regardless of fit",
              "$10K/month token bills for tasks an embedding could solve",
              "Vendor APIs in the hot path of every request",
              "Latency that makes voice and real-time use unworkable",
              "Customer data flowing to a third party by default",
            ],
          }}
        />
      </Section>

      {/* ───────── On-Prem feature band ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-redmesa via-darkmesa to-black text-white">
        <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute bottom-[-30vw] right-[-20vw] w-[55vw] h-[55vw] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={staggerChildren(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-6"
          >
            <motion.div
              variants={fadeIn(0)}
              className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-redmesa/90 font-medium"
            >
              <span className="h-px w-8 bg-redmesa/60" />
              On-Prem · A Feature, Not a Product
            </motion.div>

            <motion.h2
              variants={fadeIn(0.1)}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]"
            >
              Where It Runs Is Up to You.
            </motion.h2>

            <motion.p
              variants={fadeIn(0.2)}
              className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-xl"
            >
              On-premises isn't a separate product — it's how we deploy. The hardware, the model
              weights, and the data can all sit inside your perimeter: no managed service in the hot
              path, no per-token meter, no vendor account standing between you and your own stack. The
              same goes for anything we build{" "}
              <Link
                to="/end-to-end"
                className="text-redmesa underline-offset-4 hover:underline font-medium"
              >
                end to end
              </Link>
              .
            </motion.p>

            <motion.ul variants={fadeIn(0.3)} className="mt-8 space-y-3">
              {onPremPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-zinc-200">
                  <Check className="text-redmesa shrink-0 mt-1" size={18} strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeIn(0.4)} className="mt-10">
              <Link
                to="/end-to-end"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-100 transition"
              >
                See it end to end
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center w-full"
            aria-hidden="true"
          >
            <div className="w-full max-w-[420px] mx-auto">
              <ServerRack />
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        id="stack"
        title="What We Deploy On-Prem"
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
                { name: "Prometheus + Grafana", role: "metrics, alerting, dashboards for your stack", status: "live" },
                { name: "Caddy / nginx", role: "reverse proxy, TLS, and rate-limiting at the edge", status: "ready" },
              ],
            },
          ]}
        />
      </Section>

      <WorkExamples companies={exampleCompanies} />

      <CTASection
        title="Integrate and Launch"
        subtitle="Voice agents, custom models, semantic search — and the freedom to run all of it on hardware you own, not on someone else's meter. Pick the AI that fits your product, and we'll make it work on premises."
      />
      <Footer />
    </>
  );
}
