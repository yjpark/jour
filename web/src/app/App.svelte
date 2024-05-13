<script>
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Home from "./Home.svelte";

    import { onMount } from "svelte";
    import { themeChange } from "theme-change";

    import { setupConvex } from "convex-svelte";
    import * as app_state from "@app/states/app";

    const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

    console.log("[Convex]", "URL:", convexUrl);
    setupConvex(convexUrl);

    // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
    onMount(() => {
        themeChange(false);
        // 👆 false parameter is required for svelte
    });
</script>

<div class="drawer lg:drawer-open">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <Navbar />
        <Home />
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
