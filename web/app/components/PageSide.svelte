<script lang="ts">
    import { pageSide } from "@app/states/page";
</script>
<ul class="menu px-0 py-4">
    {@render $pageSide()}
</ul>