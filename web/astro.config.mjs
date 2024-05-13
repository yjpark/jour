import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import clerk from "astro-clerk-auth";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), svelte(),
    clerk({
      signInUrl: "/sign-in",
      signUpUrl: "/sign-up"
    }),
  ],
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: true
  })
});