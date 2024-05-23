<script lang="ts">
    import { client, types } from "@surreal/index";
    import { onMount } from "svelte";
    import JoinJour from "./JoinJour.svelte";
    import Loading from "@app/components/Loading.svelte";

    let response = $state<null | types.QueryResponse>(null);

    onMount(async () => {
        response = await client.executeQuery("select * from jour");
    });
</script>

<div class="border border-base-300 bg-base-200 place-content-begin">
    {#if response == null}
        <Loading />
    {:else if !response?.success}
        failed to load: {response?.result.toString()}
    {:else if response?.result}
        <div class="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
            {#each response?.result as jour_user}
                <JoinJour data={jour_user} />
            {/each}
        </div>
    {/if}
</div>
