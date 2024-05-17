import { atom, map } from "nanostores";
import { type GetJoinJoursReturn, type GetJourReturn, queryJour, type GetUserJourReturn, queryUserJour } from "@app/api";
import { JOUR_USER_ROLES, type EntryId, type Jour, type JourId, type JourUserRole } from "@convex/types";

export const joinJours = atom<null | GetJoinJoursReturn>(null);

export const jours = map<{[id: JourId]: GetJourReturn}>({});

export const fetchJour = function(id: JourId): GetJourReturn {
    const exist = jours.get()[id];
    if (exist) {
        return exist;
    }
    const jour = queryJour({id: id});
    jours.setKey(id, jour);
    return jour;
}

export const userJours = map<{[id: JourId]: GetUserJourReturn}>({});
export const fetchUserJour = function(id: JourId): GetUserJourReturn {
    const exist = userJours.get()[id];
    if (exist) {
        return exist;
    }
    const jour = queryUserJour({jour: id});
    userJours.setKey(id, jour);
    return jour;
}

export const canEditJour = function(role: JourUserRole) {
    return role != JOUR_USER_ROLES.READER;
}

export const canAdminJour = function(role: JourUserRole) {
    return role == JOUR_USER_ROLES.OWNER || role == JOUR_USER_ROLES.ADMIN ;
}

export const lastReadIds = map<{[id: JourId]: EntryId}>({});
