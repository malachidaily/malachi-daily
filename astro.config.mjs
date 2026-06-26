import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://app.malachidaily.com",
  env: {
    schema: {
      BASEROW_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
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
    "/admin": "https://baserow.io/database/81919/table/222976/365623",
    "/example": "/old?book=John&chapter=1&start-verse=1",
  },
  output: "server",
  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
    },
  }),
});
