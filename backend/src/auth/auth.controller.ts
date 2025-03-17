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
import { Response } from 'express';
import { JwtRefreshTokenAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
    ) {}

    @UseGuards(JwtRefreshTokenAuthGuard)
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

    @UseGuards(LocalAuthGuard)
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
