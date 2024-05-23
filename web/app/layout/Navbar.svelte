<script lang="ts">
    import {
        DarkMode,
        NavBrand,
        Navbar,
        NavLi,
        NavUl,
        //NavHamburger,
    } from "flowbite-svelte";
    import NavHamburger from "@app/forks/NavHamburger.svelte";

    import { getPagePath, redirectPage } from "@nanostores/router";

    import Avatar from "./Avatar.svelte";
    import { title } from "@app/states/page";
    import { router, ROUTES } from "@app/router";
    import { sidebarHidden } from "@app/states/page";

    const spanClass =
        "pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white";
    const divClass = "w-full ml-auto lg:block lg:w-auto order-1 lg:order-none";
    const ulClass =
        "flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0";
    const navDivClass =
        "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 flex items-center justify-between w-full mx-auto py-1.5 px-4";

    const showSidebar = () => {
        sidebarHidden.set(false);
    };
</script>

<Navbar>
    <NavHamburger
        onclick={showSidebar}
        btnClass="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 m-0 mr-3 lg:hidden"
    />
    <NavBrand href="/app" class="lg:ml-64">
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4"
        >
            {$title}
        </span>
    </NavBrand>
    <div class="flex items-center ml-auto gap-1">
        <DarkMode
            class="mx-2 inline-block dark:hover:text-white hover:text-gray-900"
        />
        <Avatar />
    </div>
</Navbar>

<!--
<nav class="navbar sticky top-0 z-10 glass bg-opacity-90 bg-base-100 max-w-full"
    style={"z-index:" + z}
>
    <div class="navbar-start">
        <label for="sidebar-drawer" aria-label="close sidebar">
            <div id="toggle_sidebar" class="btn btn-ghost lg:hidden">
                <Icon class="w-8 h-8" icon="mdi:hamburger-menu" />
            </div>
        </label>
        {#if $router?.route != ROUTES.HOME}
            <a href={getPagePath(router, ROUTES.HOME)}>
                <Icon class="w-8 h-8" icon="mdi:home" />
            </a>
        {/if}
    </div>
    <div class="navbar-center">
        <div class="btn btn-ghost text-xl truncate">
            {$title}
        </div>
    </div>
    <div class="navbar-end">
    <SignedIn>
        <div class="btn btn-ghost w-12">
            <Avatar />
        </div>
    </SignedIn>
    </div>
</nav>
-->
