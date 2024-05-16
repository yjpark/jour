import { mutation, query } from "./_generated/server";
import { getAuthUser } from "./auth";
import { v } from "convex/values";
import { getUser, getUserByEmail } from "./users";
import type { JoinJour, UserJour } from "./types";
import { getLatestEntries } from "./entries";

export const getJour = query({
    args: { id: v.id("jours") },
    handler: async (ctx, args) => {
        const jour = await ctx.db.get(args.id);
        return jour;
    },
});

export const createJour = mutation({
    args: {
        owner: v.id("users"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const newJourId = await ctx.db.insert("jours", {
            owner: args.owner,
            title: args.title,
        });
        return newJourId;
    },
});

export const getJoinJours = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await getAuthUser(ctx, args);
        const jour_users = await ctx.db
            .query("jour_users")
            .withIndex("by_user", (q) => q.eq("user", user._id))
            .collect();
        return Promise.all(
            jour_users.map(async (jour_user) => {
                const jour = await ctx.db.get(jour_user.jour);
                return {
                    jour: jour,
                    user: jour_user.user,
                    role: jour_user.role,
                } as JoinJour;
            })
        );
    },
});

export const getUserJour = query({
    args: { jour: v.id("jours") },
    handler: async (ctx, args) => {
        const user = await getAuthUser(ctx, args);
        const jour_user = await ctx.db
            .query("jour_users")
            .withIndex("by_user_jour", (q) => q.eq("user", user._id).eq("jour", args.jour))
            .unique();
        if (jour_user) {
            const jour = await getJour(ctx, { id: args.jour });
            const latest = await getLatestEntries(ctx, args);
            return {
                jour: jour,
                user: user,
                role: jour_user.role,
                latest: latest,
            } as UserJour;
        }
        return null;
    },
});
