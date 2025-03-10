import {
   Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCredentails } from 'types/credentials.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
   ) {}

   private users = [{ id: '1', username: 'zoodtinx', password: 'doomagine' }];

   async validateUser(email: string, pass: string): Promise<any> {
      const user = this.users.find((user) => user.username === email);
      if (user && (await bcrypt.compare(pass, user.password))) {
         const userCredentials = {
            id: user.id,
            username: user.username,
         };
         return userCredentials;
      }
      return null;
   }

   async login(user: UserCredentails) {
      const token = this.jwtService.sign(user);
      return {
         access_token: token,
         user,
      };
   }

   async register(username: string, password: string) {
      // const existingUser = await this.prisma.user.findUnique({
      //    where: { username },
      // });
      // if (existingUser) {
      //    throw new ConflictException('Username already in use');
      // }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
         username,
         password: hashedPassword,
      };

      this.users.push({
         id: randomUUID(),
         username: newUser.username,
         password: hashedPassword,
      });

      const payload = { id: newUser.id, username: newUser.username };
      const access_token = this.jwtService.sign(payload);

      return { access_token, user: payload };
   }
}
