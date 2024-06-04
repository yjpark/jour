<script lang="ts">
    import {
        DarkMode,
        NavBrand,
        Navbar,
        NavLi,
        NavUl,
        Button,
        NavHamburger,
    } from "flowbite-svelte";
    import { onMount, type Snippet } from "svelte";

    import { title, sidebarHidden } from "../states/page";

    const spanClass =
        "pl-2 self-ce./views/pageext-md text-gray-900 whitespace-nowrap dark:text-white";
    const divClass = "w-full ml-auto lg:block lg:w-auto order-1 lg:order-none";
    const ulClass =
        "flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0";
    const navDivClass =
        "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 flex items-center justify-between w-full mx-auto py-1.5 px-4";

    const showSidebar = () => {
        sidebarHidden.set(false);
    };

    let { userId, user, children }: {
        userId: string | null,
        user: JSON,
        children: Snippet,
    } = $props();

    let count = $state(0);
    function onclick(evt: MouseEvent) {
        evt.preventDefault();
        count = count + 1;
        title.set("Updated " + count);
    }
    let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });
</script>

<Navbar class="sticky top-0">
    <NavBrand href="/" class="lg:ml-64">
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4"
        >
            {$title}
        </span>
    </NavBrand>
  <div class="flex md:order-2">
        {#if mounted}
        <DarkMode
            class="mx-2 inline-block dark:hover:text-white hover:text-gray-900"
        />
        {/if}

    <Button href="/app" size="sm">App</Button>
    <NavHamburger />
  </div>
  <NavUl class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
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
