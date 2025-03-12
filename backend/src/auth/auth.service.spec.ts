import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { mockUser } from 'src/auth/mockData';


describe('LocalAuthService', () => {
   let authService: LocalAuthService;
   let jwtService: JwtService;
   let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            LocalStrategy,
            LocalAuthService,
            JwtService,
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

      authService = module.get<LocalAuthService>(LocalAuthService);
      jwtService = module.get<JwtService>(JwtService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   it('should be defined', () => {
      expect(authService).toBeDefined();
      expect(jwtService).toBeDefined();
      expect(prismaService).toBeDefined();
   });

   it('should return a user if validation succeeds', async () => {});
   it('should throw UnauthorizedException if validation fails', async () => {});

   it('should return a user, access token, refresh token if registration succeeds', async () => {});
   it('should throw ConflictException if validation fails', async () => {});
});


describe('TokenService', () => {
   let tokenService: TokenService;
   let jwtService: JwtService;
   let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            TokenService,
            JwtService,
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

      tokenService = module.get<TokenService>(TokenService);
      jwtService = module.get<JwtService>(JwtService);
      prismaService = module.get<PrismaService>(PrismaService);
   });

   it('should be defined', () => {
      expect(tokenService).toBeDefined();
      expect(jwtService).toBeDefined();
      expect(prismaService).toBeDefined();
   });

   it('should return a user if accsss token validation succeeds', async () => {});
   it('should throw UnauthorizedException if accsss token validation fails', async () => {});

   it('should return a user if refresh token validation succeeds', async () => {});
   it('should throw UnauthorizedException if refresh token validation fails', async () => {});
   
   it('should return a user, access token, refresh token if refresh access token succeeds', async () => {});
   it('should throw UnauthorizedException if refresh access token fails', async () => {});
});
