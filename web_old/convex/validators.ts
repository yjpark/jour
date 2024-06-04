import { v } from "convex/values";

export const jourUserRole = v.union(
    v.literal("Owner"),
    v.literal("Admin"),
    v.literal("Editor"),
    v.literal("Reader")
);

export const entryKind = v.union(v.literal("Text"), v.literal("List"));

export const ENTRY_KINDS = {
    TEXT: v.literal("Text"),
    LIST: v.literal("List"),
}