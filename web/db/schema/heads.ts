import {
    mysqlTable,
    varchar,
    timestamp,
    int,
    index,
} from "drizzle-orm/mysql-core";

export const heads = mysqlTable(
    "heads",
    {
        jourId: int("jour_id").notNull(),
        EntryId: int("entry_id").notNull(),
        name: varchar("name", { length: 64}).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => ({
        nameIdx: index("name_idx").on(table.name),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
    })
);

export type Head = typeof heads.$inferSelect;
export type NewHead = typeof heads.$inferInsert;
