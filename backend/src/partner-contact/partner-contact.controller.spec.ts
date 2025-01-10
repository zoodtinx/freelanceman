import { Test, TestingModule } from '@nestjs/testing';
import { PartnerContactController } from './partner-contact.controller';
import { PartnerContactService } from './partner-contact.service';

describe('PartnerContactController', () => {
  let controller: PartnerContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerContactController],
      providers: [PartnerContactService],
    }).compile();

    controller = module.get<PartnerContactController>(PartnerContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
