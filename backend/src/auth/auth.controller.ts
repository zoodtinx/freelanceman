import { mockUser } from 'src/auth/mockData';
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Res,
    UnauthorizedException,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { RegisterUserDto } from '@types';
import { Request as ExpressRequest, Response } from 'express';
import {
    JwtAccessTokenAuthGuard,
    JwtRefreshTokenAuthGuard,
    LocalAuthGuard,
} from 'src/auth/auth.guard';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
    loginUserSchema,
    refreshTokenSchema,
    registerUserSchema,
    ResetPasswordDto,
    ResetPasswordRequestDto,
    resetPasswordRequestSchema,
    resetPasswordSchema,
} from 'src/shared/zod-schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
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

        return res.json({ newAccessToken, user });
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
    async resetPasswordRequest(
        @Body(new ZodValidationPipe(resetPasswordRequestSchema))
        payload: ResetPasswordRequestDto,
    ) {
        return this.localAuthService.resetPasswordRequest(payload);
    }

    @Post('reset-password')
    async resetPassword(
        @Body(new ZodValidationPipe(resetPasswordSchema))
        payload: ResetPasswordDto,
    ) {
        return this.localAuthService.resetPassword(payload);
    }
    
    
    @Get('google')
    async loginWithGoogle(
        @Body(new ZodValidationPipe(resetPasswordSchema))
        payload: ResetPasswordDto,
    ) {
        return this.googleService.login();
    }
}
