import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
import auth_astro from "auth-astro";

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        icon(),
        svelte(),
        auth_astro(),
    ],
    output: "server",
    adapter: cloudflare({
        platformProxy: true,
    }),
});
