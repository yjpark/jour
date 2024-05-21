<script lang="ts">
    /*
     * there is a bug, md:hidden been merged into class for some reason, until
     * it's fixed, use the forked version with lg:hidden
     * https://github.com/themesberg/flowbite-svelte/issues/1105
     * https://github.com/themesberg/flowbite-svelte/blob/70b65c343e2099e00b4338420af0abbe0ea4f9ba/src/lib/navbar/NavHamburger.svelte#L4
     */
    import { getContext } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { twMerge } from "tailwind-merge";
    import ToolbarButton from "flowbite-svelte/ToolbarButton.svelte";
    import Menu from "flowbite-svelte/Menu.svelte";

    export let menuClass: string = "h-6 w-6 shrink-0";
    export let onClick: (() => void) | undefined = undefined;

    let btnClass: string = "ms-3 lg:hidden";

    let hiddenStore =
        getContext<Writable<boolean>>("navHidden") ?? writable(true);
    const toggle = (ev: MouseEvent) => hiddenStore.update((h) => !h);
</script>

<ToolbarButton
    name="Open main menu"
    on:click={onClick || toggle}
    {...$$restProps}
    class={twMerge(btnClass, $$props.class)}
>
    <Menu class={twMerge(menuClass, $$props.classMenu)} />
</ToolbarButton>

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let menuClass: string = 'h-6 w-6 shrink-0';
@prop export let onClick: (() => void) | undefined = undefined;
-->
