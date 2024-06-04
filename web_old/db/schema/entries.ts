import {
    mysqlTable,
    int,
    text,
    json,
    timestamp,
    serial,
    index,
} from "drizzle-orm/mysql-core";
import {
    sql
} from "drizzle-orm";

export const entries = mysqlTable(
    "entries",
    {
        id: serial("id").primaryKey(),
        jourId: int("jour_id").notNull(),
        userId: int("user_id").notNull(),
        headId: int("head_id"),
        text: text("text"),
        data: json("data"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
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

