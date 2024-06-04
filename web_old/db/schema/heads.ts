import {
    mysqlTable,
    serial,
    varchar,
    timestamp,
    int,
    json,
    index,
    uniqueIndex,
} from "drizzle-orm/mysql-core";

export const heads = mysqlTable(
    "heads",
    {
        id: serial("id").primaryKey(),
        slug: varchar("slug", { length: 256 }).notNull(),
        jourId: int("jour_id").notNull(),
        entryId: int("entry_id").notNull(),
        data: json("data"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    },
    (table) => ({
        slugIdx: uniqueIndex("slug_idx").on(table.slug),
        jourIdx: index("jour_idx").on(table.jourId),
        entryIdx: index("entry_idx").on(table.entryId),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type Head = typeof heads.$inferSelect;
export type NewHead = typeof heads.$inferInsert;
