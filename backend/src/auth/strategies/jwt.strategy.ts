import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      private prisma: PrismaService,
      configService: ConfigService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
         ignoreExpiration: true,
         passReqToCallback: true,
      });
   }

   async validate(payload: { id: string; username: string }) {
      const user = await this.prisma.user.findUnique({
         where: { id: payload.id },
      });
      if (!user) throw new UnauthorizedException('Invalid token');

      return { id: user.id, username: user.username }; 
   }
}
