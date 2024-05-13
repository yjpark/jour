import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { sha256 } from "./utils";
import { getUserByEmail } from "./users";

export const getOrCreateUser = internalMutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
        if (user != null) {
            return user;
        }
        const hash = await sha256(args.email.trim().toLowerCase());
        const avatar = "https://gravatar.com/avatar/" + hash;
        const newUserId = await ctx.db.insert("users", {
            email: args.email,
            name: args.email,
            avatar: avatar,
        });
        const newUser = await ctx.db.get(newUserId);
        return newUser;
    },
});

export const getAuthUser = internalQuery({
    args: {},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const email = identity.email;
        if (email === null) {
            throw new Error("User email not found");
        }
        const user = await getUserByEmail(ctx, {email: email!})
        if (user === null) {
            throw new Error("User not exist");
        }
        return user;
    }
});