<script lang="ts">
    import {
        fetchUserJour,
        canEditJour,
        canAdminJour,
    } from "@app/states/jours";
    import { client, types } from "@surreal/index";
    import { role } from "@surreal/states";
    import type { JourId } from "@convex/types";
    import { title, ensureActiveTab, activeTab, allTabs, pageSide } from "@app/states/page";
    import Latest from "./Latest.svelte";
    import Post from "./Post.svelte";
    import Calendar from "./Calendar.svelte";
    import TabGroup from "@app/components/TabGroup.svelte";
    import TabButton from "@app/components/TabButton.svelte";
    import Loading from "@app/components/Loading.svelte";
    import { onMount } from "svelte";

    const { data } : { data: string } = $props();

    let response = $state<null | types.QueryResponse>(null);

    onMount(async () => {
        response = await client.executeQuery("select * from ONLY jour:" + data + " limit 1");
    });

    $effect(() => {
        if (response && response.success) {
            let tabs = [];
            if (role.get() == "editor") {
                tabs.push("Post");
            }
            tabs.push("Latest");
            tabs.push("Calendar");
            tabs.push("Profile");
            if (role.get() == "admin") {
                tabs.push("Admin");
            }
            allTabs.set(tabs);
        }
    });

    ensureActiveTab("Latest");
    pageSide.set(null);
    $inspect($activeTab);
</script>

{#if response == null}
    <Loading />
{:else if !response?.success}
    failed to load: {response?.result.toString()}
{:else if response?.result}
    {title.set(response?.result?.name)}

    <TabGroup />

    {#if $activeTab == "Post"}
        {#if ($role == "editor") }
            <Post data={response?.result} />
        {/if}
    {:else if $activeTab == "Latest"}
        <Latest data={response?.result} />
    {:else if $activeTab == "Calendar"}
        <Calendar data={response?.result} />
    {:else if $activeTab == "Profile"}
        Profile: TODO
    {:else if $activeTab == "Admin"}
        {#if ($role == "admin") }
            Admin: TODO
        {/if}
    {/if}
{/if}
