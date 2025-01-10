import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentService } from './sales-document.service';

describe('SalesDocumentService', () => {
  let service: SalesDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesDocumentService],
    }).compile();

    service = module.get<SalesDocumentService>(SalesDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
