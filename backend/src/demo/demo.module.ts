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
import { DemoService } from 'src/demo/demo.service';

@Module({
    providers: [DemoService],
    exports: [DemoService],
})
export class AuthModule {}
