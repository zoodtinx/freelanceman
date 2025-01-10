import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerContactDto } from './create-partner-contact.dto';

export class UpdatePartnerContactDto extends PartialType(CreatePartnerContactDto) {}
