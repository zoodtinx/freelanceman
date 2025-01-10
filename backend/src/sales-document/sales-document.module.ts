import { Module } from '@nestjs/common';
import { SalesDocumentService } from './sales-document.service';
import { SalesDocumentController } from './sales-document.controller';

@Module({
  controllers: [SalesDocumentController],
  providers: [SalesDocumentService],
})
export class SalesDocumentModule {}
