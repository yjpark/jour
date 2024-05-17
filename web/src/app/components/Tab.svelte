<script lang="ts">
    import { type Snippet } from "svelte";
    import { getActiveTab, saveActiveTab } from "@app/states/page";

    const { data, children }: {
        data: string,
        children: Snippet
    } = $props();

    function onclick(evt) {
        saveActiveTab(data);
    }
</script>
<input
    type="radio"
    name="jour_tabs"
    role="tab"
    class="tab whitespace-nowrap"
    aria-label={data}
    checked={data == getActiveTab()}
    onclick={onclick}
/>
<div
    role="tabpanel"
    class="tab-content w-[calc(100vw-16px)] lg:w-[calc(100vw-336px)] max-h-full bg-base-200 border-base-300 rounded-box p-6 overflow-auto"
>
    {@render children()}
</div>
