import { v4 as uuidv4 } from 'uuid';
// import { seedDemoUser } from '@/shared/database/seed-demo-user-data';
import { seedDemoUser } from '@/demo/helpers/seed-user-data/seed-demo-user';
import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { userExcludedFields } from 'src/shared/database/utils/omit-list';
import { S3Service } from '@/shared/s3/s3.service';

@Injectable()
export class DemoService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private configService: ConfigService,
    ) {}

    async createFullDemoUser() {
        try {
            const s3Config = {
                accessKeyId: this.configService.get('aws.accessKeyId')!,
                secretAccessKey: this.configService.get('aws.secretAccessKey')!,
                region: this.configService.get('aws.region')!,
                bucket: this.configService.get('aws.bucket')!,
            };
            
            const result = await seedDemoUser(s3Config);
            return result;
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                `Failed to create demo user`,
            );
        }
    }

    async createBlankDemoUser() {
        try {
            const result = await this.prismaService.user.create({
                data: {
                    displayName: 'Pridi Johansson',
                    isDemo: true,
                    email: `user-${uuidv4()}@freelanceman.com`,
                    visitingStatus: {
                        create: {},
                    },
                },
                include: {
                    visitingStatus: true,
                },
            });

            return result;
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                `Failed to create demo user`,
            );
        }
    }

    async createRefreshToken(user: any) {
        let refreshToken;

        try {
            refreshToken = await this.prismaService.refreshToken.create({
                data: {
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    userId: user.id,
                },
                select: { id: true },
            });
            console.log('created refresh token');
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create refresh token',
            );
        }
        return refreshToken.id;
    }

    async resolveNewDemoUser() {
        let demoUser: any;
        let newRefreshToken: string;
        let accessToken: string;

        try {
            demoUser = await this.createFullDemoUser();
            newRefreshToken = await this.createRefreshToken(demoUser);
            console.log('signing access token');
            accessToken = this.jwtService.sign(
                { sub: demoUser.id, role: demoUser.role },
                {
                    expiresIn: '15m',
                    secret: this.configService.get('jwt.accessTokenSecret'),
                },
            );
            console.log('access token signed');
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to resolve new demo user',
            );
        }

        return { user: demoUser, refreshToken: newRefreshToken, accessToken };
    }

    async resolveBlankDemoUser() {
        let demoUser: any;
        let newRefreshToken: string;
        let accessToken: string;

        try {
            demoUser = await this.createBlankDemoUser();
            newRefreshToken = await this.createRefreshToken(demoUser);
            console.log('signing access token');
            accessToken = this.jwtService.sign(
                { sub: demoUser.id, role: demoUser.role },
                {
                    expiresIn: '15m',
                    secret: this.configService.get('jwt.accessTokenSecret'),
                },
            );
            console.log('access token signed');
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to resolve new demo user',
            );
        }

        return { user: demoUser, refreshToken: newRefreshToken, accessToken };
    }

    async resolveDemoUser(refreshToken?: string) {
        if (!refreshToken) {
            return await this.resolveNewDemoUser();
        }

        try {
            const token = await this.prismaService.refreshToken.findUnique({
                where: { id: refreshToken },
            });

            if (!token) {
                return await this.resolveNewDemoUser();
            }

            if (token.expiresAt && new Date(token.expiresAt) < new Date()) {
                throw new UnauthorizedException('Refresh token expired');
            }

            const user = await this.prismaService.user.findUnique({
                where: { id: token.userId },
                omit: userExcludedFields,
            });

            if (!user) {
                return await this.resolveNewDemoUser();
            }

            const accessToken = this.jwtService.sign(
                { sub: user.id, role: user.role },
                {
                    expiresIn: '15m',
                    secret: this.configService.get('jwt.accessTokenSecret'),
                },
            );

            return {
                user,
                refreshToken,
                accessToken,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }

            console.log('error', error);
            throw new InternalServerErrorException(
                'Failed to resolve demo user',
            );
        }
    }
}
