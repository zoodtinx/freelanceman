import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
