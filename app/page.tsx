import { BlogCard } from "@/src/components/BlogCard";
import { BLOG_POSTS } from "@/src/data";

export default function HomePage() {
  return (
    <main className="min-h-screen rounded-sm">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl mb-6">
            The Future of <span className="text-primary">Insights</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Expertly curated stories on engineering, design, and the modern web
            ecosystem.
          </p>
        </div>
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </section>

      {/* Blog Feed */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
