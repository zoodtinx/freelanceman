import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class DemoService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {}

    async resolveDemoUser(token?: string) {
        let accessToken;

        if (!token) {
            const user = await this.createDemoUser();
            const newToken = await this.authService.generateRefreshToken(
                user.id,
            );
            return { user, newRefreshToken: newToken };
        }

        try {
            const payload = this.authService.verifyRefreshToken(token);
            const user = await this.userService.findById(payload.sub);
            return { user };
        } catch {
            const user = await this.createDemoUser();
            const newToken = await this.authService.generateRefreshToken(
                user.id,
            );
            return { user, newRefreshToken: newToken, accessToken };
        }
    }
}
