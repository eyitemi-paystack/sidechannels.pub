import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    type: z.enum(['RCA', 'ESSAY', 'NOTE']),
    title: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.object({
      name: z.string(),
      affiliation: z.string().optional(),
      url: z.string().url().optional(),
    })),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    references: z.array(z.object({
      id: z.string(),
      title: z.string(),
      authors: z.string(),
      year: z.string(),
      journal: z.string().optional(),
      url: z.string().optional(),
    })).default([]),
    rcaMetadata: z.object({
      vendor: z.string(),
      product: z.string(),
      cveId: z.string(),
      reportDate: z.string(),
      patchDate: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { posts };
