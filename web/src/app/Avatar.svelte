<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { atom } from "nanostores";
    import { useConvexClient } from "convex-svelte";

    import * as app_state from "@app/states/app";
    import { authing } from "@app/states/app";

    //https://github.com/withastro/astro/issues/8660
    import * as _Clerk from "@clerk/clerk-js";
    const { Clerk } = _Clerk;

    const clerkPubKey = import.meta.env.PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY;

    const convexClient = useConvexClient();

    onMount(async () => {
        console.log("[Clerk]", "PubKey:", clerkPubKey);

        if (!app_state.authing.get() && app_state.user.get() == null) {
            app_state.authing.set(true);
            const clerk = new Clerk(clerkPubKey);
            await clerk.load({
                // Set load options here
            });
            console.log("[Clerk]", "Loaded:", clerk.user);
            if (clerk.user != null) {
                app_state.user.set(clerk.user);
                const token = await clerk.session?.getToken({
                    template: "convex",
                    skipCache: false,
                });
                console.log("[Clerk]", "Token:", token);
                app_state.token.set(token);

                await convexClient.setAuth(async () => {
                    console.log(
                        "[Convex]",
                        "Fetch Token:",
                        token.substring(0, 32),
                        "..."
                    );
                    return token;
                });

                const button = document.getElementById("user-button");
                clerk.mountUserButton(button);
                app_state.authing.set(false);
            }
        }
    });
</script>

<div id="user-button" class="w-12">
    {#if $authing}
        <span class="loading loading-ring loading-md"></span>
    {/if}
</div>
