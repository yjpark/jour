<script lang="ts">
    import { Hr, Badge, Button } from "flowbite-svelte";
    import { tick } from "svelte";
    import type { UserJour } from "@convex/types";
    import SelfChat from "./SelfChat.svelte";
    import OtherChat from "./OtherChat.svelte";
    import { lastReadIds } from "@app/states/jours";
    import { isSelf } from "@app/states/auth";

    const {
        data,
    }: {
        data: UserJour;
    } = $props();

    let chats;

    let last = $derived.by(() => {
        return data.latest.find((v) => true);
    });
    let lastReadId = $state(lastReadIds[data.jour._id]);

    const scrollToBottom = async (node) => {
        console.log("Latest scrollToBottom", last, lastReadIds[data.jour._id]);
        window.scroll({
            top: node.scrollHeight,
            behavior: "auto",
        });
        /*
        node.parentNode.scroll({
            top: node.scrollHeight,
            behavior: "auto"
        });
     */
    };
    $effect(async () => {
        last;
        lastReadId; //watching

        await tick();
        scrollToBottom(chats);

        if (!lastReadId) {
            dismiss();
        }
    });

    function dismiss() {
        lastReadId = last?._id;
        lastReadIds[data.jour._id] = last?._id;
    }
</script>

<div class="flex flex-col-reverse p-2 bg-base-200 mb-8" bind:this={chats}>
    {#if lastReadId && lastReadId != last._id}
        <div class="self-center">
            <Button size="sm" onclick={dismiss}>Dismiss</Button>
        </div>
    {:else}
        <div>
            <Hr hrClass="w-full my-4">End</Hr>
        </div>
    {/if}
    {#each data.latest as entry, index}
        {#if index > 0 && entry._id == lastReadId}
            <div>
                <Hr hrClass="w-full my-4">
                    <Badge>New</Badge>
                </Hr>
            </div>
        {/if}

        {#if isSelf(entry.user)}
            <SelfChat data={entry} />
        {:else}
            <OtherChat data={entry} />
        {/if}
    {/each}
</div>
