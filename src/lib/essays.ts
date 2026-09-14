import { getCollection, type CollectionEntry } from "astro:content";

export type EssayEntry = CollectionEntry<"essays">;

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toRoman(num: number): string {
  if (num <= 0) return "I";
  const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  let n = num;
  for (const [val, roman] of romanMap) {
    while (n >= val) {
      result += roman;
      n -= val;
    }
  }
  return result || "I";
}

export async function getEssays(includeDrafts = import.meta.env.DEV): Promise<EssayEntry[]> {
  const essays = await getCollection("essays", ({ data }) => {
    return includeDrafts ? true : !data.draft;
  });
  return essays.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
