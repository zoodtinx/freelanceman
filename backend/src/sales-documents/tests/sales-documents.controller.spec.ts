import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentsController } from './sales-documents.controller';
import { SalesDocumentsService } from './sales-documents.service';

describe('SalesDocumentsController', () => {
  let controller: SalesDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDocumentsController],
      providers: [SalesDocumentsService],
    }).compile();

    controller = module.get<SalesDocumentsController>(SalesDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
