import { atom } from "nanostores";

import * as clerk from "@clerk/types";

export const user = atom<null | clerk.UserResource>(null);
export const authing = atom(false);
export const token = atom<null | string>(null);
