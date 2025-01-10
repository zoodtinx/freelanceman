import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesDocumentItemService } from './sales-document-item.service';
import { CreateSalesDocumentItemDto } from './dto/create-sales-document-item.dto';
import { UpdateSalesDocumentItemDto } from './dto/update-sales-document-item.dto';

@Controller('sales-document-item')
export class SalesDocumentItemController {
  constructor(private readonly salesDocumentItemService: SalesDocumentItemService) {}

  @Post()
  create(@Body() createSalesDocumentItemDto: CreateSalesDocumentItemDto) {
    return this.salesDocumentItemService.create(createSalesDocumentItemDto);
  }

  @Get()
  findAll() {
    return this.salesDocumentItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesDocumentItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesDocumentItemDto: UpdateSalesDocumentItemDto) {
    return this.salesDocumentItemService.update(+id, updateSalesDocumentItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesDocumentItemService.remove(+id);
  }
}
