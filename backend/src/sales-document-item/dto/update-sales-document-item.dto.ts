import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesDocumentItemDto } from './create-sales-document-item.dto';

export class UpdateSalesDocumentItemDto extends PartialType(CreateSalesDocumentItemDto) {}
