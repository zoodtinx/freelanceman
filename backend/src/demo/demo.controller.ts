import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DemoService } from 'src/demo/demo.service';

@Controller('demo')
export class DemoController {
    constructor(
        private demoService: DemoService,
    ) {}

    @Get()
    async resolveDemo(
        @Req() req: Request,
    ) { 
        const oldRefreshToken = req.cookies?.['refresh_token'] ?? null

        const { user, refreshToken, accessToken } =
            await this.demoService.resolveDemoUser(oldRefreshToken);

        console.log('refreshToken', refreshToken);
        console.log('accessToken', accessToken);

        req.res?.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            priority: 'high',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        req.res?.json({ accessToken, user });
    }

    @Get('new')
    async getNewDemo(@Res() res: Response) {
        const { accessToken, refreshToken, user } =
            await this.demoService.resolveNewDemoUser();

        console.log('setting cookie')
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.status(200).json({ user, accessToken });
    }
}
