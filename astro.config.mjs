import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify/functions";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    alpinejs(), 
    sitemap(), 
    react(), 
    partytown({
      // https://docs.astro.build/en/guides/integrations-guide/partytown/#configforward
      config: {
        forward: ['dataLayer.push'],
      },
    })
  ],
  redirects: {
    '/admin': 'https://baserow.io/database/81919/table/222976/365623',
    '/example': '/?book=John&chapter=1&start-verse=1'
  },
  output: 'server',
  adapter: netlify()
});