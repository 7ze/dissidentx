import { getCollection, type CollectionEntry } from "astro:content";

export type EssayEntry = CollectionEntry<"essays">;

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function getEssays(): Promise<EssayEntry[]> {
  const essays = await getCollection("essays");
  return essays.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
