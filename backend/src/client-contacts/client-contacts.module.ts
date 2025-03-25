import { Module } from '@nestjs/common';
import { ClientContactsService } from './client-contacts.service';
import { ClientContactsController } from './client-contacts.controller';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactsService],
})
export class ClientContactsModule {}
