import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
   Strategy,
   'jwt-refresh',
) {
   constructor(
      configService: ConfigService,
      private prisma: PrismaService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: configService.get('JWT_REFERSH_SECRET'),
         passReqToCallback: true,
      });
   }

   async validate(req, payload: { sub: string; email: string }) {
      const refreshToken = req.get('Authorization')?.replace('Bearer ', '');
      const user = await this.prisma.user.findUnique({
         where: { id: payload.sub },
         include: { refreshTokens: true },
      });

      if (!user) throw new UnauthorizedException();

      const tokenExists = user.refreshTokens.some((rt) => rt === refreshToken);
      if (!tokenExists) throw new UnauthorizedException();

      return { userId: payload.sub, email: payload.email };
   }
}
