<script lang="ts">
    export let data: string;
    export let checked: boolean;
</script>
<input
    type="radio"
    name="jour_tabs"
    role="tab"
    class="tab whitespace-nowrap"
    aria-label={data}
    checked={checked}
/>
<div
    role="tabpanel"
    class="tab-content w-[calc(100vw-16px)] md:w-[calc(100vw-336px)] max-h-full bg-base-200 border-base-300 rounded-box p-6 overflow-auto"
>
    <slot />
</div>
