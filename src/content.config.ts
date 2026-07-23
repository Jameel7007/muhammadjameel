import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Posts are either a single file (my-post.md) or a folder with co-located
  // images (my-post/index.md). Both produce the slug "my-post".
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    // "article" = full-length essay; "note" = short writing.
    type: z.enum(['article', 'note']).default('article'),
    // Drafts are excluded from builds, the index, RSS and the sitemap.
    draft: z.boolean().default(false),
    // Featured post: shown prominently at the top of the homepage blog
    // section. If no post is flagged, the homepage shows the latest three.
    featured: z.boolean().default(false),
  }),
});

// Editable site copy — one file per section under src/content/site/.
// Prose lives in the Markdown body; structured copy (lists, links) in frontmatter.
const site = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/site' }),
  schema: z.object({
    // bio.md
    quote: z.string().optional(),
    // books.md
    books: z
      .array(
        z.object({
          titleLines: z.array(z.string()),
          cover: z.enum(['green', 'ink', 'red']),
          description: z.string(),
          link: z.string().url(),
          buyLabel: z.string().default('Buy on Amazon'),
        })
      )
      .optional(),
    // footer.md
    newsletterHeading: z.string().optional(),
    newsletterBlurb: z.string().optional(),
    emailPlaceholder: z.string().optional(),
    subscribeLabel: z.string().optional(),
    subscribeThanks: z.string().optional(),
    subscribeError: z.string().optional(),
    buttondownUsername: z.string().optional(),
    social: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
    copyright: z.string().optional(),
    // documents.md
    documents: z
      .array(
        z.object({
          title: z.string(),
          pages: z.number(),
          description: z.string(),
          file: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, site };
