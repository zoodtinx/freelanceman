import {
   ConflictException,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCredentails } from 'types/credentials.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class LocalAuthService {
   constructor(
      private prismaService: PrismaService,
      private jwtService: JwtService,
   ) {}

   async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.prismaService.user.findUnique({
         where: { email },
      });
      if (user && (await bcrypt.compare(pass, user.password))) {
         const userCredentials = {
            id: user.id,
            username: user.email,
         };
         return userCredentials;
      }
      return null;
   }

   async register(email: string, password: string, displayName: string) {
      const existingUser = await this.prismaService.user.findUnique({
         where: { email },
      });
      if (existingUser) {
         throw new ConflictException('Username already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
         email,
         displayName,
         password: hashedPassword,
      };

      this.prismaService.user.create({
         data: newUser
      })

      const payload = { username: newUser.email };
      const access_token = this.jwtService.sign(payload);

      return { access_token, user: payload };
   }
}

@Injectable()
export class TokenService {
   constructor(
      private prismaService: PrismaService,
      private jwtService: JwtService,
   ){}

   async validateRefreshToken(refreshToken: string){
      const user = await this.prismaService.user.findFirst({
         where: {
            refreshTokens: {
               has: refreshToken
            }
         },
      });

      if (!user) {
         throw new UnauthorizedException('Invalid refresh token');
      }

      return user
   }
}

@Injectable()
export class GoogleOAuthService {}