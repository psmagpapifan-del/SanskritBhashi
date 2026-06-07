import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.argv.includes('dev');

export default defineConfig({
  output: 'static',
  adapter: isDev ? undefined : cloudflare({ platformProxy: { enabled: true } }),
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
