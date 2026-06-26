import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://app.malachidaily.com",
  integrations: [
    tailwind(),
    alpinejs(),
    sitemap(),
    react(),
    partytown({
      // https://docs.astro.build/en/guides/integrations-guide/partytown/#configforward
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  redirects: {
    "/example": "/?book=John&chapter=1&start-verse=1",
  },
  output: "server",
  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
    },
  }),
});
