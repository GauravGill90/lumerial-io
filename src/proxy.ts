import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gates /case-studies/* behind HTTP Basic Auth. This repo is public on
 * GitHub, so the password lives in CASE_STUDY_PASSWORD (Vercel env var /
 * .env.local) — never in source. Fails closed if it isn't configured.
 */
export function proxy(request: NextRequest) {
  const password = process.env.CASE_STUDY_PASSWORD;

  if (!password) {
    return new NextResponse("Case study password protection is not configured.", {
      status: 503,
    });
  }

  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice("Basic ".length));
    const suppliedPassword = decoded.slice(decoded.indexOf(":") + 1);

    if (suppliedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Case study", charset="UTF-8"' },
  });
}

export const config = {
  matcher: "/case-studies/:path*",
};
