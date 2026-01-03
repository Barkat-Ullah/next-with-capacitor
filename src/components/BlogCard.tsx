import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group relative block rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
    >
      <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          height={30}
          width={30}
        />
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
        <span>{post.category}</span>
        <span>•</span>
        <span>{post.date}</span>
      </div>
      <h3 className="text-xl font-bold leading-tight group-hover:text-primary mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {post.excerpt}
      </p>
    </Link>
  );
}
