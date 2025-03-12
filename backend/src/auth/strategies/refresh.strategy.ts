import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenService } from 'src/auth/auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
   Strategy,
   'jwt-refresh',
) {
   constructor(
      configService: ConfigService,
      private tokenService: TokenService, // Inject TokenService
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: configService.get('JWT_REFRESH_SECRET'),
         passReqToCallback: true,
      });
   }

   async validate(req: Request, payload: { sub: string }) {
      const refreshToken = req.get('Authorization')?.replace('Bearer ', '');
      if (!refreshToken) {
         throw new UnauthorizedException('Refresh token missing');
      }

      return this.tokenService.validateRefreshToken(refreshToken);
   }
}
