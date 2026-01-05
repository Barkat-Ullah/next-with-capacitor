"use client";

import { useEffect, useState } from "react";
import { LibraryScreen } from "@/src/components/Home/AllBlog";
import { getLibraryContent, LibraryItem } from "@/src/services/article.index";

const BlogSection = () => {
  const [libraryContent, setLibraryContent] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getLibraryContent();
      setLibraryContent(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-10">Loading blogs...</div>;

  return (
    <main className="min-h-screen">
      <section className="container mx-auto">
        <LibraryScreen initialData={libraryContent} />
      </section>
    </main>
  );
};

export default BlogSection;
