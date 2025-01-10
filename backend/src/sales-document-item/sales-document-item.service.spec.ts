import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentItemService } from './sales-document-item.service';

describe('SalesDocumentItemService', () => {
  let service: SalesDocumentItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesDocumentItemService],
    }).compile();

    service = module.get<SalesDocumentItemService>(SalesDocumentItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
