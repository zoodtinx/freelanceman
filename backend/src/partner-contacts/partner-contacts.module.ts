import { Module } from '@nestjs/common';
import { PartnerContactService } from './partner-contacts.service';
import { PartnerContactsController } from './partner-contacts.controller';

@Module({
  controllers: [PartnerContactsController],
  providers: [PartnerContactService],
})
export class PartnerContactsModule {}
