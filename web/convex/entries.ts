import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { getAuthUser } from "./auth";
import { getUser, getUserByEmail } from "./users";
import { type Entry, type JourId, ENTRY_KINDS } from "./types";

export const getLatestEntries = query({
    args: {
        jour: v.id("jours"),
        //paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        //TODO: auth
        const entries = await ctx.db
            .query("entries")
            .withIndex("by_jour", (q) => q.eq("jour", args.jour))
            .order("desc")
            .collect()
            //.paginate(args.paginationOpts);
        return entries;
    },
});

export const createTextEntry = mutation({
    args: {
        jour: v.id("jours"),
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await getAuthUser(ctx, args);

        const newEntryId = await ctx.db.insert("entries", {
            jour: args.jour,
            user: user._id,
            kind: ENTRY_KINDS.TEXT,
            text: args.text,
            data: null,
        });
        return newEntryId;
    },
});