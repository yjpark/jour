<script lang="ts">
    import { Button, Card } from "flowbite-svelte";
    import { type JoinJour } from "@convex/types";
    import { redirect } from "@app/router";

    import { auth, connectionOptions } from "@surreal/states";

    function redirect_to_jour() {
        redirect("jour", { id: data.id.id });
    }

    const { data } : { data: any } = $props();

    let role = $derived.by(() => {
        const scope = connectionOptions.get()?.scope;
        if (scope) {
            return scope; 
        }
        return auth.get()?.role;
    });

</script>

<Card>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.name}
    </h5>
    <Button
        class="w-fit self-end"
        on:click={redirect_to_jour}
    >
        {role}
    </Button>
</Card>