<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { activeTab, saveActiveTab } from "@app/states/page";

    const { data }: {
        data: string,
    } = $props();

    function onclick() {
        saveActiveTab(data);
    }
</script>
<Button
    color="purple"
    outline
    checked={data == $activeTab}
    onclick={onclick}
>
{data}
</Button>