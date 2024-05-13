<script>
    import { atom } from "nanostores";
    import { router } from "@app/router";

    import { authing, token } from "@app/states/app";
    import Jours from "./Jours.svelte";
</script>

{#if !$authing && $token}
    {#if $router.route === "home"}
        Home
    {:else if $router.route === "jours"}
        <Jours />
    {/if}
{/if}