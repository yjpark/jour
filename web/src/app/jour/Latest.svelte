<script lang="ts">
    import type { Entry } from "@convex/types";
    import Chat from "./Chat.svelte";

    export let data: Entry[];
</script>

<div class="flex flex-col-reverse">
    {#each data as entry}
        <Chat data={entry} />
    {/each}
</div>
