<script lang="ts">
    import { useConvexClient } from "convex-svelte";
    import Icon from "@iconify/svelte";
    import { type Jour } from "@convex/types";
    import { createTextEntry } from "@app/api";
    import { fixedHeadings } from "@md/render";

    const client = useConvexClient();
    async function onSubmit(e: SubmitEvent) {
        await createTextEntry(client, {
            jour: data._id,
            text: text.trim(),
        });
        text = "";
    };
    let text = "";

    export let data: Jour;
</script>

<textarea
    class="textarea textarea-secondary bg-base-300 w-full min-h-24"
    bind:value={text}
></textarea>

<div class="flex justify-between">
    <button class="btn btn-sm btn-outline btn-disabled">
        <Icon class="w-4 h-4" icon="mdi:content-save" />
        Save
    </button>
    <div>
        <button class="btn btn-sm btn-square btn-outline btn-disabled">
            <Icon class="w-4 h-4" icon="mdi:content-paste" />
        </button>
    </div>
    <form on:submit|preventDefault={onSubmit}>
    <button type="submit" disabled={!text} class="btn btn-sm btn-primary">
        Send
        <Icon class="w-4 h-4" icon="mdi:send" />
    </button>
    </form>
</div>

<div class="divider">Preview</div>
<article class="prose">
    {@html fixedHeadings(3, text.trim())}
</article>
