<script lang="ts">
    import {
        fetchUserJour,
        canEditJour,
        canAdminJour,
    } from "@app/states/jours";
    import type { JourId } from "@convex/types";
    import { title, ensureActiveTab, activeTab } from "@app/states/page";
    import Latest from "./Latest.svelte";
    import Post from "./Post.svelte";
    import TabGroup from "@app/components/TabGroup.svelte";
    import TabButton from "@app/components/TabButton.svelte";
    import Loading from "@app/components/Loading.svelte";

    const { data } : { data: JourId } = $props();
    const jour = fetchUserJour(data);

    ensureActiveTab("Latest");
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
    <TabGroup>
        {#if canEditJour(jour?.data.role)}
            <TabButton data="Post" />
        {/if}
        <TabButton data="Latest" />
        <TabButton data="Calendar" />
        <TabButton data="Profile" />
        {#if canAdminJour(jour?.data.role)}
            <TabButton data="Admin" />
        {/if}
    </TabGroup>

    {#if $activeTab == "Post"}
        {#if canEditJour(jour?.data.role)}
            <Post data={jour?.data.jour} />
        {/if}
    {:else if $activeTab == "Latest"}
        <Latest data={jour?.data.latest} />
    {:else if $activeTab == "Calendar"}
        Calender: TODO
    {:else if $activeTab == "Profile"}
        Profile: TODO
    {:else if $activeTab == "Admin"}
        {#if canAdminJour(jour?.data.role)}
            Admin: TODO
        {/if}
    {/if}
{/if}
