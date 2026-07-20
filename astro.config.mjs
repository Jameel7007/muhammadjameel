// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Set this to your production domain before deploying.
// It is used for canonical URLs, OpenGraph tags, RSS and the sitemap.
export default defineConfig({
  site: 'https://muhammadjameel.com',
  output: 'static',
  integrations: [mdx()],
});
