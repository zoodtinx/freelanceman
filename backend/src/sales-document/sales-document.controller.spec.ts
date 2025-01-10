import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentController } from './sales-document.controller';
import { SalesDocumentService } from './sales-document.service';

describe('SalesDocumentController', () => {
  let controller: SalesDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDocumentController],
      providers: [SalesDocumentService],
    }).compile();

    controller = module.get<SalesDocumentController>(SalesDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
