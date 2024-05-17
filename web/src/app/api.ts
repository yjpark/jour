import { useQuery, type UseQueryReturn } from "@convex-svelte";
import { ConvexClient } from "convex/browser";
import { v } from "convex/values";
import { type FunctionReference, type FunctionReturnType, type FunctionArgs } from "convex/server";
import { api } from "@convex/_generated/api.js";

/*
// Copied from https://github.com/get-convex/convex-svelte/blob/main/src/lib/client.svelte.ts
export type UseQueryReturn<Query extends FunctionReference<"query">> =
    | { data: undefined; error: undefined; isLoading: true; isStale: false }
    | { data: undefined; error: Error; isLoading: false; isStale: boolean }
    | {
        data: FunctionReturnType<Query>;
        error: undefined;
        isLoading: false;
        isStale: boolean;
    };
 */

export type GetAuth = typeof api.auth.getAuth;
export type GetAuthReturn = UseQueryReturn<GetAuth>;
export const queryAuth = function(args: FunctionArgs<GetAuth>) {
    return useQuery(api.auth.getAuth, args);
}

export type SyncUser = typeof api.auth.syncUser;
export const syncUser = function(client: ConvexClient, args: FunctionArgs<SyncUser>) {
    return client.mutation(api.auth.syncUser, args);
}


export type GetUser = typeof api.users.getUser;
export type GetUserReturn = UseQueryReturn<GetUser>;
export const queryUser = function(args: FunctionArgs<GetUser>) {
    return useQuery(api.users.getUser, args);
}

export type GetJour = typeof api.jours.getJour;
export type GetJourReturn = UseQueryReturn<GetJour>;
export const queryJour = function(args: FunctionArgs<GetJour>) {
    return useQuery(api.jours.getJour, args);
}

export type GetJoinJours = typeof api.jours.getJoinJours;
export type GetJoinJoursReturn = UseQueryReturn<GetJoinJours>;
export const queryJoinJours = function(args: FunctionArgs<GetJoinJours>) {
    return useQuery(api.jours.getJoinJours, args);
}

export type GetUserJour = typeof api.jours.getUserJour;
export type GetUserJourReturn = UseQueryReturn<GetUserJour>;
export const queryUserJour = function(args: FunctionArgs<GetUserJour>) {
    return useQuery(api.jours.getUserJour, args);
}

export type GetLatestEntries = typeof api.entries.getLatestEntries;
export type GetLatestEntriesReturn = UseQueryReturn<GetLatestEntries>;
export const queryLatestEntries = function(args: FunctionArgs<GetLatestEntries>) {
    return useQuery(api.entries.getLatestEntries, args);
}

export type CreateTextEntry = typeof api.entries.createTextEntry;
export const createTextEntry = function(client: ConvexClient, args: FunctionArgs<CreateTextEntry>) {
    return client.mutation(api.entries.createTextEntry, args);
}