import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
   id: string;
   name?: string;
   status?: string;
   dueAt?: string;
   link?: string;
   details?: string;
   tags?: string[];
}
