import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect only /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude login page from protection
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      // If no access token, try to redirect to login
      // Client-side can handle refresh tokens but for middleware, we just redirect
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    try {
      // Verify the access token
      await jwtVerify(accessToken, getJwtSecret());
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
