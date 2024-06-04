import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        icon(),
        svelte(),
    ],
    output: "hybrid",
    adapter: cloudflare({
        platformProxy: true,
    }),
    vite: {
        optimizeDeps: {
		    exclude: ['surrealdb.wasm', 'surrealql.wasm'],
	    },
        resolve: {
          preserveSymlinks: true
        }
    },
    experimental: {
        contentCollectionCache: true,
    }
});
