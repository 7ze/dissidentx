import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { formatDate } from "../lib/essays";

function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/^---[\s\S]*?---/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/[*_~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const GET: APIRoute = async () => {
  const essays = await getCollection("essays");

  const searchIndex = essays.map((essay) => {
    const rawBody = essay.body || "";
    const cleanContent = stripMarkdown(rawBody);

    return {
      id: essay.id,
      title: essay.data.title,
      description: essay.data.description,
      tags: essay.data.tags || [],
      categoryTag: essay.data.categoryTag || "",
      date: formatDate(essay.data.pubDate),
      timestamp: essay.data.pubDate.valueOf(),
      content: cleanContent,
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
