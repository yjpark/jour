import { atom } from "nanostores";

import { type Snippet } from "svelte";

export const title = atom("JOUR.");
export const sidebarHidden = atom(true);

export const activeTab = atom("");

export const ensureActiveTab = function(fallback: string) {
    const path = window.location.pathname;
    if (path) {
        const tab = localStorage.getItem("activeTab:" + path) ?? fallback;
        activeTab.set(tab);
    } else {
        activeTab.set(fallback);
    }
}

export const saveActiveTab = function(tab: string) {
    activeTab.set(tab);
    const path = window.location.pathname;
    if (path) {
        localStorage.setItem("activeTab:" + path, tab);
    }
}

export const allTabs = atom<string[]>([]);
export const pageSide = atom<Snippet | null>(null);
