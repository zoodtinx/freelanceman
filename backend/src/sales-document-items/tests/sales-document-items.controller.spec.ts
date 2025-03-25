import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentItemsController } from '../sales-document-items.controller';
import { SalesDocumentItemsService } from '../sales-document-items.service';

describe('SalesDocumentItemsController', () => {
  let controller: SalesDocumentItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDocumentItemsController],
      providers: [SalesDocumentItemsService],
    }).compile();

    controller = module.get<SalesDocumentItemsController>(SalesDocumentItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
