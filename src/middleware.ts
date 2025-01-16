/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

const isExternalRoute = createRouteMatcher([
  "/api/webhook/clerk",
  "/api/health",
]);

const isInternalRoute = createRouteMatcher(["/api(.*)"]);

const isPublicRoute = createRouteMatcher(["/", "/en", "/ru"]);

export default clerkMiddleware(async (auth, req) => {
  if (isExternalRoute(req)) {
    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (isInternalRoute(req)) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
