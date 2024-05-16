<script lang="ts">
    import {
        fetchUserJour,
        canEditJour,
        canAdminJour,
    } from "@app/states/jours";
    import type { JourId } from "@convex/types";
    import { title } from "@app/states/page";
    import Latest from "./Latest.svelte";
    import Post from "./Post.svelte";
    import Tab from "@app/components/Tab.svelte";
    import Loading from "@app/components/Loading.svelte";

    export let data;
    const jour = fetchUserJour(data);
</script>

{#if jour?.data}
    {title.set(jour?.data?.jour.title)}
{/if}

{#if jour?.isLoading}
    <Loading />
{:else if jour?.error}
    failed to load: {jour?.error.toString()}
{:else if jour?.data}
    <div role="tablist" class="tabs tabs-boxed bg-base-300 w-full max-h-[calc(100vh-64px)] p-2 items-start place-content-start">
        {#if canEditJour(jour?.data.role)}
            <Tab data="Post">
                <Post data={jour?.data.jour} />
            </Tab>
        {/if}

        <Tab data="Latest" checked=true>
            <Latest data={jour?.data.latest} />
        </Tab>

        <Tab data="Calendar">
            Calender: TODO
        </Tab>

        <Tab data="Profile">
            Profile: TODO
        </Tab>

        {#if canAdminJour(jour?.data.role)}
            <Tab data="Admin">
                Admin: TODO
            </Tab>
        {/if}
    </div>
{/if}
