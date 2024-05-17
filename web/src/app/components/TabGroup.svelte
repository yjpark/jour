<script lang="ts">
    import { type Snippet } from "svelte";
    import { tabsZ } from "@app/states/page";

    const { children }: {
        children: Snippet
    } = $props();
</script>
<div style={"z-index:" + $tabsZ} class="sticky top-12 p-0 w-fit self-center bg-opacity-90 bg-bass-100 flex justify-center shadow-none">
    <div class="join border-2 border-primary">
        {@render children()}
    </div>
</div>

