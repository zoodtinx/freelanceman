
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/auth/types';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto, ResetPasswordDto, ResetPasswordRequestDto } from 'src/shared/zod-schemas/user.schema';
import { EmailService } from 'src/shared/email/email.service';
import { GoogleUserDto } from 'src/shared/zod-schemas/auth.schema';

@Injectable()
export class LocalAuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private emailService: EmailService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            id: user.id,
            email: user.email,
        };
    }

    async register(registerUserDto: RegisterUserDto) {
        const existingUser = await this.prismaService.user.findFirst({
            where: { email: registerUserDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exist');
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

        const newUser: any = {
            ...registerUserDto,
            password: hashedPassword,
        };

        const result = await this.prismaService.user.create({
            data: newUser,
        });

        const payload = { email: result.email };
        const accessToken = this.jwtService.sign(payload);
        console.log('accessToken', accessToken);

        return { accessToken, user: payload };
    }

    async login(req: any) {
        const user = req.user;

        const accessTokenString = this.jwtService.sign(
            {
                sub: user.id,
                role: user.role,
            },
            {
                expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
                secret: this.configService.get('jwt.accessTokenSecret'),
            },
        );

        const refreshTokenRecord = await this.prismaService.refreshToken.upsert(
            {
                where: { userId: user.id },
                update: {
                    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                },
                create: {
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                },
            },
        );

        const refreshTokenString = this.jwtService.sign(
            {
                sub: refreshTokenRecord.id,
            },
            {
                expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
                secret: this.configService.get('jwt.refreshTokenSecret'),
            },
        );

        return {
            accessTokenString,
            refreshTokenString,
            user,
        };
    }

    async resetPasswordRequest(payload: ResetPasswordRequestDto) {
        const { email } = payload;
        try {
            const user = await this.prismaService.user.findFirst({
                where: { email },
            });

            if (!user) {
                throw new UnauthorizedException(
                    'User with this email does not exist',
                );
            }

            await this.emailService.sendResetPasswordEmail('peerapon.klajing@gmail.com', '1234');
            
            return;
        } catch (error) {
            throw new UnauthorizedException(
                'Failed to process password reset request',
            );
        }
    }

    async resetPassword(payload: ResetPasswordDto) {
        const { email, password } = payload;
        try {
            const user = await this.prismaService.user.findFirst({
                where: { email },
            });

            if (!user) {
                throw new UnauthorizedException(
                    'User with this email does not exist',
                );
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            console.log('hashedPassword', hashedPassword)

            await this.prismaService.user.update({
                where: { email },
                data: { password: hashedPassword },
            });

            return { message: 'Password reset successfully' };
        } catch (error) {
            throw new UnauthorizedException('Failed to reset password');
        }
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

    async refreshAccessToken(oldRefreshToken: any) {
        console.log('oldRefreshToken', oldRefreshToken)
        const refreshTokenData =
            await this.prismaService.refreshToken.findUnique({
                where: { id: oldRefreshToken },
                include: { user: true },
            });

        if (!refreshTokenData) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (refreshTokenData?.expiresAt < new Date()) {
            await this.prismaService.refreshToken.delete({
                where: { id: oldRefreshToken },
            });
            throw new UnauthorizedException('Expired refresh token');
        }

        await this.prismaService.refreshToken.delete({
            where: { id: oldRefreshToken },
        });

        const { user } = refreshTokenData;

        const newRefreshToken = await this.prismaService.refreshToken.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        const newAccessToken = this.jwtService.sign(
            { sub: user.id, role: user.role },
            {
                expiresIn: '15m',
                secret: this.configService.get('jwt.accessTokenSecret'),
            },
        );

        return { newAccessToken, newRefreshToken: newRefreshToken.id, user };
    }
}

@Injectable()
export class GoogleOAuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async login(dto: GoogleUserDto) {
        const { email, name, picture } = dto;

        try {
            let user;

            user = await this.prisma.user.findFirst({
                where: { email: email },
            });

            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        email: email,
                        displayName: name,
                        avatar: picture,
                    },
                });
            }

            const refreshToken = await this.prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });

            const accessToken = this.jwt.sign(
                { sub: user.id },
                {
                    secret: this.config.get('jwt.accessSecret'),
                    expiresIn: '15m',
                },
            );

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                },
            };
        } catch (err) {
            throw new InternalServerErrorException('Failed to login with Google');
        }
    }
}


