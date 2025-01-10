import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentItemController } from './sales-document-item.controller';
import { SalesDocumentItemService } from './sales-document-item.service';

describe('SalesDocumentItemController', () => {
  let controller: SalesDocumentItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDocumentItemController],
      providers: [SalesDocumentItemService],
    }).compile();

    controller = module.get<SalesDocumentItemController>(SalesDocumentItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
