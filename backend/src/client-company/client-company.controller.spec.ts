import { Test, TestingModule } from '@nestjs/testing';
import { ClientCompanyController } from './client-company.controller';
import { ClientCompanyService } from './client-company.service';

describe('ClientCompanyController', () => {
  let controller: ClientCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCompanyController],
      providers: [ClientCompanyService],
    }).compile();

    controller = module.get<ClientCompanyController>(ClientCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
