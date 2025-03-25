import { Test, TestingModule } from '@nestjs/testing';
import { PartnerContactsService } from './partner-contacts.service';

describe('PartnerContactsService', () => {
  let service: PartnerContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerContactsService],
    }).compile();

    service = module.get<PartnerContactsService>(PartnerContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
