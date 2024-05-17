<script lang="ts">
    import { activeTab, saveActiveTab } from "@app/states/page";

    const { data }: {
        data: string,
    } = $props();

    function onclick(evt) {
        saveActiveTab(data);
    }
</script>
<input class="join-item btn btn-sm whitespace-nowrap"
    type="radio"
    name="jour_tabs"
    aria-label={data}
    checked={data == activeTab}
    onclick={onclick}
/>