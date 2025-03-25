import { Module } from '@nestjs/common';
import { PartnerCompaniesService } from './partner-companies.service';
import { PartnerCompaniesController } from './partner-companies.controller';

@Module({
  controllers: [PartnerCompaniesController],
  providers: [PartnerCompaniesService],
})
export class PartnerCompanyModule {}
