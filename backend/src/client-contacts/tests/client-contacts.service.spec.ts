import { Test, TestingModule } from '@nestjs/testing';
import { ClientContactsService } from '../client-contacts.service';

describe('ClientContactsService', () => {
  let service: ClientContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientContactsService],
    }).compile();

    service = module.get<ClientContactsService>(ClientContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
