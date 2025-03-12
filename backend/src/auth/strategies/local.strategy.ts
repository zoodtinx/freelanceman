import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalAuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: LocalAuthService) {
      super({ usernameField: 'username' });
   }

   async validate(username: string, password: string): Promise<any> {
      const user = await this.authService.validateUser(username, password);
      console.log('user result in local strategy', user)
      if (!user) {
         throw new UnauthorizedException();
      }
      return user;
   }
}
