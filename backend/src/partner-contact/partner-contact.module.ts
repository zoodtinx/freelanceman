import { Module } from '@nestjs/common';
import { PartnerContactService } from './partner-contact.service';
import { PartnerContactController } from './partner-contact.controller';

@Module({
  controllers: [PartnerContactController],
  providers: [PartnerContactService],
})
export class PartnerContactModule {}
