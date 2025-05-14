// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

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
  }
});
