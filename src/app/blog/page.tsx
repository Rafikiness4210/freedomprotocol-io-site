import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AI security intelligence, crypto protection guides, and freedom blueprints. Updated weekly.",
};

const categoryColors: Record<string, string> = {
  "ai-security": "text-ocean-blue",
  "crypto-security": "text-sunset-gold",
  "expat-freedom": "text-lagoon-teal",
  "tools-reviews": "text-warm-coral",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="section-heading mb-4">Blog</h1>
        <p className="text-drift-gray max-w-2xl">
          Security intelligence, crypto protection, and sovereignty strategies.
          New protocols published weekly.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {["All", "AI Security", "Crypto Security", "Expat Freedom", "Tools & Reviews"].map(
          (cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm border border-border text-drift-gray
                         hover:border-sunset-gold hover:text-sunset-gold transition-colors"
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-drift-gray mb-2">First dispatches incoming.</p>
          <p className="text-sm text-drift-gray">
            Subscribe to{" "}
            <Link href="/newsletter" className="text-sunset-gold hover:underline">
              The Protocol
            </Link>{" "}
            to get notified.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    categoryColors[post.category] || "text-drift-gray"
                  }`}
                >
                  {post.category.replace(/-/g, " ")}
                </span>
                <span className="text-xs text-drift-gray">
                  {post.readingTime} min read
                </span>
              </div>
              <h2 className="text-lg font-heading font-semibold mb-2 group-hover:text-sunset-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-drift-gray text-sm leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-drift-gray">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-sunset-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
