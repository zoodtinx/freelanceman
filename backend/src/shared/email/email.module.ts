// mail.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from 'src/shared/email/email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class MailModule {}
