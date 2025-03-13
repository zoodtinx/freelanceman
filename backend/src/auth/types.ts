
export interface AccessTokenPayload {
   sub: string,
   iat: number,
   exp: number,
   role: 'admin' | 'user'
}

export interface RefreshTokenPayload {
   sub: string,
   iat: number,
   exp: number,
}