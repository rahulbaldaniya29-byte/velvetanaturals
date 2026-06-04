import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(
  request: NextRequest
) {

  const auth =
    request.cookies.get('customer_auth');

  if (
    request.nextUrl.pathname.startsWith(
      '/orders'
    ) &&
    !auth
  ) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/orders/:path*'],
};