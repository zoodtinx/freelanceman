import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { Request as ExpressRequest, Request, Response } from 'express';
import {
    JwtAccessTokenAuthGuard,
    LocalAuthGuard,
} from 'src/auth/auth.guard';
import {
    GoogleOAuthService,
    LocalAuthService,
    TokenService,
} from 'src/auth/auth.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    loginUserSchema,
    RegisterUserDto,
    registerUserSchema,
    ResetPasswordDto,
    ResetPasswordRequestDto,
    resetPasswordRequestSchema,
    resetPasswordSchema,
} from 'freelanceman-common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { DemoService } from '@/demo/demo.service';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
        private googleOAuthService: GoogleOAuthService,
        private configService: ConfigService,
        private demoService: DemoService,
    ) {}

    @UseGuards(JwtAccessTokenAuthGuard)
    @Get('check')
    checkAuth() {
        return { ok: true };
    }

    @Get('refresh')
    async refreshAccessToken(@Req() req: ExpressRequest) {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing');
        }

        const refreshResult =
            await this.tokenService.refreshAccessToken(refreshToken);
        const { newAccessToken, newRefreshToken, user } = refreshResult;

        req.res?.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            priority: 'high',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        req.res?.json({ accessToken: newAccessToken, user });
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(loginUserSchema))
    async login(@Req() req: Request) {
        const loginResult = await this.localAuthService.login(req);
        const { accessToken, refreshToken, } = loginResult;

        req.res?.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            priority: 'high',
            domain: 'localhost',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken };
    }

    @UseGuards(AuthGuard('jwt-access'))
    @Get('logout')
    async logOut(@Req() req: Request) {
        await this.localAuthService.logOut(req);

        req.res?.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            domain: 'localhost',
            path: '/',
        });

        return;
    }

    @Post('register')
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    async register(
        @Body() registerUserDto: RegisterUserDto,
        @Req() req: Request,
    ) {
        const result = await this.localAuthService.register(registerUserDto);

        if (result) {
            const { accessToken, refreshToken } = result;
            req.res?.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                priority: 'high',
                domain: 'localhost',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return { accessToken };
        }
    }

    @Post('reset-password-request')
    @HttpCode(200)
    async resetPasswordRequest(
        @Body(new ZodValidationPipe(resetPasswordRequestSchema))
        payload: ResetPasswordRequestDto,
    ) {
        await this.localAuthService.resetPasswordRequest(payload);
        return { success: true };
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(
        @Body(new ZodValidationPipe(resetPasswordSchema))
        payload: ResetPasswordDto,
    ) {
        const result = await this.localAuthService.resetPassword(payload);
        return { success: true };
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleCallback(@Req() req: any, @Res() res: Response) {
        const dto = req.user;
        const { accessToken, refreshToken, user } =
            await this.googleOAuthService.login(dto);
        const redirectUrl = this.configService.get<string>('url.client');

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.redirect(`${redirectUrl}/home/projects`);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {}
}
