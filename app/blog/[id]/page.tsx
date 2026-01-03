import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { BLOG_POSTS } from "@/src/data";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <article className="min-h-screen py-16 lg:py-24 ">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft className="h-12 w-12 bg-slate-100 rounded-full p-2" />

        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-tr from-gray-700 to-gray-500" />
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>
        </header>

        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full rounded-2xl border border-border mb-12"
          height={30}
          width={30}
        />

        <div className="prose prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-muted-foreground mb-8">
            {post.excerpt}
          </p>
          <div className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  );
}
