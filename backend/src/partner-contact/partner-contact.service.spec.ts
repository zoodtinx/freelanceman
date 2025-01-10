import { Test, TestingModule } from '@nestjs/testing';
import { PartnerContactService } from './partner-contact.service';

describe('PartnerContactService', () => {
  let service: PartnerContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerContactService],
    }).compile();

    service = module.get<PartnerContactService>(PartnerContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
