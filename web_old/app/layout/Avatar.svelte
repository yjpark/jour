<script lang="ts">
    import { Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";

    import * as surreal from "@surreal/index";
    import { connecting, connected, auth } from "@surreal/states";

    onMount(async () => {
        const options = surreal.helpers.createConnectionOptions({
            authMode: "scope",
            scope: "editor",
            scopeFields: [
                surreal.helpers.createScopeField("email", "yjpark@gmail.com"),
                surreal.helpers.createScopeField("password", "test"),
            ]
        });
        surreal.states.connectionOptions.set(options);
        await surreal.client.connect();
    });
</script>

<div id="user-button" class="w-12">
    {#if $connecting}
        <Spinner color="gray" />
    {:else if $auth}
        <img alt="avatar" src={$auth?.avatar} class="w-8 rounded-full border" />
    {:else}
        {$connected ? "C" : ""}
    {/if}
</div>
