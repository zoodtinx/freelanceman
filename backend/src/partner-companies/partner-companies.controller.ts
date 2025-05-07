import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { PartnerCompaniesService } from './partner-companies.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  createPartnerCompanySchema,
  editPartnerCompanySchema,
  partnerCompanyFilterSchema,
} from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('partner-companies')
export class PartnerCompaniesController {
  constructor(private readonly partnerCompaniesService: PartnerCompaniesService) {}

  @Post()
  create(
      @Body(new ZodValidationPipe(createPartnerCompanySchema)) createDto: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerCompaniesService.create(userId, createDto);
  }

  @Post('search')
  @HttpCode(200)
  findMany(
      @Body(new ZodValidationPipe(partnerCompanyFilterSchema)) payload: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerCompaniesService.findMany(userId, payload);
  }

  @Post('selections')
  @HttpCode(200)
  findSelections(
      @Body(new ZodValidationPipe(partnerCompanyFilterSchema)) payload: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerCompaniesService.findMany(userId, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
      const userId = req.user.id;
      return this.partnerCompaniesService.findOne(userId, id);
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body(new ZodValidationPipe(editPartnerCompanySchema)) payload: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerCompaniesService.update(userId, id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
      const userId = req.user.id;
      return this.partnerCompaniesService.delete(userId, id);
  }
}
