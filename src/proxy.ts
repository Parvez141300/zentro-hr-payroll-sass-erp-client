import { NextResponse, type NextRequest } from 'next/server';
import { jwtUtils } from './lib/jwtUtils';
import { envVars } from './lib/env';
import { UserRole } from './types/enums.type';
import { serverTokenRefresh } from './lib/auth/refresh.server';
import { isTokenExpiringSoon } from './lib/tokenUtils';
import { ICompany } from './types/company.type';
import {
  getDefaultDashboardRoute,
  canAccessRoute,
} from './lib/dashboardUtils';
import { IUser } from './types/user.type';

// ⬇️ কোন route-গুলো protected (login ছাড়া ঢোকা যাবে না)
const isProtectedRoute = (pathname: string): boolean => {
  const protectedPrefixes = [
    '/dashboard',
    '/super-admin',
    '/hr-manager',
    '/department-head',
    '/accountant',
    '/platform-super-admin',
    '/profile',
    '/reset-password',   // হ্যাঁ, এটাও protected (login লাগে)
  ];
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
};

// ⬇️ কোন route-গুলো auth page (login করা থাকলে এখানে ঢোকা যাবে না)
const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = ['/login', '/register', '/forgot-password', '/verify-email'];
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let userRole: UserRole | null = null;

  // ─────────────────────────────────────────────
  // ধাপ ১: Token decode
  // ─────────────────────────────────────────────
  const decodedAccessToken =
    accessToken &&
    (await jwtUtils.verifyToken(accessToken, envVars.JWT_TOKEN_SECRET));

  if (decodedAccessToken) {
    userRole = decodedAccessToken.role as UserRole;
  }

  const isLoggedIn = !!decodedAccessToken;

  // ─────────────────────────────────────────────
  // ধাপ ২: Proactive token refresh
  // ─────────────────────────────────────────────
  if (refreshToken && (await isTokenExpiringSoon(accessToken ?? ''))) {
    const newTokens = await serverTokenRefresh(
      refreshToken,
      sessionToken as string
    );

    if (newTokens) {
      const requestheaders = new Headers(request.headers);
      const response = NextResponse.next({
        request: { headers: requestheaders },
      });

      if (newTokens.accessToken) {
        response.cookies.set('accessToken', newTokens.accessToken, {
          httpOnly: true,
          secure: envVars.APP_ENV !== 'development',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24,
        });
      }
      if (newTokens.refreshToken) {
        response.cookies.set('refreshToken', newTokens.refreshToken, {
          httpOnly: true,
          secure: envVars.APP_ENV !== 'development',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      if (newTokens.sessionToken) {
        response.cookies.set(
          'better-auth.session_token',
          newTokens.sessionToken,
          {
            httpOnly: true,
            secure: envVars.APP_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24,
          }
        );
      }

      requestheaders.set('x-token-refreshed', '1');
      return response;
    }

    // ⬇️ refresh fail → logout করে login-এ পাঠাও
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('better-auth.session_token');
    return response;
  }

  // ─────────────────────────────────────────────
  // ধাপ ৩: Auth route-এ logged-in user গেলে dashboard-এ পাঠাও
  // ─────────────────────────────────────────────
  if (isAuthRoute(pathname) && isLoggedIn && userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }

  // ─────────────────────────────────────────────
  // ধাপ ৪: Protected route + non-logged-in → login page
  // ─────────────────────────────────────────────
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ─────────────────────────────────────────────
  // ধাপ ৫: Logged-in হলে company info এনে plan চেক
  // ─────────────────────────────────────────────
  if (isLoggedIn && userRole && isProtectedRoute(pathname)) {
    // Backend থেকে company info আনা
    const cookieString = request.cookies
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');

    let companyInfo: ICompany | null = null;
    try {
      const companyResponse = await fetch(
        `${envVars.BACKEND_URL}/api/v1/companies/own-company`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieString,
          },
        }
      );
      companyInfo = companyResponse.ok
        ? (await companyResponse.json()).data
        : null;
    } catch (e) {
      console.error('Company fetch failed', e);
    }

    // Minimal userInfo object (canAccessRoute-এর জন্য)
    const userInfoForAccess = {
      role: userRole,
      company: companyInfo,
    } as unknown as IUser;

    // ✅ Route access চেক (role + plan দুটোই)
    const allowed = canAccessRoute(userInfoForAccess, pathname);

    if (!allowed) {
      // Access নেই → নিজের default dashboard-এ redirect
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url)
      );
    }
  }

  // ─────────────────────────────────────────────
  // ধাপ ৬: সব ঠিক → এগিয়ে যাও
  // ─────────────────────────────────────────────
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};