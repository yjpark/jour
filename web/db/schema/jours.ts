import {
    mysqlTable,
    varchar,
    timestamp,
    serial,
    index,
} from "drizzle-orm/mysql-core";

export const jours = mysqlTable(
    "jours",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 64}).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").onUpdateNow(),
    },
    (table) => ({
        nameIdx: index("name_idx").on(table.name),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type Jour = typeof jours.$inferSelect;
export type NewJour = typeof jours.$inferInsert;
