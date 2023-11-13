import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs(), sitemap()],
  output: 'server',
  adapter: netlify()
});