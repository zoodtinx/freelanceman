import { Test, TestingModule } from '@nestjs/testing';
import { ClientContactsController } from '../client-contacts.controller';
import { ClientContactsService } from '../client-contacts.service';

describe('ClientContactsController', () => {
  let controller: ClientContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientContactsController],
      providers: [ClientContactsService],
    }).compile();

    controller = module.get<ClientContactsController>(ClientContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
