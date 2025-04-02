import { Controller, Get, Req, Res } from '@nestjs/common';
import { TokenService } from 'src/auth/auth.service';
import { PrismaService } from 'src/shared/database/prisma.service';

@Controller('demo')
export class DemoController {
    constructor(
        private demoService: any,
        private prismaService: PrismaService,
    ) {}

    @Get()
    async getDemo(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user, newRefreshToken, accessToken } =
            await this.demoService.resolveDemoUser(
                req.cookies['refresh_token'],
            );
        
            res.cookie('refresh_token', newRefreshToken, { httpOnly: true });

        return { user, accessToken }; // Nest auto-serializes
    }
}
