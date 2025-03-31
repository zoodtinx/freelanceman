import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

Injectable();
export class EmailService {
    constructor(@Inject(ConfigService) private config: ConfigService) {}

    private transporter = nodemailer.createTransport({
        host: 'smtp-provider.com',
        port: 587,
        auth: {
            user: 'smtp-credential',
            pass: 'smtp-credential',
        },
    });

    async sendResetPasswordEmail(to: string, token: string) {
        const appUrl = this.config.get<string>('APP_URL');
        const resetLink = `${appUrl}/reset-password?token=${token}`;
        const html = `
        <p>You requested a password reset.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>If you didn’t request this, ignore this email.</p>
      `;

        try {
            await this.transporter.sendMail({
                from: '"Your App" <no-reply@example.com>',
                to,
                subject: 'Reset Your Password',
                html,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to send reset email',
            );
        }
    }
}
