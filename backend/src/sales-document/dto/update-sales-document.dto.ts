import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesDocumentDto } from './create-sales-document.dto';

export class UpdateSalesDocumentDto extends PartialType(CreateSalesDocumentDto) {}
