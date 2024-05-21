import {
    mysqlTable,
    json,
    timestamp,
    serial,
    int,
    index,
    primaryKey,
    mysqlEnum,
} from "drizzle-orm/mysql-core";

export const links = mysqlTable(
    "links",
    {
        id: serial("id").primaryKey(),
        fromId: int("from_id").notNull(),
        toId: int("to_id").notNull(),
        kind: mysqlEnum("kind", ["Weak", "Link", "Shadow"]),
        data: json("data"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    },
    (table) => ({
        fromIdx: index("from_idx").on(table.fromId),
        toIdx: index("to_idx").on(table.toId),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
