import { Controller, Get, Req, Res } from '@nestjs/common';
import { TokenService } from 'src/auth/auth.service';
import { DemoService } from 'src/demo/demo.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Request, Response } from 'express';

@Controller('demo')
export class DemoController {
    constructor(
        private demoService: DemoService,
        private prismaService: PrismaService,
    ) {}

    @Get()
    async getDemo(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user, refreshToken, accessToken } =
            await this.demoService.resolveDemoUser(
                req.cookies['refresh_token'] || '',
            );

        res.cookie('refresh_token', refreshToken, { httpOnly: true });

        return { user, accessToken };
    }

    @Get('new')
    async getNewDemo(@Res() res: Response) {
        const { accessToken, refreshToken, user } =
            await this.demoService.resolveNewDemoUser();

        res.cookie('refresh_token', refreshToken, { httpOnly: true });

        return { user, accessToken };
    }
}
