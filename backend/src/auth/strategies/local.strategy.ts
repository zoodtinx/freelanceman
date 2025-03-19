import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalAuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: LocalAuthService) {
      super({ usernameField: 'email' });
   }

   async validate(email: string, password: string): Promise<any> {
      return this.authService.validateUser(email, password);
   }   
}
