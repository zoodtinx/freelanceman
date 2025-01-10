import { Module } from '@nestjs/common';
import { ClientCompanyService } from './client-company.service';
import { ClientCompanyController } from './client-company.controller';

@Module({
  controllers: [ClientCompanyController],
  providers: [ClientCompanyService],
})
export class ClientCompanyModule {}
