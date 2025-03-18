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
        private tokenService: TokenService, 
    ) {
        console.log('JWT Secret', configService.get<string>('jwt.refresh'),)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.refresh'),
            passReqToCallback: true,
        });
    }

    async validate(payload: any) {
        return this.tokenService.validateRefreshToken(payload);
    }
}
