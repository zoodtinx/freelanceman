import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        private configService: ConfigService,
        private tokenService: TokenService,
    ) {
        const secret = configService.get<string>('jwt.accessTokenSecret');

        if (!secret) {
            throw new Error('JWT_ACCESS_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        if (!payload?.sub) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return { id: payload.sub, role: payload.role };
    }
}
