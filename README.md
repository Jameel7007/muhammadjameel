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
   ---
   ```

3. Write the post body in Markdown below the frontmatter. Blockquotes (`>`) render as the centered green pull-quotes; footnotes use `[^1]` inline and `[^1]: text` at the bottom.
4. Commit and push (or run `npm run build`). That's it — the index, RSS feed and sitemap update automatically, newest first, and reading time is computed from the word count.

Start from `draft: true` if you want to work on a post without publishing it.

## Editing site copy

All fixed site text lives in plain files under `src/content/site/` — edit these, not the components:

| File | Holds |
| --- | --- |
| `src/content/site/bio.md` | The bio paragraphs (Markdown body) and the green pull quote (`quote:` in frontmatter). Shown on `/` and `/about`. |
| `src/content/site/books.md` | The three books: cover title lines, cover color (`green`/`ink`/`red`), description, buy link and button label. |
| `src/content/site/footer.md` | Newsletter heading, blurb, email placeholder, button label, thank-you message, social links, and the copyright line (year is added automatically). |
| `src/content/site/documents.md` | The documents list: title, page count, description, and the PDF path under `public/documents/`. |

## Where things live

- `src/styles/tokens.css` — **all** design tokens (colors, fonts, spacing). Change the palette here only.
- `src/content/blog/` — posts.
- `src/content/site/` — all fixed site copy (see "Editing site copy" above).
- `public/documents/` — the PDFs behind the Documents section. The current ones are placeholders.
- `src/components/BioSection.astro` — replace the portrait placeholder with a real `<img>` when ready.
- `public/og-default.png` — default social-share image.
- `astro.config.mjs` — set `site` to your production domain (used by canonical URLs, RSS and the sitemap).
- The footer subscribe form is not wired to a provider yet — set the form `action` in `src/components/Footer.astro` when you pick one (until then it shows a local thank-you). The social links in the footer point at bare domains; put your real profiles there.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In Cloudflare Pages: **Create project → connect the repo**.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Set `site` in `astro.config.mjs` to the final domain and redeploy.

Routes: `/`, `/about`, `/blog` (paginated, 10 per page), `/blog/<slug>`, `/documents`, `/rss.xml`, `/sitemap.xml`.
