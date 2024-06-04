import { sha256 } from "./utils";
import {
    internalMutation,
    internalQuery,
    mutation,
    query,
} from "./_generated/server";
import { v } from "convex/values";
import { getUserByEmail } from "./users";
import { type Auth } from "./types";

const getGravatar = async function (email: string) {
    const hash = await sha256(email.trim().toLowerCase());
    return "https://gravatar.com/avatar/" + hash;
};

export const createUser = internalMutation({
    args: {
        email: v.string(),
        name: v.optional(v.string()),
        avatar: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const avatar = args.avatar ?? await getGravatar(args.email);
        const newUserId = await ctx.db.insert("users", {
            email: args.email,
            name: args.name ?? args.email,
            avatar: avatar,
        });
        return newUserId;
    },
});

export const tryAuth = internalQuery({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const email = identity.email;
        if (email === null) {
            throw new Error("User email not found");
        }
        const user = await getUserByEmail(ctx, { email: email! });
        return {
            identity: identity,
            user: user,
        };
    },
});

export const getAuthUser = internalQuery({
    args: {},
    handler: async (ctx, args) => {
        const auth = await tryAuth(ctx, {});
        if (auth.user === null) {
            throw new Error("User not exist");
        }
        return auth.user;
    },
});

export const syncUser = mutation({
    args: {},
    handler: async (ctx, args) => {
        const auth = await tryAuth(ctx, {});
        if (auth.user === null) {
            const newUserId = await createUser(ctx, {
                email: auth.identity.email!,
                name: auth.identity.name,
                avatar: auth.identity.pictureUrl,
            });
            if (!newUserId) {
                throw new Error("Create user failed");
            }
            return newUserId;
        } else {
            if (auth.user._id) {
                await ctx.db.patch(auth.user._id, {
                    name: auth.identity.name,
                    avatar: auth.identity.pictureUrl,
                });
            }
            return auth.user._id;
        }
    },
});

export const getAuth = query({
    args: {},
    handler: async (ctx, args) => {
        const auth = await tryAuth(ctx, {});
        if (auth.user === null) {
            throw new Error("User not exist");
        }
        return {
            identidy: auth.identity,
            user: auth.user,
        } as Auth;
    },
});
