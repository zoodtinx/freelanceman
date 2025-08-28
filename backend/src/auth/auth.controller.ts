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
import { JwtAccessTokenAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import {
    GoogleOAuthService,
    LocalAuthService,
    TokenService,
} from 'src/auth/auth.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    loginDtoSchema,
    RegisterUserDto,
    registerUserDtoSchema,
    ResetPasswordDto,
    resetPasswordDtoSchema,
    ResetPasswordRequestDto,
} from 'freelanceman-common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { DemoService } from '@/demo/demo.service';
import { setRefreshTokenCookie, clearRefreshTokenCookie } from '@/auth/helper';

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
        const isProd = this.configService.get<string>('env') === 'production';

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing');
        }

        const { newAccessToken, newRefreshToken, user } =
            await this.tokenService.refreshAccessToken(refreshToken);

        setRefreshTokenCookie(req.res!, newRefreshToken, isProd);

        req.res?.json({ accessToken: newAccessToken, user });
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(loginDtoSchema))
    async login(@Req() req: Request) {
        const { accessToken, refreshToken } =
            await this.localAuthService.login(req);
        const isProd = this.configService.get<string>('env') === 'production';

        setRefreshTokenCookie(req.res!, refreshToken, isProd);

        return { accessToken };
    }

    @UseGuards(AuthGuard('jwt-access'))
    @Get('logout')
    async logOut(@Req() req: Request) {
        const isProd = this.configService.get<string>('env') === 'production';

        await this.localAuthService.logOut(req);

        clearRefreshTokenCookie(req.res!, isProd);
    }

    @Post('register')
    @UsePipes(new ZodValidationPipe(registerUserDtoSchema))
    async register(@Body() dto: RegisterUserDto, @Req() req: Request) {
        const result = await this.localAuthService.register(dto);
        if (result) {
            const isProd =
                this.configService.get<string>('env') === 'production';
            setRefreshTokenCookie(req.res!, result.refreshToken.id, isProd);
            return { accessToken: result.accessToken };
        }
    }

    @Post('reset-password-request')
    @HttpCode(200)
    async resetPasswordRequest(
        @Body(new ZodValidationPipe(resetPasswordDtoSchema))
        payload: ResetPasswordRequestDto,
    ) {
        await this.localAuthService.resetPasswordRequest(payload);
        return { success: true };
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(
        @Body(new ZodValidationPipe(resetPasswordDtoSchema))
        payload: ResetPasswordDto,
    ) {
        await this.localAuthService.resetPassword(payload);
        return { success: true };
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleCallback(@Req() req: any, @Res() res: Response) {
        const { refreshToken } = await this.googleOAuthService.login(req.user);
        const isProd = this.configService.get<string>('env') === 'production';
        const redirectUrl = this.configService.get<string>('url.client');

        console.log('redirectUrl', redirectUrl)

        setRefreshTokenCookie(res, refreshToken, isProd);

        res.redirect(`${redirectUrl}/home/projects`);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {}
}
