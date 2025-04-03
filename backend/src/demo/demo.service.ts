import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TokenService } from 'src/auth/auth.service';
import mockUserRecords from 'src/shared/database/mocks/mockUser';
import { PrismaService } from 'src/shared/database/prisma.service';
import { userExcludedFields } from 'src/shared/database/utils/omit-list';
import { ApiCreateDemoUserResponse } from 'src/shared/types/api-response.type';

@Injectable()
export class DemoService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private tokenService: TokenService,
        private configService: ConfigService,
    ) {}

    async createDemoUser(): Promise<Partial<User>> {
        let demoUser: any;
        try {
            demoUser = await this.prismaService.user.create({
                data: mockUserRecords[0],
                omit: userExcludedFields,
            });
            return demoUser;
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to create demo user`,
            );
        }
    }

    async createRefreshToken(user: any) {
        const refreshToken = await this.prismaService.refreshToken.create({
            data: {
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                userId: user.id,
            },
            select: { id: true },
        });
        return refreshToken.id;
    }

    async resolveNewDemoUser() {
        const demoUser = await this.createDemoUser();
        const newRefreshToken = await this.createRefreshToken(demoUser);
        const accessToken = this.jwtService.sign(
            { sub: demoUser.id, role: demoUser.role },
            {
                expiresIn: '15m',
                secret: this.configService.get('jwt.accessSecret'),
            },
        );

        return { user: demoUser, refreshToken: newRefreshToken, accessToken };
    }

    async resolveDemoUser(refreshToken?: string) {
        if (!refreshToken) {
            return await this.resolveNewDemoUser();
        }

        try {
            const result = await this.prismaService.refreshToken.findUnique({
                where: { id: refreshToken },
            });

            if (result.expiresAt && new Date(result.expiresAt) < new Date()) {
               throw new UnauthorizedException(
                  `Refresh token expired`,
              );
            }

            const user = await this.prismaService.user.findUnique({
                where: { id: result.userId },
                omit: userExcludedFields,
            });

            const accessToken = this.jwtService.sign(
                { sub: user.id, role: user.role },
                {
                    expiresIn: '15m',
                    secret: this.configService.get('jwt.accessSecret'),
                },
            );

            return {
                user,
                refreshToken,
                accessToken,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to resolve demo user`,
            );
        }
    }
}
