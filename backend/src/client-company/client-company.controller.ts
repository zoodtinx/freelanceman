import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientCompanyService } from './client-company.service';
import { CreateClientCompanyDto } from './dto/create-client-company.dto';
import { UpdateClientCompanyDto } from './dto/update-client-company.dto';

@Controller('client-company')
export class ClientCompanyController {
  constructor(private readonly clientCompanyService: ClientCompanyService) {}

  @Post()
  create(@Body() createClientCompanyDto: CreateClientCompanyDto) {
    return this.clientCompanyService.create(createClientCompanyDto);
  }

  @Get()
  findAll() {
    return this.clientCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientCompanyDto: UpdateClientCompanyDto) {
    return this.clientCompanyService.update(+id, updateClientCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientCompanyService.remove(+id);
  }
}
