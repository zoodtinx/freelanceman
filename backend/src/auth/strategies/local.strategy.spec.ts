import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { LocalAuthService as AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';

describe('LocalStrategy', () => {
   let localStrategy: LocalStrategy;
   let authService: AuthService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            LocalStrategy,
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
                  sign: jest.fn(),
               },
            },
         ],
      }).compile();

      localStrategy = module.get<LocalStrategy>(LocalStrategy);
      authService = module.get<AuthService>(AuthService);
   });

   it('should be defined', () => {
      expect(localStrategy).toBeDefined();
      expect(authService.validateUser).toBeDefined();
   });

   it('should return a user if validation succeeds', async () => {
      const user = { id: '1', username: 'zoodtinx' };

      await expect(
         localStrategy.validate('zoodtinx', 'doomagine'),
      ).resolves.toEqual(user);
   });

   it('should throw UnauthorizedException if validation fails', async () => {
      await expect(
         localStrategy.validate('testuser', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
   });
});
