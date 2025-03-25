import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentItemsService } from '../sales-document-items.service';

describe('SalesDocumentItemsService', () => {
  let service: SalesDocumentItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesDocumentItemsService],
    }).compile();

    service = module.get<SalesDocumentItemsService>(SalesDocumentItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
