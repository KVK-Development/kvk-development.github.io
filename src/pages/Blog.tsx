import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import posts from "../data/blogPosts.json";

const ROW_SIZE = 3;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const [visibleCount, setVisibleCount] = useState(ROW_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + ROW_SIZE, posts.length));
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <Seo
        title="Blog"
        description="Insights on AI software development, on-premises infrastructure, and building products startups own."
        path="/blog"
      />

      <Hero
        eyebrow="Blog"
        title="From the Blog"
        subtitle="Notes on AI software, infrastructure, and building products worth owning."
        direction="tr"
        cta={<></>}
        compact
      />

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-md hover:shadow-lg transition"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-redmesa font-medium">
                    {formatDate(post.date)}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold text-darkmesa tracking-tight group-hover:text-redmesa transition">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-zinc-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 text-sm font-medium text-darkmesa group-hover:text-redmesa transition">
                    Read more &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {visibleCount < posts.length && (
            <div ref={sentinelRef} aria-hidden="true" className="h-1" />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
