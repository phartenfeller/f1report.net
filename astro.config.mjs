// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: "https://f1report.net",
  // Match prod's indexed URLs (no trailing slash, e.g. /races/2009-australian-grand-prix).
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react(), mdx(), pagefind(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
