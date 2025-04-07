import { Resend } from 'resend';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get<string>('resend.apiKey'));
  }

  async sendResetPasswordEmail(to: string, token: string) {
    const appUrl = this.config.get<string>('APP_URL');
    const resetLink = `${appUrl}/reset-password?token=${token}`;
    const html = `
      <p>You requested a password reset.</p>
      <p><a href="${resetLink}">Click here to reset your password</a></p>
      <p>If you didn’t request this, ignore this email.</p>
    `;

    try {
      await this.resend.emails.send({
        from: this.config.get<string>('resend.emailAddress'),
        to,
        subject: 'Reset Your Password',
        html,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to send reset email');
    }
  }
}