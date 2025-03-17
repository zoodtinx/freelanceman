import {
    Controller,
    Get,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
    ) {}

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Request() req: any) {
    //   return this.localAuthService.login(req.user)
    // }

    @Get('refresh')
    async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
        const refreshResult = await this.tokenService.refreshAccessToken(req);
        const { accessToken, refreshToken, user } = refreshResult;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.json({ accessToken, user });
    }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const loginResult = await this.localAuthService.login(req);
        const { accessTokenString, refreshTokenString, user } = loginResult;

        res.cookie('refreshToken', refreshTokenString, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.json({ accessTokenString, user });
    }

    @Post('register')
    async register(@Request() req: any) {
        return this.localAuthService.register;
    }
}
