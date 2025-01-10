import { Injectable } from '@nestjs/common';
import { CreateSalesDocumentDto } from './dto/create-sales-document.dto';
import { UpdateSalesDocumentDto } from './dto/update-sales-document.dto';

@Injectable()
export class SalesDocumentService {
  create(createSalesDocumentDto: CreateSalesDocumentDto) {
    return 'This action adds a new salesDocument';
  }

  findAll() {
    return `This action returns all salesDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesDocument`;
  }

  update(id: number, updateSalesDocumentDto: UpdateSalesDocumentDto) {
    return `This action updates a #${id} salesDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesDocument`;
  }
}
