import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { LocalAuthService as AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { mockUser } from 'src/auth/mockData';
import { ConfigService } from '@nestjs/config';

describe('LocalStrategy', () => {
   let localStrategy: LocalStrategy;
   let authService: AuthService;
   let jwtService: JwtService;
   let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            LocalStrategy,
            ConfigService,
            AuthService,
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

      localStrategy = module.get<LocalStrategy>(LocalStrategy);
      authService = module.get<AuthService>(AuthService);
      jwtService = module.get<JwtService>(JwtService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   it('should be defined', () => {
      expect(localStrategy).toBeDefined();
      expect(authService.validateUser).toBeDefined();
   });

   it('should return a user if validation succeeds', async () => {
      const user = {
         id: mockUser.id,
         email: mockUser.email,
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      await expect(
         localStrategy.validate('johndoe@example.com', 'simplepass'),
      ).resolves.toEqual(user);
   });

   it('should throw UnauthorizedException if validation fails', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      await expect(
         localStrategy.validate('testuser', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
   });
});
