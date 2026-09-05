import Hero from "../components/Hero";
import Seo, { organizationStructuredData } from "../components/Seo";
import { Link } from "react-router-dom";
import { LayoutTemplate, Brain, Rocket, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="pt-0">
      <Seo
        title="AI Software Development for Startups"
        description="Red Mesa Development builds complete software products for startups with AI integration, on-premises infrastructure, and private deployment options."
        path="/"
        keywords={[
          "AI software development",
          "startup software development",
          "on premises AI",
          "private AI infrastructure",
          "full stack development",
        ]}
        structuredData={organizationStructuredData}
      />
      <Hero
        title="Red Mesa Development"
        subtitle="We build complete software products for startups, with AI built in and infrastructure you own."
        direction="br"
        cta={
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/websites"
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition flex items-center gap-2"
              >
                <LayoutTemplate size={20} />
                Website Building
              </Link>
              <Link
                to="/solutions"
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition flex items-center gap-2"
              >
                <Brain size={20} />
                AI Implementation
              </Link>
              <Link
                to="/end-to-end"
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition flex items-center gap-2"
              >
                <Rocket size={20} />
                End-to-End
              </Link>
            </div>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-full bg-black text-white font-medium border border-white hover:bg-zinc-900 transition flex items-center gap-2"
            >
              <BookOpen size={20} />
              Blog
            </Link>
          </div>
        }
      />
    </main>
  );
}
