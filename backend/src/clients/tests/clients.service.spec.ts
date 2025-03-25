import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('ClientsService', () => {
    let clientService: ClientsService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientsService,
                ConfigService,
                {
                    provide: PrismaService,
                    useValue: {
                        client: {
                            findUnique: jest.fn(),
                            delete: jest.fn(),
                            deleteMany: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        clientService = module.get<ClientsService>(ClientsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    // it('should return correct client object structure', async () => {
    //     jest.spyOn(prismaService.client, 'findUnique').mockResolvedValue(
    //         mockQueriedClient,
    //     );
    //     await expect(
    //       clientService.findOne('mockAccessTokenPayload'),
    //   ).resolves.toEqual(mockProcessedClient);
    // });
});
