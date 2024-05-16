import { atom } from "nanostores";

import { router, getRouteTitle } from "@app/router";

export const title = atom(getRouteTitle());

router.subscribe(() => {
    title.set(getRouteTitle())
})