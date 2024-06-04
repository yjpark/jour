// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { Validator, v } from "convex/values";
import { jourUserRole, entryKind, ENTRY_KINDS } from "./validators";

const entriesTable = defineTable({
    jour: v.id("jours"),
    user: v.id("users"),
    kind: entryKind,
    text: v.string(),
    data: v.union(
      v.null(),
      v.object({
        kind: ENTRY_KINDS.LIST,
        items: v.array(
          v.id("entries"),
        ),
      }),
    ),
    head: v.optional(v.id("heads")),
  })
    .index("by_jour", ["jour"])
    .index("by_user", ["user"])
    .index("by_head", ["head"]);

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.string(),
    profile: v.optional(v.id("heads")),
  })
    .index("by_email", ["email"]),
  jours: defineTable({
    title: v.string(),
    theme: v.optional(v.string()),
    profile: v.optional(v.id("heads")),
  }),
  jour_users: defineTable({
    jour: v.id("jours"),
    user: v.id("users"),
    role: jourUserRole,
  })
    .index("by_jour", ["jour"])
    .index("by_user", ["user"])
    .index("by_user_jour", ["user", "jour"]),
  heads: defineTable({
    jour: v.id("jours"),
    current: v.id("entries"),
    time: v.int64(), //ms since epoch
    version: v.int64(),
  })
    .index("by_jour", ["jour"])
    .index("by_time", ["time"]),
  backlinks: defineTable({
    entry: v.id("entries"),
    other: v.id("entries"),
    relation: v.union(
      v.literal("UsedBy"),
      v.literal("ShadowedBy"),
    ),
  })
    .index("by_entry", ["entry"])
    .index("by_other", ["other"]),
  entries: entriesTable,
  drafts: entriesTable,
});
