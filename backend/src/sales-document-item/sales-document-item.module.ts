import { Module } from '@nestjs/common';
import { SalesDocumentItemService } from './sales-document-item.service';
import { SalesDocumentItemController } from './sales-document-item.controller';

@Module({
  controllers: [SalesDocumentItemController],
  providers: [SalesDocumentItemService],
})
export class SalesDocumentItemModule {}
