<script lang="ts">
    import { type Snippet } from "svelte";

    const { children }: {
        children: Snippet
    } = $props();
</script>
<div class="z-20 sticky top-12 w-full glass bg-opacity-90 bg-bass-100 flex justify-center shadow-none pb-2">
    <div class="join">
        {@render children()}
    </div>
</div>

