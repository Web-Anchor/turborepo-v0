import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const cookie = req.cookies.get(process.env.AUTH_SESSION_NAME || 'session'); // Getting cookies from the request using the `RequestCookies` API

  if (!cookie) {
    // redirect to login page if no session cookie is present
    console.log('🤖 No session found. Redirecting to login!');
    return NextResponse.redirect(new URL('/login', req.nextUrl).toString());
    // Setting cookies on the response using the `ResponseCookies` API
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/dashboard/:path*',
  ],
};
