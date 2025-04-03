import { Module } from '@nestjs/common';
import { ClientContactService } from './client-contacts.service';
import { ClientContactsController } from './client-contacts.controller';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactService],
})
export class ClientContactsModule {}
