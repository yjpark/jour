<script lang="ts">
    import { type Entry } from "@convex/types";
    import { isSelf } from "@app/states/auth";
    import { fetchUser } from "@app/states/users";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    dayjs.extend(relativeTime);
    import { fixedHeadings } from "@md/render";

    const { data }: { data: Entry } = $props();
    const user = fetchUser(data.user);
    const tooltipClass = isSelf(data.user)
        ? "tooltip tooltip-info tooltip-right"
        : "tooltip tooltip-info tooltip-left";
    //Need enclosing div to make the layout working on safari
</script>

<div class="flex flex-row-reverse items-start gap-2.5 mt-3">
    <img
        class="w-8 h-8 rounded-full"
        src={user?.data?.avatar}
        alt={user?.data?.email}
    />
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
        <div class="flex place-content-end items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.data?.name}
            </span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
                >11:46</span
            >
        </div>
        <div
            class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700 w-fit self-end"
        >
            <article class="prose dark:prose-invert">
                {@html fixedHeadings(3, data.text)}
            </article>
        </div>
        <!--
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
            >Delivered</span
        >
        -->
    </div>
</div>