import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { LocalAuthService as AuthService, TokenService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { mockUser } from 'src/auth/mockData';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refresh.strategy';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from 'src/config/config.module';

describe('RefreshTokenStrategy', () => {
   let refreshTokenStrategy: RefreshTokenStrategy
   let jwtService: JwtService;
   let tokenService: TokenService
   let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [ConfigModule],
         providers: [
            RefreshTokenStrategy,
            AuthService,
            TokenService,
            {
               provide: JwtService,
               useValue: {
                  sign: jest.fn().mockReturnValue('1234'),
               },
            },
            {
               provide: PrismaService,
               useValue: {
                  user: {
                     findUnique: jest.fn(),
                  },
               },
            },
         ],
      }).compile();

      refreshTokenStrategy = module.get<RefreshTokenStrategy>(RefreshTokenStrategy);
      tokenService = module.get<TokenService>(TokenService);
      jwtService = module.get<JwtService>(JwtService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   it('should be defined', () => {
      expect(refreshTokenStrategy).toBeDefined();
      expect(tokenService).toBeDefined();
   });

   it('should return a user if validation succeeds', async () => {
      const user = {
         id: mockUser.id,
         email: mockUser.email,
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      await expect(
         refreshTokenStrategy.validate(user),
      ).resolves.toEqual(mockUser);
   });

   it('should throw UnauthorizedException if validation fails', async () => {
      const user = {
         id: mockUser.id,
         email: mockUser.email,
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      await expect(
         refreshTokenStrategy.validate(user),
      ).rejects.toThrow(UnauthorizedException);
   });
});
