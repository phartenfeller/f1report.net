import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    slug: z.string().optional(),
    titleImage: image().optional(),
    titleImageAlt: z.string().optional(),
    titleImageSource: z.object({
        text: z.string().optional(),
        href: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { blog };
