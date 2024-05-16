<script lang="ts">
    import { getPagePath, redirectPage } from '@nanostores/router'

    import Icon from "@iconify/svelte";
    import Avatar from "./Avatar.svelte";
    import { title } from "@app/states/page";
    import { router, ROUTES } from "@app/router"
    import * as themes from "daisyui/src/theming/themes";
    import themeDefaults from "daisyui/src/theming/themeDefaults";
    const { themeOrder } = themeDefaults;
</script>

<nav class="navbar sticky top-0 z-30 glass bg-opacity-90 bg-base-100 max-w-full">
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
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
                Theme
            </div>
            <div
                class="dropdown-content z-[1] flex flex-wrap gap-2 sticky w-96 bg-base-300 place-content-center shadow p-4"
            >
                {#each themeOrder as theme}
                    <div data-theme={theme} class="bg-base-100 m-0 p-3">
                        <div class="btn btn-sm btn-primary w-20">
                            <button
                                data-toggle-theme={theme}
                                data-act-class="ACTIVECLASS"
                            >
                                {theme}
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <!--
    <SignedIn>
    -->
        <div class="btn btn-ghost w-12">
            <Avatar />
        </div>
        <!--
    </SignedIn>
    -->
    </div>
</nav>
