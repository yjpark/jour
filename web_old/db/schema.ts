import {
    mysqlTable,
    int,
    varchar,
    timestamp,
    serial,
    text,
    json,
    mysqlEnum,
    index,
    uniqueIndex,
    primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
    "users",
    {
        id: serial("id").primaryKey(),
        email: varchar("email", { length: 128}).notNull(),
        name: varchar("name", { length: 64}).notNull(),
        avatar: varchar("avatar", { length: 256}).notNull(),
        data: json("data"),
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

export const jours = mysqlTable(
    "jours",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 64}).notNull(),
        data: json("data"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    },
    (table) => ({
        nameIdx: index("name_idx").on(table.name),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt),
    })
);

export type Jour = typeof jours.$inferSelect;
export type NewJour = typeof jours.$inferInsert;

export const jourUsers = mysqlTable(
    "jour_users",
    {
        jourId: int("jour_id").notNull(),
        userId: int("user_id").notNull(),
        role: mysqlEnum("role", ["Owner", "Admin", "Editor", "Reader"]),
        data: json("data"),
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
