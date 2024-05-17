<script lang="ts">
    import { tick } from "svelte";
    import type { Entry } from "@convex/types";
    import Chat from "./Chat.svelte";

    const { data } : { data: Entry[] } = $props();

    let count = $derived.by(() => {
        return data.length;
    });

    let lastCount = $state(-1);

    const scrollToBottom = async (node) => {
        node.parentNode.scroll({
            top: node.scrollHeight,
            behavior: "auto"
        });
    };
    let chats;
    $effect(async () => {
        count; lastCount; chats; //watching
        await tick();
        scrollToBottom(chats);
        if (lastCount <= 0) {
            lastCount = count;
        }
    });

    function dismiss() {
        lastCount = count;
    }
</script>

<div class="flex flex-col-reverse" bind:this={chats}>
    {#if count >= lastCount}
        <div class="divider">
            <div class="btn btn-secondary btn-sm" onclick={dismiss}>
                Dismiss
            </div>
        </div>
    {/if}
    {#each data as entry, index}
        {#if index >= 0 && count - lastCount == index}
            <div class="divider">
                <div class="badge badge-primary">New</div>
            </div>
        {/if}

        <Chat data={entry} />
    {/each}
</div>
