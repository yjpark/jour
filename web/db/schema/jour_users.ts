import {
    mysqlTable,
    timestamp,
    json,
    int,
    index,
    primaryKey,
    mysqlEnum,
} from "drizzle-orm/mysql-core";

export const jourUsers = mysqlTable(
    "jour_users",
    {
        jourId: int("jour_id").notNull(),
        userId: int("user_id").notNull(),
        role: mysqlEnum("role", ["Owner", "Admin", "Editor", "Reader"]),
        data: json("json"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.jourId, table.userId] }),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type JourUser = typeof jourUsers.$inferSelect;
export type NewJourUser = typeof jourUsers.$inferInsert;
