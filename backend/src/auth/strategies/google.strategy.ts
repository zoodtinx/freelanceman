import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        console.log('id', configService.get('google.clientId'))
        super({
            clientID: configService.get('google.clientId'),
            clientSecret: configService.get('google.clientSecret'),
            callbackURL: configService.get('google.redirectUri'),
            scope: ['profile', 'email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        done(null, profile);
    }
}
