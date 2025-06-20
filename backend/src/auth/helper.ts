
import { Response } from 'express';

export function setRefreshTokenCookie(res: Response, token: string, isProd: boolean) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    priority: 'high',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export function clearRefreshTokenCookie(res: Response, isProd: boolean) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/',
  });
}
