<script lang="ts">
    import { router, ROUTES } from "@app/router";
    import { connected } from "@surreal/states";
    import Home from "@app/home/Home.svelte";
    import Jours from "@app/jours/Jours.svelte";
    import Jour from "@app/jour/Jour.svelte";
    import Loading from "@app/components/Loading.svelte";

    $inspect(connected);
</script>

{#if $connected}
    {#if $router?.route === ROUTES.HOME}
        <Home />
    {:else if $router?.route === ROUTES.JOURS}
        <Jours />
    {:else if $router?.route === ROUTES.JOUR}
        <Jour data={$router?.params.id} />
    {:else}
        NOT IMPLEMENTED: {$router?.route}
    {/if}
{:else}
    <Loading />
{/if}