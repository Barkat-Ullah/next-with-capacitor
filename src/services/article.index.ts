/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preferences } from "@capacitor/preferences";

export type ContentType = "Articles" | "Podcast" | "Books";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL ;

export interface LibraryItem {
  id: string;
  title: string;
  subTitle: string | null;
  description: string;
  category: string | null;
  content: ContentType;
  tags: string[];
  estimatedTime: string | null;
  image: string;
  pdf: string | null;
  content_url: string | null;
  createdAt: string;
  isFavorite: boolean;
}

export async function getLibraryContent(): Promise<LibraryItem[]> {
  try {
    if (typeof window === "undefined") return [];
    const { value: token } = await Preferences.get({
      key: "accessToken",
    });

    const response = await fetch(`${apiUrl}/article`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const result = await response.json();
    const articles = Array.isArray(result) ? result : result.data || [];

    return articles.map((item: any) => ({
      id: item._id || item.id,
      title: item.title,
      subTitle: item.subTitle || null,
      description: item.description || "",
      category: item.category || null,
      content: item.content || "Articles",
      tags: item.tags || [],
      estimatedTime: item.estimatedTime || null,
      image: item.image || "/placeholder.svg?height=400&width=600",
      pdf: item.pdf || null,
      content_url: item.content_url || null,
      createdAt: item.createdAt || new Date().toISOString(),
      isFavorite: item.isFavorite || false,
    }));
  } catch (error) {
    console.error("Error fetching library content:", error);
    return [];
  }
}

export async function getLibraryItem(id: string): Promise<LibraryItem | null> {
  const allItems = await getLibraryContent();
  if (!allItems) return null;
  return allItems.find((item) => item.id === id) || null;
}
