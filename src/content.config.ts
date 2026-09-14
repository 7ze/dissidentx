import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Byzantine Eagle"),
    tags: z.array(z.string()).optional(),
    categoryTag: z.string().optional(),
    numeral: z.string().optional(),
    isFeatured: z.boolean().optional(),
    draft: z.boolean().default(false),
    collection: z.preprocess((val) => val === true || val === "yes" || val === "true", z.boolean()).default(false),
  }),
});

export const collections = { essays };
