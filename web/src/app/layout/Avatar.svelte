<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { atom } from "nanostores";
    import { useConvexClient } from "convex-svelte";

    import * as auth_state from "@app/states/auth";
    import { authing } from "@app/states/auth";

    //https://github.com/withastro/astro/issues/8660
    import * as _Clerk from "@clerk/clerk-js";
    import { syncUser } from "@app/api";
    const { Clerk } = _Clerk;

    const clerkPubKey = import.meta.env.PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY;

    const convexClient = useConvexClient();

    onMount(async () => {
        console.log("[Clerk]", "PubKey:", clerkPubKey);

        if (!auth_state.authing.get() && auth_state.clerkUser.get() == null) {
            auth_state.authing.set(true);
            const clerk = new Clerk(clerkPubKey);
            await clerk.load({
                // Set load options here
            });
            console.log("[Clerk]", "Loaded:", clerk.user);
            if (clerk.user != null) {
                auth_state.clerkUser.set(clerk.user);
                const token = await clerk.session?.getToken({
                    template: "convex",
                    skipCache: false,
                });
                console.log("[Clerk]", "Token:", token);
                if (token) {
                    await convexClient.setAuth(async () => {
                        console.log(
                            "[Convex]",
                            "Fetch Token:",
                            token.substring(0, 32),
                            "..."
                        );
                        return token;
                    });
                    auth_state.token.set(token);
                    await syncUser(convexClient, {});
                }

                const button = <HTMLDivElement> document.getElementById("user-button");
                if (button) {
                    clerk.mountUserButton(button);
                }
                auth_state.authing.set(false);
            }
        }
    });
</script>

<div id="user-button" class="w-12">
    {#if $authing}
        <span class="loading loading-ring loading-md"></span>
    {/if}
</div>
