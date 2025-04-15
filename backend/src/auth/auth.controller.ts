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
import { Request as ExpressRequest, Response } from 'express';
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
} from '@schemas';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
        private googleOAuthService: GoogleOAuthService,
        private configService: ConfigService,
    ) {}

    @UseGuards(JwtAccessTokenAuthGuard)
    @Post('check')
    checkAuth(@Req() req: Request) {
        return { user: { email: 'zoodtinx@gmail.com' } };
    }

    @Get('refresh')
    async refreshAccessToken(@Req() req: ExpressRequest, @Res() res: Response) {
        const refreshToken = req.cookies?.refreshToken;
        console.log('headers', req.headers);
        console.log('parsed cookie', req.cookies);

        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token found');
        }

        const refreshResult =
            await this.tokenService.refreshAccessToken(refreshToken);
        const { newAccessToken, newRefreshToken, user } = refreshResult;

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.json({ newAccessToken, user });
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UsePipes(new ZodValidationPipe(loginUserSchema))
    async login(@Req() req: Request, @Res() res: Response) {
        const loginResult = await this.localAuthService.login(req);
        const { accessTokenString, refreshTokenString, user } = loginResult;

        res.cookie('refreshToken', refreshTokenString, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.status(200);

        return res.json({ accessTokenString, user });
    }

    @Post('register')
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    async register(
        @Body() registerUserDto: RegisterUserDto,
        @Res() res: Response,
    ) {
        const result = await this.localAuthService.register(registerUserDto);
        return res.status(201).json(result);
    }

    @Post('reset-password-request')
    @HttpCode(200)
    async resetPasswordRequest(
        @Body(new ZodValidationPipe(resetPasswordRequestSchema))
        payload: ResetPasswordRequestDto,
    ) {
        const result = await this.localAuthService.resetPasswordRequest(payload)
        return { success: true }
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(
        @Body(new ZodValidationPipe(resetPasswordSchema))
        payload: ResetPasswordDto,
    ) {
        const result = await this.localAuthService.resetPassword(payload);
        return { success: true }
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleCallback(@Req() req: any, @Res() res: Response) {
        const dto = req.user;
        const { accessToken, refreshToken, user } =
            await this.googleOAuthService.login(dto);
        const redirectUrl = this.configService.get<string>('url.client');

        res.cookie('refreshToken', refreshToken.id, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.redirect(`${redirectUrl}/oauth-success?token=${accessToken}`);
    }
}
