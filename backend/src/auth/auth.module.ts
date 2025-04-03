import { Module } from '@nestjs/common';
import { GoogleOAuthService, LocalAuthService, TokenService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refresh.strategy';
import { EmailService } from 'src/shared/email/email.service';
import { MailModule } from 'src/shared/email/email.module';

@Module({
    imports: [
        MailModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.access'),
                signOptions: {
                    expiresIn: configService.get<string>(
                        'jwt.accessExpiresIn',
                        '1h',
                    ),
                },
            }),
        }),
    ],
    providers: [
        LocalAuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshTokenStrategy,
        TokenService,
        GoogleOAuthService,
    ],
    controllers: [AuthController],
    exports: [LocalAuthService, JwtModule],
})
export class AuthModule {}
