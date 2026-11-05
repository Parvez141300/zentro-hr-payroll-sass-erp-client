import type { NextRequest } from 'next/server'
import { jwtUtils } from './lib/jwtUtils';
import { envVars } from './lib/env';
import { UserRole } from './types/enums.type';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let userRole : UserRole | null = null;

  const decodedAccessToken = accessToken && await jwtUtils.verifyToken(accessToken, envVars.JWT_TOKEN_SECRET);

  if(decodedAccessToken) {
    userRole = decodedAccessToken.role as UserRole;
  }

  console.log('decoded access token', decodedAccessToken);
}