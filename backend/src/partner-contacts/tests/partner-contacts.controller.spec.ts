import { Test, TestingModule } from '@nestjs/testing';
import { PartnerContactsController } from './partner-contacts.controller';
import { PartnerContactsService } from './partner-contacts.service';

describe('PartnerContactsController', () => {
  let controller: PartnerContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerContactsController],
      providers: [PartnerContactsService],
    }).compile();

    controller = module.get<PartnerContactsController>(PartnerContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
