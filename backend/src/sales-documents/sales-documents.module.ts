import { Module } from '@nestjs/common';
import { SalesDocumentsService } from './sales-documents.service';
import { SalesDocumentsController } from './sales-documents.controller';
import { S3Module } from 'src/shared/s3/s3.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [S3Module, FilesModule],
  controllers: [SalesDocumentsController],
  providers: [SalesDocumentsService],
})
export class SalesDocumentsModule {}
