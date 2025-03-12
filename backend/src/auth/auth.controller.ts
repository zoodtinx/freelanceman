import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private localAuthService: LocalAuthService){}
  
  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req: any) {
  //   return this.localAuthService.login(req.user)
  // }

  @Post('register')
  async register(@Request() req: any) {
    return this.localAuthService.register
  }
}
