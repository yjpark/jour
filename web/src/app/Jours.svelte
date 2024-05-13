<script>
    import { useQuery } from "convex-svelte";
    import { api } from "../../convex/_generated/api.js";
    import { ownJours, joinJours } from "@app/states/jours";
    if (ownJours.get() === null) {
        ownJours.set(useQuery(api.jours.getOwnJours, {}));
    }
    if (joinJours.get() === null) {
        joinJours.set(useQuery(api.jours.getJoinJours, {}));
    }
</script>

<div
    tabindex="0"
    class="collapse collapse-open border border-base-200 bg-base-100"
>
    <div class="collapse-title text-xl font-medium">
        <h2 class="text-xl">Own JOURs</h2>
    </div>
    <div class="collapse-content">
        {#if $ownJours.isLoading}
            Loading...
        {:else if $ownJours.error}
            failed to load: {$ownJours.error.toString()}
        {:else}
            {#each $ownJours.data as jour}
                <div>
                    {jour.title}
                </div>
            {/each}
        {/if}
    </div>
</div>
<div
    tabindex="0"
    class="collapse collapse-open border border-base-200 bg-base-100"
>
    <div class="collapse-title text-xl font-medium">
        <h2 class="text-xl">Join JOURs</h2>
    </div>
    <div class="collapse-content">
        {#if $joinJours.isLoading}
            Loading...
        {:else if $joinJours.error}
            failed to load: {$joinJours.error.toString()}
        {:else}
            {#each $joinJours.data as jour_user}
                <div>
                    {jour_user.jour.title}
                </div>
            {/each}
        {/if}
    </div>
</div>
