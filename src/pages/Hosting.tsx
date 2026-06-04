import Hero from "../components/Hero";
import Section from "../components/Section";
import ServiceCard from "../components/ServiceCard";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import CleanPrivacy from "../components/CleanPrivacy";
import {
  ShieldCheck,
  Lock,
  CloudOff,
  Cpu,
  Monitor,
  FileCheck,
  Zap,
  EyeOff,
  Server,
  Database,
  Boxes, 
  Brain, 
} 
  from "lucide-react";

const privateHostingFeatures = [
  {
    title: "Data Encryption",
    icon: Lock,
    desc: "AES-256 at rest, TLS 1.3 in transit—industry-standard and enforced.",
  },
  {
    title: "Air-Gapped Ready",
    icon: ShieldCheck,
    desc: "Fully isolated environments for the highest security requirements.",
  },
  {
    title: "Audit Logging",
    icon: Zap,
    desc: "Immutable logs and detailed access history to support compliance.",
  },
  {
    title: "Access Control",
    icon: EyeOff,
    desc: "Least-privilege, role-based access down to the container level.",
  },
  {
    title: "Compliant by Default",
    icon: Database,
    desc: "Architected to align with HIPAA, SOC2, and GDPR mandates.",
  },
  {
    title: "Deploy Anywhere",
    icon: Server,
    desc: "Run locally, in your VPC, or on hardened internal clusters.",
  },
];

export default function Hosting() {
  return (
    <>
      <Hero
      title = "Hosting & Deployment Solutions. Tailored for Startups"
      subtitle = "Data stays where it belongs. Models run where you say."
      direction="tr"
      />

<Section
  id="why-private"
  title="Why Private Hosting?"
  subtitle="Secure, compliant, and fully under your control."
>
  <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto auto-rows-fr">
    <ServiceCard
      title="Data Sovereignty"
      desc="The cloud is another way of saying 'someone elses computer'. Keep your data in your hands."
      Icon={ShieldCheck}
      delay={0.0}
    />
    <ServiceCard
      title="Zero Third-Party Exposure"
      desc="Run secure and isolated environments with no external exposure."
      Icon={Lock}
      delay={0.05}
    />
    <ServiceCard
      title="Air-Gapped Deployments"
      desc="Full offline mode for sensitive environments."
      Icon={CloudOff}
      delay={0.1}
    />
    <ServiceCard
      title="Custom Infrastructure"
      desc="Deploy on hardware tailored to your needs. No one-size-fits-all here."
      Icon={Cpu}
      delay={0.15}
    />
    <ServiceCard
      title="Real-Time Monitoring"
      desc="Keep tabs on performance, security, and uptime 24/7."
      Icon={Monitor}
      delay={0.2}
    />
    <ServiceCard
      title="Auditable by Design"
      desc="You control everything. Full logs, full visibility, full compliance."
      Icon={FileCheck}
      delay={0.25}
    />
  </div>
</Section>


      <CleanPrivacy features={privateHostingFeatures} />;

      <Section
  id="stack"
  title="What We Support"
  subtitle="We work with the open-source models and infra your team already knows."
>
  <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto auto-rows-fr">
    <ServiceCard
      title="LLMs"
      desc="LLaMA, Mistral, Falcon, and other open-source Large Language Models."
      Icon={Cpu}
      delay={0.0}
    />
    <ServiceCard
      title="Inference Backends"
      desc="vLLM, TGI, Ollama, llama.cpp, and custom runners."
      Icon={Boxes}
      delay={0.05}
    />
    <div className="lg:col-span-2">
      <ServiceCard
        title="Custom Matching Models"
        desc={
          <>
            We build and deploy tensor matching models tailored to your data.
            <div className="mt-4">
              <a
                href="/matching-models"
                className="inline-block bg-white text-darkmesa px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Learn More →
              </a>
            </div>
          </>
        }
        Icon={Brain}
        delay={0.1}
        wobbleIntensity={0.1}
      />
    </div>
  </div>
</Section>

      <CTASection />
      <Footer />
    </>
  );
}