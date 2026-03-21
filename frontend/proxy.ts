import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/mypage"];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((r) => path.startsWith(r));

  if (isProtectedRoute) {
    const session = req.cookies.get("better-auth.session_token");
    if (!session) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
