import { Test, TestingModule } from '@nestjs/testing';
import { ClientCompanyService } from './client-company.service';

describe('ClientCompanyService', () => {
  let service: ClientCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCompanyService],
    }).compile();

    service = module.get<ClientCompanyService>(ClientCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
