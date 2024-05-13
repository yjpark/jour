import { createRouter } from "@nanostores/router";

export const router = createRouter({
    home: "/app",
    jours: "/app/jours",
    jour: "/app/jours/:channel",
    user: "/app/users/:user",
    head: "/app/heads/:head",
    entry: "/app/entries/:entry",
});

export const getRouteTitle = function(route: null | string) {
    switch (route) {
        case "jours":
            return "JOURs";
        default:
            return "JOUR.";
    }
}