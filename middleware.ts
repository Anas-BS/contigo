import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'contigo_role';

const ROLE_HOME: Record<string, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

function requiredRolesForPath(pathname: string): string[] | null {
  if (pathname.startsWith('/student')) return ['student', 'admin'];
  if (pathname.startsWith('/teacher')) return ['teacher', 'admin'];
  if (pathname.startsWith('/admin')) return ['admin'];
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const allowed = requiredRolesForPath(pathname);
  if (!allowed) return NextResponse.next();

  const role = req.cookies.get(COOKIE_NAME)?.value;

  if (!role) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (!allowed.includes(role)) {
    const home = ROLE_HOME[role] ?? '/login';
    const url = req.nextUrl.clone();
    url.pathname = home;
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*', '/admin/:path*'],
};
