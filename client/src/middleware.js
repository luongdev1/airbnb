import {NextResponse} from "next/server"

export function middleware(req, res) {
  const currentUser = req.cookies.get("token")?.value
  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/account/:path*"],
}
