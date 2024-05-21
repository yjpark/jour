<script lang="ts">
    import {
        fetchUserJour,
        canEditJour,
        canAdminJour,
    } from "@app/states/jours";
    import type { JourId } from "@convex/types";
    import { title, ensureActiveTab, activeTab, allTabs, pageSide } from "@app/states/page";
    import Latest from "./Latest.svelte";
    import Post from "./Post.svelte";
    import Calendar from "./Calendar.svelte";
    import TabGroup from "@app/components/TabGroup.svelte";
    import TabButton from "@app/components/TabButton.svelte";
    import Loading from "@app/components/Loading.svelte";

    const { data } : { data: JourId } = $props();
    const jour = fetchUserJour(data);

    let jourData = $derived(jour.data);

    $effect(() => {
        if (jourData) {
            let tabs = [];
            if (canEditJour(jourData.role)) {
                tabs.push("Post");
            }
            tabs.push("Latest");
            tabs.push("Calendar");
            tabs.push("Profile");
            if (canAdminJour(jourData.role)) {
                tabs.push("Admin");
            }
            allTabs.set(tabs);
        }
    });

    ensureActiveTab("Latest");
    pageSide.set(null);
    $inspect($activeTab);
</script>

{#if jour?.data}
    {title.set(jour?.data?.jour.title)}
{/if}

{#if jour?.isLoading}
    <Loading />
{:else if jour?.error}
    failed to load: {jour?.error.toString()}
{:else if jour?.data}
    <TabGroup />

    {#if $activeTab == "Post"}
        {#if canEditJour(jour?.data.role)}
            <Post data={jour?.data.jour} />
        {/if}
    {:else if $activeTab == "Latest"}
        <Latest data={jour?.data} />
    {:else if $activeTab == "Calendar"}
        <Calendar data={jour?.data} />
    {:else if $activeTab == "Profile"}
        Profile: TODO
    {:else if $activeTab == "Admin"}
        {#if canAdminJour(jour?.data.role)}
            Admin: TODO
        {/if}
    {/if}
{/if}
