import { Module } from '@nestjs/common';
import { PartnerContactsService } from './partner-contacts.service';
import { PartnerContactsController } from './partner-contacts.controller';

@Module({
  controllers: [PartnerContactsController],
  providers: [PartnerContactsService],
})
export class PartnerContactsModule {}
