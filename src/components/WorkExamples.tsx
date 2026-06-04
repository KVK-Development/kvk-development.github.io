import { motion } from "framer-motion";
import { staggerChildren, fadeIn } from "../utils/motion";
import { ExternalLink } from "lucide-react";

interface Company {
  name: string;
  url: string;
  logo?: string;
  fill?: boolean;
}

interface WorkExamplesProps {
  companies: Company[];
  heading?: string;
  light?: boolean;
}

export default function WorkExamples({
  companies,
  heading = "Companies We've Worked With",
  light = false,
}: WorkExamplesProps) {
  if (companies.length === 0) return null;

  return (
    <section className={`py-20 px-6 ${light ? "bg-white" : "bg-gray-50"}`}>
      <motion.div
        variants={staggerChildren()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeIn()}
          className="text-3xl md:text-4xl font-semibold text-darkmesa tracking-tight"
        >
          {heading}
        </motion.h2>

        <motion.div
          variants={fadeIn(0.15)}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {companies.map((company, i) => (
            <motion.a
              key={i}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ rotate: 12, scale: 0.8, opacity: 0 }}
              whileInView={{
                rotate: 0,
                scale: 1,
                opacity: 1,
                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-3"
            >
              {company.logo ? (
                <div className="w-28 h-28 rounded-full bg-white border-4 border-darkmesa flex items-center justify-center overflow-hidden shadow-lg group-hover:border-redmesa group-hover:shadow-xl transition-all">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className={company.fill ? "w-full h-full object-cover" : "w-3/4 h-3/4 object-contain"}
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-darkmesa text-white flex items-center justify-center group-hover:bg-redmesa transition-colors shadow-lg">
                  <span className="text-lg font-bold">
                    {company.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-base font-medium text-zinc-700 group-hover:text-redmesa transition-colors flex items-center gap-1">
                {company.name}
                <ExternalLink size={14} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
