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
        build: {
            target: "esnext",
        },
        esbuild: {
		    supported: {
			    'top-level-await': true //browsers can handle top-level-await features
		    },
        },
        optimizeDeps: {
		    exclude: ['surrealdb.wasm', 'surrealql.wasm'],
		    esbuildOptions: {
			    target: 'esnext',
		    },
	    },
    }
});
