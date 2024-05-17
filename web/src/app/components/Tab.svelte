<script lang="ts">
    import { getActiveTab, saveActiveTab } from "@app/states/page";

    export let data: string;

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
    <slot />
</div>
