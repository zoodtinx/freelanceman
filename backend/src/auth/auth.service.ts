
import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/auth/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalAuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            id: user.id,
            email: user.email,
        };
    }

    async register(email: string, password: string, displayName: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('Username already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            displayName,
            password: hashedPassword,
        };

        this.prismaService.user.create({
            data: newUser,
        });

        const payload = { email: newUser.email };
        const access_token = this.jwtService.sign(payload);

        return { access_token, user: payload };
    }

    async login(req: any) {
        const user = req.user;

        const accessTokenString = this.jwtService.sign(
            {
                sub: user.id,
                role: user.role,
            },
            {
                expiresIn: '15m',
                secret: this.configService.get('JWT_SECRET'),
            },
        );

        const refreshTokenData = {
            userId: user.id,
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        };

        const refreshTokenRecord = await this.prismaService.refreshToken.create(
            {
                data: refreshTokenData,
            },
        );

        const refreshTokenString = this.jwtService.sign(
            {
                sub: refreshTokenRecord.id,
            },
            {
                expiresIn: '14d',
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            },
        );

        return {
            accessTokenString,
            refreshTokenString,
            user,
        };
    }
}

@Injectable()
export class TokenService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateAccessToken(payload: AccessTokenPayload) {
        const user = await this.prismaService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }

    async validateRefreshToken(payload: RefreshTokenPayload) {
        const tokenId = payload.sub;

        const storedToken = await this.prismaService.refreshToken.findUnique({
            where: { id: tokenId },
            include: {
                user: true,
            },
        });

        if (!storedToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (storedToken.expiresAt < new Date()) {
            await this.prismaService.refreshToken.delete({
                where: { id: tokenId },
            });
            throw new UnauthorizedException('Refresh token expired');
        }

        return storedToken.user;
    }

    async refreshAccessToken(req: any) {
        const user = req.user;
        if (!user) throw new UnauthorizedException('User not authenticated');

        const refreshTokenString = req.body.refreshToken;

        const refreshTokenPayload = this.jwtService.verify(refreshTokenString, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

        const storedToken = await this.prismaService.refreshToken.findUnique({
            where: { id: refreshTokenPayload.sub },
        });

        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        await this.prismaService.refreshToken.delete({
            where: { id: storedToken.id },
        });

        const accessToken = this.jwtService.sign(
            { sub: user.id, role: user.role },
            {
                expiresIn: '15m',
                secret: this.configService.get('JWT_SECRET'),
            },
        );

        const newRefreshToken = this.jwtService.sign(
            { sub: user.id },
            {
                expiresIn: '7d',
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            },
        );

        await this.prismaService.refreshToken.create({
            data: {
                id: refreshTokenPayload.sub,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return { accessToken, refreshToken: newRefreshToken, user };
    }
}

@Injectable()
export class GoogleOAuthService {}
