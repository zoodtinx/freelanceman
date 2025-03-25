import { Test, TestingModule } from '@nestjs/testing';
import { PartnerCompanyController } from '../partner-companies.controller';
import { PartnerCompanyService } from '../partner-companies.service';

describe('PartnerCompanyController', () => {
  let controller: PartnerCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerCompanyController],
      providers: [PartnerCompanyService],
    }).compile();

    controller = module.get<PartnerCompanyController>(PartnerCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
