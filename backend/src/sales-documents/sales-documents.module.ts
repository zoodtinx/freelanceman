import { Module } from '@nestjs/common';
import { SalesDocumentsService } from './sales-documents.service';
import { SalesDocumentsController } from './sales-documents.controller';

@Module({
  controllers: [SalesDocumentsController],
  providers: [SalesDocumentsService],
})
export class SalesDocumentsModule {}
