import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Shield } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-drift-gray hover:text-sunset-gold transition-colors text-sm mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-10">
        <span className="text-xs font-mono text-sunset-gold uppercase tracking-wider">
          {post.category.replace("-", " ")}
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-drift-gray">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime} min read
          </span>
        </div>
      </header>

      {/* Post Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
                   prose-headings:font-heading prose-headings:text-sand-white
                   prose-a:text-sunset-gold prose-a:no-underline hover:prose-a:underline
                   prose-code:text-sunset-gold prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                   prose-pre:bg-background prose-pre:border prose-pre:border-border
                   prose-strong:text-sand-white
                   prose-th:text-sand-white prose-td:text-drift-gray
                   prose-hr:border-border"
      >
        {/* MDX content would be rendered here via next-mdx-remote */}
        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
      </div>

      {/* Mid-article CTA */}
      <div className="card border-sunset-gold/20 text-center my-12 !p-8">
        <Shield className="w-8 h-8 text-sunset-gold mx-auto mb-3" />
        <h3 className="text-xl font-heading font-semibold mb-2">
          Get the weekly security briefing
        </h3>
        <p className="text-drift-gray text-sm mb-4">
          One email every Tuesday. AI threats, crypto security, freedom
          strategies.
        </p>
        <NewsletterForm />
      </div>

      {/* Affiliate Disclosure */}
      {post.affiliate.length > 0 && (
        <div className="alert-info text-xs text-drift-gray mt-8">
          <strong className="text-sand-white">Disclosure:</strong> This article
          contains affiliate links. We may earn a commission at no extra cost to
          you. We only recommend tools we&apos;ve personally tested and trust.
        </div>
      )}
    </article>
  );
}

// Simple markdown → HTML (will be replaced by next-mdx-remote in production)
function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const result: string[] = [];
  let inTable = false;
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table rows
    if (line.trim().startsWith("|")) {
      // Skip separator rows
      if (line.trim().match(/^\|[\s\-:|]+\|$/)) continue;

      if (!inTable) {
        if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
        result.push('<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">');
        inTable = true;
        // First row is header
        const cells = line.split("|").filter(Boolean).map((c) => c.trim());
        result.push("<thead><tr>" + cells.map((c) => `<th class="text-left p-3 border-b border-border text-sand-white font-semibold">${applyInline(c)}</th>`).join("") + "</tr></thead><tbody>");
        continue;
      }
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      result.push("<tr>" + cells.map((c) => `<td class="p-3 border-b border-border/40 text-drift-gray">${applyInline(c)}</td>`).join("") + "</tr>");
      continue;
    } else if (inTable) {
      result.push("</tbody></table></div>");
      inTable = false;
    }

    // Headers
    if (line.startsWith("### ")) {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      result.push(`<h3 class="text-xl font-heading font-semibold mt-8 mb-3">${applyInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      result.push(`<h2 class="text-2xl font-heading font-bold mt-10 mb-4">${applyInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      result.push(`<h1 class="text-3xl font-heading font-bold mt-12 mb-4">${applyInline(line.slice(2))}</h1>`);
      continue;
    }

    // Unordered list items
    if (line.match(/^- (.+)/)) {
      if (!inList || listType !== "ul") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push('<ul class="list-disc ml-6 my-4 space-y-1">');
        inList = true;
        listType = "ul";
      }
      result.push(`<li class="text-drift-gray">${applyInline(line.replace(/^- /, ""))}</li>`);
      continue;
    }

    // Checkbox list items
    if (line.match(/^\d+\.\s*\[[ x]\]/)) {
      if (!inList || listType !== "ol") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push('<ol class="list-decimal ml-6 my-4 space-y-1">');
        inList = true;
        listType = "ol";
      }
      const content = line.replace(/^\d+\.\s*\[[ x]\]\s*/, "");
      const checked = line.includes("[x]");
      result.push(`<li class="text-drift-gray">${checked ? "&#9745;" : "&#9744;"} ${applyInline(content)}</li>`);
      continue;
    }

    // Ordered list items
    if (line.match(/^\d+\.\s+(.+)/)) {
      if (!inList || listType !== "ol") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push('<ol class="list-decimal ml-6 my-4 space-y-1">');
        inList = true;
        listType = "ol";
      }
      result.push(`<li class="text-drift-gray">${applyInline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    // Close list if we're not in a list item
    if (inList && line.trim() === "") {
      result.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      result.push('<hr class="border-border my-8" />');
      continue;
    }

    // Empty line
    if (line.trim() === "") continue;

    // Paragraph
    if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
    result.push(`<p class="mb-4 leading-relaxed">${applyInline(line)}</p>`);
  }

  if (inTable) result.push("</tbody></table></div>");
  if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");

  return result.join("\n");
}

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-sand-white'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code class='text-sunset-gold bg-surface px-1.5 py-0.5 rounded text-sm'>$1</code>");
}
