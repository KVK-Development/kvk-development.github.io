import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import { fadeIn, staggerChildren } from "../utils/motion";
import posts from "../data/blogPosts.json";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={post.tags}
      />

      <motion.article
        variants={staggerChildren(0.08)}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto px-6"
      >
        <motion.div variants={fadeIn()}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-darkmesa hover:text-redmesa transition"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        <motion.span
          variants={fadeIn(0.05)}
          className="mt-8 block text-xs uppercase tracking-[0.2em] text-redmesa font-medium"
        >
          {formattedDate} &middot; {post.author}
        </motion.span>

        <motion.h1
          variants={fadeIn(0.1)}
          className="mt-4 text-4xl md:text-5xl font-extrabold text-darkmesa tracking-tight leading-tight"
        >
          {post.title}
        </motion.h1>

        <motion.div
          variants={fadeIn(0.2)}
          className="mt-10 space-y-6 text-lg text-zinc-700 leading-relaxed"
        >
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </motion.article>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
