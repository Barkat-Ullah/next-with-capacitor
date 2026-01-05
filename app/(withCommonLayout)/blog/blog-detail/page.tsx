"use client";
import { getLibraryContent, LibraryItem } from "@/src/services/article.index";
import { Calendar, ChevronLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [post, setPost] = useState<LibraryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const allItems = await getLibraryContent();
      const item = allItems.find((p) => p.id === id);
      setPost(item || null);
      setLoading(false);
    };
    fetchData();
  }, [id]);

if (loading) return <div className="text-center p-10">Loading blogs...</div>;
  if (!post) return <p>Post not found</p>;
  return (
    <article className=" py-10 bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-10 w-10 bg-secondary rounded-full p-2" />
          <span>Back to Library</span>
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-xs font-medium uppercase text-muted-foreground mb-4">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            {post.estimatedTime && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {post.estimatedTime}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold sm:text-5xl mb-6">{post.title}</h1>
        </header>

        <div className="relative aspect-video mb-12 overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="text-lg leading-relaxed whitespace-pre-line text-foreground/90">
          {post.description}
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
