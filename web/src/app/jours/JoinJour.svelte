<script lang="ts">
    import { type JoinJour } from "@convex/types";
    import { redirect } from "@app/router";

    function redirect_to_jour() {
        redirect("jour", { id: data.jour._id });
    }

    export let data: JoinJour;
</script>

<div class="card grow w-full min-w-64 max-w-xl bg-base-100 shadow-xl">
    <div class="card-body justify-between">
        <div class="card-title flow justify-center">
            <div class="tooltip w-full" data-tip={data.jour._id}>
                <div
                    class="btn btn-ghost btn-block border border-primary"
                    onclick={redirect_to_jour}
                >
                    {data.jour.title}
                </div>
            </div>
        </div>
        <div class="mt-4 card-actions justify-end">
            <button class="btn btn-secondary btn-sm">
                {data.role}
            </button>
        </div>
    </div>
</div>
