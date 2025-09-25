import { i18nRouter } from "next-i18n-router";
import i18Config from "../i18nConfig.ts";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18Config);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
