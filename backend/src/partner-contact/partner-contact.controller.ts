import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerContactService } from './partner-contact.service';
import { CreatePartnerContactDto } from './dto/create-partner-contact.dto';
import { UpdatePartnerContactDto } from './dto/update-partner-contact.dto';

@Controller('partner-contact')
export class PartnerContactController {
  constructor(private readonly partnerContactService: PartnerContactService) {}

  @Post()
  create(@Body() createPartnerContactDto: CreatePartnerContactDto) {
    return this.partnerContactService.create(createPartnerContactDto);
  }

  @Get()
  findAll() {
    return this.partnerContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerContactDto: UpdatePartnerContactDto) {
    return this.partnerContactService.update(+id, updatePartnerContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerContactService.remove(+id);
  }
}
