<script lang="ts">
    import { queryJoinJours } from "@app/api.js";
    import { joinJours } from "@app/states/jours";
    import JoinJour from "./JoinJour.svelte";
    import Loading from "@app/components/Loading.svelte";

    if (joinJours.get() === null) {
        joinJours.set(queryJoinJours({}));
    }
</script>

<div
    class="collapse collapse-open border border-base-300 bg-base-200"
>
    <div class="collapse-title text-xl font-medium">
        <h2 class="text-xl">Join JOURs</h2>
    </div>
    <div class="collapse-content">
        {#if $joinJours?.isLoading}
            <Loading />
        {:else if $joinJours?.error}
            failed to load: {$joinJours?.error.toString()}
        {:else if $joinJours?.data}
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center"
            >
                {#each $joinJours?.data as jour_user}
                    <JoinJour data={jour_user} />
                {/each}
            </div>
        {/if}
    </div>
</div>
