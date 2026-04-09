import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    type: z.enum(['RCA', 'ESSAY', 'NOTE', 'VULNERABILITY-RESEARCH']),
    title: z.string(),
    date: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    changelog: z.array(z.object({
      date: z.coerce.date(),
      description: z.string(),
    })).default([]),
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
    vulnResearchMetadata: z.object({
      target: z.string(),
      component: z.string().optional(),
      severity: z.enum(['INFORMATIONAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
      status: z.enum(['INVESTIGATING', 'REPORTED', 'PATCHED', 'WONT-FIX', 'DUPLICATE', 'N/A']).default('INVESTIGATING'),
      cveId: z.string().optional(),
      bountyPlatform: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { posts };
