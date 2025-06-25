import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/auth/types';
import { ConfigService } from '@nestjs/config';
import {
    GoogleOAuthPayload,
    RegisterUserDto,
    ResetPasswordDto,
    ResetPasswordRequestDto,
} from 'freelanceman-common';
import { EmailService } from 'src/shared/email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalAuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private emailService: EmailService,
    ) {}

    async checkAccess() {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });

        const isDev = process.env.NODE_ENV === 'development';

        const passwordsMatch = async (input: string, stored: string) => {
            // if (isDev) return input === stored;
            return bcrypt.compare(input, stored);
        };

        if (!user || !(await passwordsMatch(pass, user.password!))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            id: user.id,
            email: user.email,
        };
    }

    async register(registerUserDto: RegisterUserDto) {
        let user;
        try {
            const existingUser = await this.prismaService.user.findFirst({
                where: { email: registerUserDto.email },
            });

            if (existingUser) {
                throw new ConflictException(
                    'User with this email already exist',
                );
            }

            const hashedPassword = await bcrypt.hash(
                registerUserDto.password,
                10,
            );

            const newUser: any = {
                ...registerUserDto,
                password: hashedPassword,
            };

            user = await this.prismaService.user.create({
                data: newUser,
                select: {
                    id: true,
                    role: true,
                },
            });

            const accessToken = this.jwtService.sign(
                {
                    sub: user.id,
                    role: user.role,
                },
                {
                    expiresIn: this.configService.get(
                        'jwt.accessTokenExpiresIn',
                    ),
                    secret: this.configService.get('jwt.accessTokenSecret'),
                },
            );

            const refreshTokenRecord =
                await this.prismaService.refreshToken.upsert({
                    where: { userId: user.id },
                    update: {
                        expiresAt: new Date(
                            Date.now() + 30 * 24 * 60 * 60 * 1000,
                        ),
                    },
                    create: {
                        userId: user.id,
                        expiresAt: new Date(
                            Date.now() + 30 * 24 * 60 * 60 * 1000,
                        ),
                    },
                });

            return { accessToken, refreshToken: refreshTokenRecord };
        } catch (error) {
            await this.prismaService.user.delete({ where: { id: user?.id } });
        }
    }

    async login(req: any) {
        const user = req.user;

        const accessToken = this.jwtService.sign(
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
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            },
        );

        const refreshToken = refreshTokenRecord.id;

        return {
            accessToken,
            refreshToken,
        };
    }

    async logOut(req: any) {
        try {
            const user = req.user;

            await this.prismaService.refreshToken.deleteMany({
                where: {
                    userId: user.id,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to log out');
        }
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

            await this.emailService.sendResetPasswordEmail(
                'peerapon.klajing@gmail.com',
                '1234',
            );

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
        const refreshTokenData =
            await this.prismaService.refreshToken.findUnique({
                where: { id: oldRefreshToken },
                include: {
                    user: {
                        include: {
                            visitingStatus: true,
                        },
                    },
                },
            });

        if (!refreshTokenData) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (new Date(refreshTokenData?.expiresAt) < new Date()) {
            await this.prismaService.refreshToken.delete({
                where: { id: oldRefreshToken },
            });
            throw new UnauthorizedException('Expired refresh token');
        }

        const { user } = refreshTokenData;

        const newAccessToken = this.jwtService.sign(
            {
                sub: user.id,
                role: user.role,
            },
            {
                expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
                secret: this.configService.get('jwt.accessTokenSecret'),
            },
        );

        return { newAccessToken, newRefreshToken: refreshTokenData.id, user };
    }
}

@Injectable()
export class GoogleOAuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async login(dto: GoogleOAuthPayload) {
        const emailValue = dto.emails[0].value;

        try {
            let user;

            user = await this.prisma.user.findFirst({
                where: { email: emailValue },
                include: {
                    visitingStatus: true,
                },
            });

            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        email: emailValue,
                        displayName: `${dto.name.givenName} ${dto.name.familyName}`,
                    },
                });
            }

            const refreshToken = await this.prisma.refreshToken.upsert({
                where: { userId: user.id },
                update: {
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
                create: {
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            });

            const accessToken = this.jwt.sign(
                {
                    sub: user.id,
                    role: user.role,
                },
                {
                    expiresIn: this.config.get('jwt.accessTokenExpiresIn'),
                    secret: this.config.get('jwt.accessTokenSecret'),
                },
            );

            return {
                accessToken,
                refreshToken: refreshToken.id,
                user: {
                    id: user.id,
                    email: user.email,
                },
            };
        } catch (err) {
            throw new InternalServerErrorException(
                'Failed to login with Google',
            );
        }
    }
}
