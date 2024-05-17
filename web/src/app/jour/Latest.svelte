<script lang="ts">
    import { tick } from "svelte";
    import type { Entry } from "@convex/types";
    import Chat from "./Chat.svelte";

    const { data } : { data: Entry[] } = $props();

    let chats;

    let latest = $derived.by(() => {
        return data.find(v => true);
    });
    let lastRead = $state(null);

    const scrollToBottom = async (node) => {
        console.log("Latest scrollToBottom", latest, lastRead);
        window.scroll({
            top: node.scrollHeight,
            behavior: "auto"
        });
    /*
        node.parentNode.scroll({
            top: node.scrollHeight,
            behavior: "auto"
        });
     */
    };
    $effect(async () => {
        latest; //watching

        await tick();
        scrollToBottom(chats);

        if (lastRead == null) {
            lastRead = latest;
        }
    });

    function dismiss() {
        lastRead = latest;
    }
</script>

<div class="flex flex-col-reverse" bind:this={chats}>
    {#if lastRead && lastRead._id != latest._id}
        <div class="divider">
            <div class="btn btn-secondary btn-sm" onclick={dismiss}>
                Dismiss
            </div>
        </div>
    {/if}
    {#each data as entry, index}
        {#if index > 0 && entry._id == lastRead?._id}
            <div class="divider">
                <div class="badge badge-primary">New</div>
            </div>
        {/if}

        <Chat data={entry} />
    {/each}
</div>
