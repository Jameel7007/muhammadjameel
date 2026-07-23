# Muhammad Jameel — author website

A fully static Astro site. Writing lives in Markdown files; publishing a post is adding a file.

## Commands

```sh
npm install      # once
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built site locally
```

## Publishing a new post

1. Create a new `.md` (or `.mdx`) file in `src/content/blog/`. The filename becomes the URL slug — `my-new-essay.md` → `/blog/my-new-essay/`.
2. Add frontmatter at the top:

   ```yaml
   ---
   title: My New Essay
   date: 2026-08-01
   description: One line shown under the title on the index and as the post subtitle.
   tags: [Sufism, Commentary]
   type: article   # "article" for essays, "note" for short writings
   draft: false    # true = excluded from the build, index, RSS and sitemap
   featured: false # true = shown large at the top of the homepage blog section
   ---
   ```

3. Write the post body in Markdown below the frontmatter. Blockquotes (`>`) render as the centered green pull-quotes; footnotes use `[^1]` inline and `[^1]: text` at the bottom.
4. Commit and push (or run `npm run build`). That's it — the index, RSS feed and sitemap update automatically, newest first, and reading time is computed from the word count.

Start from `draft: true` if you want to work on a post without publishing it.

**Featuring a post:** set `featured: true` on exactly one post to show it prominently (large title, description, date, reading time under a "Featured" label) at the top of the homepage blog section, followed by the two most recent other posts. With no featured post, the homepage simply shows the latest three. If several posts carry the flag, the newest one wins.

## Images in posts

A post that needs images should be a **folder** instead of a single file — the slug stays the same:

```
src/content/blog/
  a-text-only-post.md              → /blog/a-text-only-post/
  my-post-with-images/             → /blog/my-post-with-images/
    index.md      (or index.mdx)
    photo.jpg
```

Reference co-located images with a relative path and they are processed through Astro's image optimization (resized, converted, hashed) at build time:

```md
![A bench outside the mosque](./photo.jpg)
```

Markdown images render full column width with square edges, matching the design.

For a **captioned** image, name the post `index.mdx` and use the `Figure` component (`src/components/Figure.astro`) — the caption is typeset small, italic, centered, in muted gray:

```mdx
import Figure from '../../../components/Figure.astro';
import photo from './photo.jpg';

<Figure src={photo} alt="A bench outside the mosque" caption="The bench, photographed in 2019." />
```

`Figure` also accepts a plain string `src` for images in `public/` or remote URLs (those skip optimization). See `src/content/blog/the-people-of-the-bench/` for a working example of a folder post using `Figure`.

## Editing site copy

All fixed site text lives in plain files under `src/content/site/` — edit these, not the components:

| File | Holds |
| --- | --- |
| `src/content/site/bio.md` | The bio paragraphs (Markdown body) and the green pull quote (`quote:` in frontmatter). The full bio shows on `/about`; the homepage shows only the paragraphs above the `<!-- homepage-end -->` marker (at most two) with a "Read the full biography" link. |
| `src/content/site/books.md` | The three books: cover title lines, cover color (`green`/`ink`/`red`), description, buy link and button label. |
| `src/content/site/footer.md` | Newsletter heading, blurb, email placeholder, button label, thank-you message, social links, and the copyright line (year is added automatically). |
| `src/content/site/documents.md` | The documents list: title, page count, description, and the PDF path under `public/documents/`. |

## Where things live

- `src/styles/tokens.css` — **all** design tokens (colors, fonts, spacing). Change the palette here only.
- `src/content/blog/` — posts.
- `src/content/site/` — all fixed site copy (see "Editing site copy" above).
- `public/documents/` — the PDFs behind the Documents section. The current ones are placeholders.
- `src/assets/portrait.jpg` — the bio portrait (shown on `/` and `/about`); replace the file to change it.
- `public/og-default.png` — default social-share image.
- `astro.config.mjs` — set `site` to your production domain (used by canonical URLs, RSS and the sitemap).
- The footer subscribe form posts to Buttondown (username `jameel`, set as `buttondownUsername:` in `src/content/site/footer.md`). The reader stays on the page and sees the site's own thank-you message; a failed request shows the inline `subscribeError:` message instead.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In Cloudflare Pages: **Create project → connect the repo**.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Set `site` in `astro.config.mjs` to the final domain and redeploy.

Routes: `/`, `/about`, `/blog` (paginated, 10 per page), `/blog/<slug>`, `/documents`, `/rss.xml`, `/sitemap.xml`.
