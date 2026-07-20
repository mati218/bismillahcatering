import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'admin_session';
const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me-please'
);

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminApi =
    pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth/login';

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await isValidSession(token);

  if (valid) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
