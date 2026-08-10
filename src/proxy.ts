import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "csa";

/**
 * Gates /case-studies/* behind a password page instead of the browser's
 * native Basic Auth prompt. This repo is public on GitHub, so the password
 * lives in CASE_STUDY_PASSWORD (Vercel env var / .env.local), never in
 * source — fails closed if it isn't configured. The access page itself
 * lives outside /case-studies/ so the redirect below can't loop.
 */
export function proxy(request: NextRequest) {
  const password = process.env.CASE_STUDY_PASSWORD;

  if (!password) {
    return new NextResponse("Case study password protection is not configured.", {
      status: 503,
    });
  }

  if (request.cookies.get(COOKIE_NAME)?.value === password) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const next = url.pathname + url.search;

  url.pathname = "/case-study-access";
  url.search = `?next=${encodeURIComponent(next)}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/case-studies/:path*",
};
