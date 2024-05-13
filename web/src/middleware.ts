import { clerkMiddleware, createRouteMatcher } from "astro-clerk-auth/server";

// This will match any route that starts with /app
const matchesApp = createRouteMatcher(["/app(.*)"]);

export const onRequest = clerkMiddleware((auth, context, next) => {
    // if the user is not signed in and they are trying to access the dashboard, redirect them to the sign in page
    if (matchesApp(context.request) && !auth().userId) {
        return auth().redirectToSignIn();
    }

    return next();
});
