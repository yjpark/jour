<script lang="ts">
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        SidebarDropdownWrapper,
    } from "flowbite-svelte";

    import { redirect, ROUTES } from "@app/router";
    import PageSide from "@app/components/PageSide.svelte";
</script>

<Sidebar asideClass="w-54">
    <SidebarWrapper
        divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800"
    >
        <SidebarGroup>
            <SidebarItem
                label="Home"
                href="/"
            />
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>

<!-- Body
<div class="flex flex-col border-y border-base-300 px-6 pt-4 grow">
    <input class="input input-bordered" placeholder="Search..." />
    <div class="flex flex-col divide-y divide-base-300">
        <ul class="menu px-0 py-4">
            <li>
                <div onclick={() => redirect(ROUTES.HOME)}>
                    <i class="fa-solid fa-house fa-fw"></i>
                    Home
                </div>
            </li>
            <li>
                <div onclick={() => redirect(ROUTES.JOURS)}>
                    <i class="fa-solid fa-users fa-fw"></i>
                    JOURs
                </div>
            </li>
            <li>
                <a href="/sign-in">
                    <i class="fa-solid fa-fire fa-fw"></i>
                    Sign In
                </a>
            </li>
            <li>
                <a href="/sign-up">
                    <i class="fa-solid fa-podcast fa-fw"></i>
                    Sign Up
                </a>
            </li>
        </ul>
        <PageSide />
    </div>
</div>
<div class="flex justify-between items-center p-2">
    <a class="btn">
        <img alt="Profile" src="/avatar.png" class="w-8 rounded-full" />

        <div class="flex flex-col text-start">
            <span class="font-bold">User name</span>
            <span class="text-sm text-accent">user@email.com</span>
        </div>
    </a>

    <a class="btn btn-error btn-sm mr-3" title="Logout">
        <i class="fa-solid fa-door-open"></i>
    </a>
</div>
-->