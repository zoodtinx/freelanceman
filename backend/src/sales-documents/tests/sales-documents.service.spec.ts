import { Test, TestingModule } from '@nestjs/testing';
import { SalesDocumentsService } from './sales-documents.service';

describe('SalesDocumentsService', () => {
  let service: SalesDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesDocumentsService],
    }).compile();

    service = module.get<SalesDocumentsService>(SalesDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
