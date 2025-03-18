import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { RegisterUserDto } from '@types';
import { Response } from 'express';
import { JwtRefreshTokenAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { LocalAuthService, TokenService } from 'src/auth/auth.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { registerUserSchema } from 'src/shared/zod-schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private localAuthService: LocalAuthService,
        private tokenService: TokenService,
    ) {}

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Get()
    checkAuth(@Req() req: Request ) {
      console.log('valid token')
    }

    @Get('refresh')
    async refreshAccessToken(@Req() req: any, @Res() res: Response) {
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
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        const result = await this.localAuthService.register(registerUserDto);
        return res.status(201).json(result);
    }
}
