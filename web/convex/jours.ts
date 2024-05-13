import { mutation, query } from "./_generated/server";
import { getAuthUser } from "./auth";
import { v } from "convex/values";
import { getUser, getUserByEmail } from "./users";

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

export const getOwnJours = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await getAuthUser(ctx, args);
        const jours = await ctx.db
            .query("jours")
            .withIndex("by_owner", (q) => q.eq("owner", user._id))
            .collect();
        return jours;
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
                    role: jour_user.role,
                    user: jour_user.user,
                };
            })
        );
    },
});
