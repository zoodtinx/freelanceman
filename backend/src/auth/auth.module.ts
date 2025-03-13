import { Module } from '@nestjs/common';
import { LocalAuthService, TokenService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h') },
      }),
    }),
  ],
  providers: [LocalAuthService, LocalStrategy, PrismaService, JwtStrategy, TokenService],
  controllers: [AuthController],
  exports: [LocalAuthService, JwtModule], // Export JwtModule if used elsewhere
})
export class AuthModule {}
