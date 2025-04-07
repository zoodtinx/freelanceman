import { Controller, Get, Req, Res } from '@nestjs/common';
import { DemoService } from 'src/demo/demo.service';
import { Request, Response } from 'express';

@Controller('demo')
export class DemoController {
    constructor(
        private demoService: DemoService,
    ) {}

    @Get()
    async resolveDemo(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) { 
        const oldRefreshToken = req.cookies?.['refresh_token'] ?? null

        const { user, refreshToken, accessToken } =
            await this.demoService.resolveDemoUser(oldRefreshToken);

        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.status(200).json({ user, accessToken });
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
