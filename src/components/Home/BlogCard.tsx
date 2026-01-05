"use client";

import { LibraryItem } from "@/src/services/article.index";
import { Play, BookOpen, FileText, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LibraryCardProps {
  item: LibraryItem;
}

export function LibraryCard({ item }: LibraryCardProps) {
  const isPodcast = item.content === "Podcast";
  const isBook = item.content === "Books";
  const isArticle = item.content === "Articles";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]">
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=400&width=600"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          height={30}
          width={30}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {isPodcast && <Play className="size-3 fill-current" />}
          {isBook && <BookOpen className="size-3" />}
          {isArticle && <FileText className="size-3" />}
          {item.content}
        </div>

        {/* Duration Badge */}
        {item.estimatedTime && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
            <Clock className="size-3" />
            {item.estimatedTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium text-primary/80">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-1 text-lg font-bold leading-tight tracking-tight text-foreground line-clamp-2">
          {item.title}
        </h3>
        {item.subTitle && (
          <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
            {item.subTitle}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.category?.replace("_", " ") || "General"}
          </span>
          <Link href={`/blog/blog-detail?id=${item.id}`}>
            <button className="flex items-center gap-1 text-[11px] font-bold text-primary transition-colors hover:text-primary/70">
              {isBook ? "READ PDF" : isPodcast ? "LISTEN NOW" : "READ ARTICLE"}
              <ExternalLink className="size-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
