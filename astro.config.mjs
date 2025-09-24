// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  // Enable Tailwind CSS integration
  integrations: [tailwind()],
  // Configure site metadata
  site: 'https://your-site-domain.com',
  // Configure build output
  build: {
    // You can customize the build output here
  },
  // Configure server options for development
  server: {
    port: 3000,
  },
  // Configure path aliases
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
        '@utils': path.resolve('./src/utils'),
        '@config': path.resolve('./src/config')
      }
    }
  }
});
