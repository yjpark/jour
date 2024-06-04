import { type Doc } from "./_generated/dataModel.d";
import { v, type Infer, type GenericId } from "convex/values";
import { entryKind, jourUserRole } from "./validators";
import type { UserIdentity } from "convex/server";

export type JourUserRole = Infer<typeof jourUserRole>;
export const JOUR_USER_ROLES = {
    OWNER: "Owner" as "Owner",
    ADMIN: "Admin" as "Admin",
    EDITOR: "Editor" as "Editor",
    READER: "Reader" as "Reader",
};

export type User = Doc<"users">;
export type UserId = GenericId<"users">;

export type Jour = Doc<"jours">;
export type JourId = GenericId<"jours">;

export type JourUser = Doc<"jour_users">;
export type JourUserId = GenericId<"jour_users">;

export type Head = Doc<"heads">;
export type HeadId = GenericId<"heads">;

export type Backlink = Doc<"backlinks">;
export type BacklinkId = GenericId<"backlinks">;

export type Entry = Doc<"entries">;
export type EntryId = GenericId<"entries">;
export type EntryKind = Infer<typeof entryKind>;

export const ENTRY_KINDS = {
    TEXT: "Text" as "Text",
    LIST: "List" as "List",
}

export type Draft = Doc<"drafts">;
export type DraftId = GenericId<"drafts">;

export type JoinJour = {
    jour: Jour;
    user: UserId;
    role: JourUserRole;
};

export type Auth = {
    user: User;
    identidy: UserIdentity;
}

export type UserJour = {
    jour: Jour;
    user: User;
    role: JourUserRole;
    latest: Entry[];
}