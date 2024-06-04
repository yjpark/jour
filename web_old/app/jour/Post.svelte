<script lang="ts">
    import { Hr, Textarea, Button, Toolbar, ToolbarButton } from "flowbite-svelte";
    import { useConvexClient } from "@convex-svelte";
    import Icon from "@iconify/svelte";
    import { type Jour } from "@convex/types";
    import { createTextEntry } from "@app/api";
    import { fixedHeadings } from "@md/render";

    const client = useConvexClient();
    async function onSubmit(e: SubmitEvent) {
        e.preventDefault();
        const result = await createTextEntry(client, {
            jour: data._id,
            text: text.trim(),
        });
        console.log("Post.onSubmit", result);
        submitResult = result;
        showSubmitLeftMs = 3000;
        text = "";
    };

    $effect(() => {
        showSubmitLeftMs;
        if (showSubmitLeftMs > 0) {
            setTimeout(() => {
                showSubmitLeftMs -= 100;
            }, 100);
        }
    });

    let text = $state("");
    let submitResult = $state(null);
    let showSubmitLeftMs = $state(0);

    const { data } : { data: Jour } = $props();
</script>

<div class="h-2 bg-base-100" />
<div class="sticky z-30 top-9 bg-base-100">
    <form onsubmit={onSubmit}>
    <Textarea
        class="textarea textarea-bordered bg-base-300 w-full min-h-24"
        bind:value={text}
        placeholder= "in MarkDown"
    >
    <div slot="footer" class="flex items-center justify-between">
      <Toolbar embedded>
        <ToolbarButton name="Save"><Icon class="w-6 h-6" icon="mdi:content-save" /></ToolbarButton>
      </Toolbar>
        <Button class="self-end" type="submit" disabled={!text}><Icon class="w-6 h-6" icon="mdi:send" />Send</Button>
    </div>
    </Textarea>
    </form>

    <Hr hrClass="w-full my-4">Preview</Hr>
</div>

{#if submitResult && showSubmitLeftMs > 0}
<div class="toast toast-center">
    <div class="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
</div>
{/if}

<article class="prose p-2">
    {@html fixedHeadings(3, text.trim())}
</article>
