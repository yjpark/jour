import {
    mysqlTable,
    varchar,
    timestamp,
    serial,
    json,
    index,
    uniqueIndex,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
    "users",
    {
        id: serial("id").primaryKey(),
        email: varchar("email", { length: 128}).notNull(),
        name: varchar("name", { length: 64}).notNull(),
        avatar: varchar("avatar", { length: 256}).notNull(),
        data: json("json"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    },
    (table) => ({
        emailIdx: uniqueIndex("email_idx").on(table.email),
        nameIdx: index("name_idx").on(table.name),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;