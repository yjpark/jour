<script lang="ts">
    import { type Snippet } from "svelte";
    import { ButtonGroup } from "flowbite-svelte";
    import { allTabs } from "@app/states/page";
    import TabButton from "./TabButton.svelte";
</script>

{#if $allTabs && $allTabs.length > 0}
<div class="sticky top-1 mt-2 w-full flex place-content-center">
    <ButtonGroup>
        {#each $allTabs as tab}
            <TabButton data={tab} />
        {/each}
    </ButtonGroup>
</div>
{/if}
