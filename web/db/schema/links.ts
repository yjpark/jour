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
        kind: mysqlEnum("kind", ["Link", "Shadow"]),
        data: json("json"),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => ({
        fromIdx: index("from_idx").on(table.fromId),
        toIdx: index("to_idx").on(table.toId),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
    })
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
