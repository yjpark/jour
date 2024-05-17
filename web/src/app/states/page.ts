import { atom, map } from "nanostores";

import { router, getRouteTitle } from "@app/router";

export const title = atom(getRouteTitle());

router.subscribe(() => {
    title.set(getRouteTitle());
});

export const activeTab = atom(localStorage.getItem("activeTab"));

activeTab.listen((value) => {
    if (value) {
        console.log("AAAAAAAAAAAAAAAAAAAAA", value);
        localStorage.setItem("activeTab", value);
    }
});

export const activeTabs = map<{[path: string]: string}>({})

export const ensureActiveTab = function(fallback: string) {
    const path = router.get()?.path;
    if (path) {
        activeTabs.setKey(path, localStorage.getItem("activeTab:" + path) ?? fallback);
    }
}

export const getActiveTab = function() {
    const path = router.get()?.path;
    if (path) {
        return activeTabs.get()[path];
    }
    return null;
}

export const saveActiveTab = function(tab: string) {
    const path = router.get()?.path;
    if (path) {
        activeTabs.get()[path] = tab;
        localStorage.setItem("activeTab:" + path, tab);
    }
}
