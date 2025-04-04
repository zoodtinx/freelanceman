
export interface AccessTokenPayload {
   sub: string,
   iat: number,
   exp: number,
   role: string
}

export interface RefreshTokenPayload {
   sub: string,
   iat: number,
   exp: number,
}