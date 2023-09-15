// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session/edge"
import { sessionOptions } from "@/lib/session/config"
import { isAuthenticated } from "./lib/auth"
import { IApiResponse } from "./types"

export const config = {
  matcher: ["/api/:path*", "/products:path*", "/posts:path*"],
}

const publicRoutes = ["/api/auth/callback", "/api/auth/logout"]

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  const session = await getIronSession(request, response, sessionOptions)
  const requestedUrl = request.nextUrl.pathname

  if (!publicRoutes.includes(requestedUrl)) {
    const userIsAuthenticated = await isAuthenticated(session)

    if (!userIsAuthenticated) {
      if (requestedUrl.startsWith("/api")) {
        // Response for API routes.
        const responseBody: IApiResponse = {
          success: false,
          message: "Authentication failed.",
        }
        return new NextResponse(JSON.stringify(responseBody), {
          status: 401,
          headers: { "content-type": "application/json" },
        })
      }

      // Response for page routes.
      const state = btoa(JSON.stringify({ nextUrl: request.nextUrl.href }))
      const loginUrl = new URL(
        `${process.env.AUTH_URL}&state=${state}`,
        request.url,
      )
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}
