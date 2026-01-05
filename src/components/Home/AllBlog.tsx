"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { ContentType, LibraryItem } from "@/src/services/article.index";
import Image from "next/image";
import { LibraryCard } from "./BlogCard";
import { cn } from "@/src/utils/cn";

const CATEGORIES: (ContentType | "All")[] = [
  "All",
  "Articles",
  "Podcast",
  "Books",
];

interface LibraryScreenProps {
  initialData?: LibraryItem[];
}

export function LibraryScreen({ initialData = [] }: LibraryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ContentType | "All">(
    "All"
  );
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        activeCategory === "All" || item.content === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialData, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Area */}
      <div className="sticky top-0 z-40 bg-background/95 pb-4 pt-6 backdrop-blur-md">
        <div className="container px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="animate-slide-in">
              <h1 className="text-3xl font-black tracking-tighter text-foreground sm:text-4xl">
                Learning Library
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Explore articles, podcasts and books
              </p>
            </div>
            <div className="size-10 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
              <Image
                src="https://i.ibb.co.com/WpH6qBCM/images-8.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
                height={30}
                width={30}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div
              className={cn(
                "flex h-12 items-center rounded-2xl border bg-muted/50 px-4 transition-all duration-300",
                isSearchActive
                  ? "border-primary ring-4 ring-primary/10"
                  : "border-border"
              )}
            >
              <Search
                className={cn(
                  "size-5 transition-colors",
                  isSearchActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <input
                type="text"
                placeholder="Search topics, tags or titles..."
                className="flex-1 bg-transparent px-3 text-sm font-medium outline-none placeholder:text-muted-foreground/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => setIsSearchActive(false)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-full bg-muted p-1 text-muted-foreground hover:bg-muted-foreground/10"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex h-9 items-center rounded-full px-5 text-xs font-bold transition-all duration-300 whitespace-nowrap border",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-background text-muted-foreground border-border hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container px-4 pb-32">
        {filteredData.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className="animate-slide-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}
              >
                <LibraryCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
              <Filter className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No matches found
            </h3>
            <p className="max-w-62.5 text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 font-bold text-primary underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
