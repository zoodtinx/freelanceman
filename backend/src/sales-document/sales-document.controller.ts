import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesDocumentService } from './sales-document.service';
import { CreateSalesDocumentDto } from './dto/create-sales-document.dto';
import { UpdateSalesDocumentDto } from './dto/update-sales-document.dto';

@Controller('sales-document')
export class SalesDocumentController {
  constructor(private readonly salesDocumentService: SalesDocumentService) {}

  @Post()
  create(@Body() createSalesDocumentDto: CreateSalesDocumentDto) {
    return this.salesDocumentService.create(createSalesDocumentDto);
  }

  @Get()
  findAll() {
    return this.salesDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesDocumentDto: UpdateSalesDocumentDto) {
    return this.salesDocumentService.update(+id, updateSalesDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesDocumentService.remove(+id);
  }
}
