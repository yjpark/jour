<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";
    import { setupConvex } from "convex-svelte";

    import { authing, token } from "@app/states/auth";
    import Loading from "@app/components/Loading.svelte";
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Page from "./Page.svelte";

    const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

    console.log("[Convex]", "URL:", convexUrl);
    setupConvex(convexUrl);

    // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
    onMount(() => {
        themeChange(false);
        // 👆 false parameter is required for svelte
    });
</script>

<div class="fixed drawer lg:drawer-open max-h-screen">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="h-full drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <Navbar />
        {#if $authing || !$token}
            <Loading />
        {:else}
            <Page />
        {/if}
    </div>
    <div class="drawer-side z-50">
        <label
            for="sidebar-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Sidebar />
        </ul>
    </div>
</div>
