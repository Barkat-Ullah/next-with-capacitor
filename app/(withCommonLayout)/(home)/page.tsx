
import Hero from "@/src/components/Home/Hero";
import BlogSection from "../blog/page";

export default function HomePage() {
  return (
    <main className="min-h-screen rounded-sm">
      {/* Hero Section */}
      <Hero />
      {/* Blog Feed */}
      <BlogSection />
    </main>
  );
}
