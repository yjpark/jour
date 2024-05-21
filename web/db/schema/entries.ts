import {
    mysqlTable,
    int,
    text,
    timestamp,
    serial,
    index,
} from "drizzle-orm/mysql-core";

export const entries = mysqlTable(
    "entries",
    {
        id: serial("id").primaryKey(),
        jourId: int("jour_id").notNull(),
        userId: int("user_id").notNull(),
        headId: int("head_id"),
        text: text("text"),
        createdAt: timestamp("created_at"),
        updatedAt: timestamp("updated_at"),
    },
    (table) => ({
        jourIdx: index("jour_idx").on(table.jourId),
        userIdx: index("user_idx").on(table.userId),
        headIdx: index("head_idx").on(table.headId),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type Entry = typeof entries.$inferSelect;
export type NewEntry = typeof entries.$inferInsert;

