import { atom } from "nanostores";

import * as clerk from "@clerk/types";
import { type UserId } from "@convex/types";
import { type GetAuthReturn, queryAuth } from "@app/api";

export const clerkUser = atom<null | clerk.UserResource>(null);
export const authing = atom(true);
export const token = atom<null | string>(null);

export const auth = atom<null | GetAuthReturn>(null);

export const ensureAuth = function () {
    if (!auth.get()) {
        auth.set(queryAuth({}));
    }
};

export const isSelf = function (id: UserId) {
    return id == auth.get()?.data?.user._id;
};
