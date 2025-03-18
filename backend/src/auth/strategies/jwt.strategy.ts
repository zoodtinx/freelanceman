import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'src/auth/auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
   constructor(
      private configService: ConfigService,
      private tokenService: TokenService
   ) {
      const secret = configService.get<string>('jwt.access');

      if (!secret) {
         throw new Error('JWT_ACCESS_SECRET is not defined');
      }

      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: secret,
         ignoreExpiration: true,
         passReqToCallback: true,
      });
   }

   async validate(payload: any) {
      return this.tokenService.validateAccessToken(payload);
   }
}
