import { atom } from "nanostores";

import { router, getRouteTitle } from "@app/router";
import { type Snippet } from "svelte";

export const title = atom(getRouteTitle());

export const sidebarHidden = atom(true);

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

export const allTabs = atom<string[]>([]);
export const pageSide = atom<Snippet | null>(null);