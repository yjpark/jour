<script lang="ts">
    import { type Entry } from "@convex/types";
    import { isSelf } from "@app/states/auth";
    import { fetchUser } from "@app/states/users";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    dayjs.extend(relativeTime);
    import { fixedHeadings } from "@md/render";

    const { data } : { data: Entry } = $props();
    const user = fetchUser(data.user);
    const tooltipClass = isSelf(data.user)
        ? "tooltip tooltip-info tooltip-right"
        : "tooltip tooltip-info tooltip-left";
    //Need enclosing div to make the layout working on safari
</script>

<div>
<div class={isSelf(data.user) ? "chat chat-start" : "chat chat-end"}>
    <div class="chat-image avatar">
        <div class="w-10 rounded-full">
            <img alt={user?.data?.email} src={user?.data?.avatar} />
        </div>
    </div>
    <div class="chat-header">
        <div class={tooltipClass} data-tip={user?.data?.email}>
            {user?.data?.name}
        </div>
    </div>
    <div class="chat-bubble bg-base-100">
        <article class="prose prose-stone">
            {@html fixedHeadings(3, data.text)}
        </article>
    </div>
    <div class="chat-footer">
        <div class={tooltipClass} data-tip={dayjs(data._creationTime).format()}>
            <time class="text-xs opacity-50">
                {dayjs(data._creationTime).fromNow()}
            </time>
        </div>
    </div>
</div>
</div>
