<script lang="ts">
    import { Button, Card } from "flowbite-svelte";
    import { type JoinJour } from "@convex/types";
    import { redirect } from "@app/router";

    function redirect_to_jour() {
        redirect("jour", { id: data.jour._id });
    }

    const { data } : { data: JoinJour } = $props();
</script>

<Card>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.jour.title}
    </h5>
    <Button
        class="w-fit self-end"
        on:click={redirect_to_jour}
    >
        {data.role}
    </Button>
</Card>