import { Injectable } from '@nestjs/common';
import { CreateSalesDocumentItemDto } from './dto/create-sales-document-item.dto';
import { UpdateSalesDocumentItemDto } from './dto/update-sales-document-item.dto';

@Injectable()
export class SalesDocumentItemService {
  create(createSalesDocumentItemDto: CreateSalesDocumentItemDto) {
    return 'This action adds a new salesDocumentItem';
  }

  findAll() {
    return `This action returns all salesDocumentItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesDocumentItem`;
  }

  update(id: number, updateSalesDocumentItemDto: UpdateSalesDocumentItemDto) {
    return `This action updates a #${id} salesDocumentItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesDocumentItem`;
  }
}
