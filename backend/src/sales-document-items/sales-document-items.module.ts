import { Module } from '@nestjs/common';
import { SalesDocumentItemsService } from './sales-document-items.service';
import { SalesDocumentItemsController } from './sales-document-items.controller';

@Module({
  controllers: [SalesDocumentItemsController],
  providers: [SalesDocumentItemsService],
})
export class SalesDocumentItemsModule {}
