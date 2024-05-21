<script lang="ts">
    import { setupConvex } from "@convex-svelte";

    import {
		Drawer,
		CloseButton,
	} from 'flowbite-svelte';
    import { sineIn } from "svelte/easing";

    import { authing, token } from "@app/states/auth";
    import { sidebarHidden } from "@app/states/page";
    import Loading from "@app/components/Loading.svelte";
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Page from "./Page.svelte";

    //const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;
    const convexUrl = "https://moonlit-caterpillar-817.convex.cloud";

    console.log("[Convex]", "URL:", convexUrl);
    setupConvex(convexUrl);

    const transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn,
    };
    const breakPoint = 1024;
    let width = $state(512);
    let activateClickOutside = $state(false);
    let backdrop = $state(false);

    $effect(() => {
        activateClickOutside = width < breakPoint;
        sidebarHidden.set(width < breakPoint);
    });
</script>

<svelte:window bind:innerWidth={width} />
<header class="flex-none w-full mx-auto bg-white dark:bg-slate-950">
    <Navbar />
</header>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={$sidebarHidden}
	bind:activateClickOutside
	width="w-64"
	class="overflow-scroll pb-32"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={() => ($sidebarHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
    <Sidebar />
</Drawer>

<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto justify-center">
        <div class="container mx-auto">
        {#if $authing || !$token}
            <Loading />
        {:else}
            <Page />
        {/if}
        </div>
	</main>
</div>

<!--
<div class="drawer lg:drawer-open max-h-screen">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col place-content-start w-[calc(100vw)] lg:w-[calc(100vw-320px)] lg:ml-80">
    </div>
    <div class="drawer-side z-50">
        <label
            for="sidebar-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        ></label>
        <ul class="fixed top-0 bottom-0 left-0 menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Sidebar />
        </ul>
    </div>
</div>
-->
