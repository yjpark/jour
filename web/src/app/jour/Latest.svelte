<script lang="ts">
    import { tick } from "svelte";
    import type { UserJour } from "@convex/types";
    import Chat from "./Chat.svelte";
    import { lastReadIds } from "@app/states/jours";

    const { data } : {
        data: UserJour,
    } = $props();

    let chats;

    let last = $derived.by(() => {
        return data.latest.find(v => true);
    });
    let lastReadId = $state(lastReadIds[data.jour._id]);

    const scrollToBottom = async (node) => {
        console.log("Latest scrollToBottom", last, lastReadIds[data.jour._id]);
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
        last; lastReadId; //watching

        await tick();
        scrollToBottom(chats);

        console.log("AAAAAA", lastReadIds[data.jour._id], data.jour._id, last);
        if (!lastReadId) {
            dismiss();
        }
    });

    function dismiss() {
        lastReadId = last?._id;
        lastReadIds[data.jour._id] = last?._id
    }
</script>

<div class="flex flex-col-reverse p-2" bind:this={chats}>
    <div class="divider">
        End
    </div>
    {#if lastReadId && lastReadId != last._id}
        <div class="divider">
            <div class="btn btn-secondary btn-sm" onclick={dismiss}>
                Dismiss
            </div>
        </div>
    {/if}
    {#each data.latest as entry, index}
        {#if index > 0 && entry._id == lastReadId}
            <div class="divider">
                <div class="badge badge-primary">New</div>
            </div>
        {/if}

        <Chat data={entry} />
    {/each}
</div>
