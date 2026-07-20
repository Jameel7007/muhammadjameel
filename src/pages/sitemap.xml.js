import { getPublishedPosts } from '../lib/posts';

const PAGE_SIZE = 10;

export async function GET(context) {
  const site = context.site;
  const posts = await getPublishedPosts();

  const urls = ['/', '/about/', '/blog/', '/documents/'];
  const blogPages = Math.ceil(posts.length / PAGE_SIZE);
  for (let p = 2; p <= blogPages; p++) urls.push(`/blog/${p}/`);
  for (const post of posts) urls.push(`/blog/${post.id}/`);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
