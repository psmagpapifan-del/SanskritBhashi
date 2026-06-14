import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mcp from 'astro-mcp';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://sanskritbhashi.com',
  output: 'static',
  adapter: isDev ? undefined : cloudflare({ platformProxy: { enabled: true } }),
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap(),
    mcp(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
