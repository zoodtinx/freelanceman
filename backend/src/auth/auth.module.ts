import { Module } from '@nestjs/common';
import { LocalAuthService, TokenService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refresh.strategy';

@Module({
    imports: [
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
        PrismaService,
        JwtStrategy,
        RefreshTokenStrategy,
        TokenService,
    ],
    controllers: [AuthController],
    exports: [LocalAuthService, JwtModule],
})
export class AuthModule {}
