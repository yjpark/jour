import { map } from "nanostores";
import { queryUser, type GetUser, type GetUserReturn } from "@app/api";
import { type User, type UserId } from "@convex/types";

export const users = map<{[id: UserId]: GetUserReturn}>({});

export const fetchUser = function(id: UserId): GetUserReturn {
    const exist = users.get()[id];
    if (exist) {
        return exist;
    }
    const user = queryUser({id: id});
    users.setKey(id, user);
    return user;
}