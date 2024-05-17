import { atom } from "nanostores";

import { router, getRouteTitle } from "@app/router";

export const title = atom(getRouteTitle());

router.subscribe(() => {
    title.set(getRouteTitle());
});

export const activeTab = atom("");

export const ensureActiveTab = function(fallback: string) {
    const path = router.get()?.path;
    if (path) {
        const tab = localStorage.getItem("activeTab:" + path) ?? fallback;
        activeTab.set(tab);
    } else {
        activeTab.set(fallback);
    }
}

export const saveActiveTab = function(tab: string) {
    activeTab.set(tab);
    const path = router.get()?.path;
    if (path) {
        localStorage.setItem("activeTab:" + path, tab);
    }
}
