export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development with Next.js 16",
    excerpt:
      "Explore the latest features including Cache Components and improved performance metrics.",
    content:
      'Next.js 16 introduces a revolutionary way to handle caching with the new "use cache" directive. This allows developers to explicitly define caching boundaries at the component and function level...',
    date: "Jan 1, 2026",
    author: "Vercel Team",
    image: "https://i.ibb.co.com/SXFD0Bcg/5821152.jpg",
    category: "Engineering",
  },
  {
    id: "2",
    title: "Building Native Apps with Capacitor",
    excerpt:
      "How to turn your web application into a high-performance native mobile app.",
    content:
      "Capacitor provides a consistent, web-focused set of APIs that enable an app to stay as close to web-standards as possible, while accessing native device features when needed...",
    date: "Jan 10, 2026",
    author: "Mobile Team",
    image: "https://i.ibb.co.com/SXFD0Bcg/5821152.jpg",
    category: "Mobile",
  },
  {
    id: "3",
    title: "Mastering Tailwind CSS v4",
    excerpt:
      "The latest version of Tailwind CSS brings even more power to your styling workflow.",
    content:
      "Tailwind CSS v4 is faster, more flexible, and comes with a brand new engine that makes development even more enjoyable...",
    date: "Jan 15, 2026",
    author: "Design Team",
    image: "https://i.ibb.co.com/SXFD0Bcg/5821152.jpg",
    category: "Design",
  },
];
