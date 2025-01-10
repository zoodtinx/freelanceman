import { Injectable } from '@nestjs/common';
import { CreatePartnerContactDto } from './dto/create-partner-contact.dto';
import { UpdatePartnerContactDto } from './dto/update-partner-contact.dto';

@Injectable()
export class PartnerContactService {
  create(createPartnerContactDto: CreatePartnerContactDto) {
    return 'This action adds a new partnerContact';
  }

  findAll() {
    return `This action returns all partnerContact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partnerContact`;
  }

  update(id: number, updatePartnerContactDto: UpdatePartnerContactDto) {
    return `This action updates a #${id} partnerContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnerContact`;
  }
}
