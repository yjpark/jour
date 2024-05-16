import { createRouter, redirectPage } from "@nanostores/router";

export const ROUTES = {
    HOME: "home" as "home",
    JOURS: "jours" as "jours",
    JOUR: "jour" as "jour",
    USER: "user" as "user",
    HEAD: "head" as "head",
    ENTRY: "entry" as "entry",
    DRAFT: "draft" as "draft",
}

export const router = createRouter({
    home: "/app",
    jours: "/app/jours",
    jour: "/app/jours/:id",
    user: "/app/users/:id",
    head: "/app/heads/:id",
    entry: "/app/entries/:id",
    draft: "/app/drafts/:id",
});

export const getRouteTitle = function () {
    const route = router.get();
    if (!route) {
        return "...";
    }
    switch (route.route) {
        case ROUTES.JOURS:
            return "JOURs";
        case "jour":
            return "<JOUR> " + route.params.id.substring(0, 8);
        default:
            return "JOUR.";
    }
};

export const redirect = function (name: any, params: any = null) {
    const sidebar_drawer = <HTMLInputElement> document.getElementById("sidebar-drawer");
    if (sidebar_drawer) {
        sidebar_drawer.checked = false;
    }
    redirectPage(router, name, params);
};
