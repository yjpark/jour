<script lang="ts">
    import { type Snippet, onMount } from "svelte";
    import { DatePicker } from "date-picker-svelte";
    import { pageSide } from "@app/states/page";

    const { data } : { data: Jour } = $props();

    onMount(() => {
        pageSide.set(side);

        return () => {
            pageSide.set(null);
        }
    });
</script>

{#snippet side()}
	<p>Calendar</p>
    <DatePicker range={false} />
{/snippet}


<div>
    TODO
</div>