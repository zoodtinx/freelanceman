import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  createPartnerContactSchema,
  searchPartnerContactSchema,
  updatePartnerContactSchema,
} from 'src/shared/zod-schemas/partner-contact.schema';
import { PartnerContactService } from 'src/partner-contacts/partner-contacts.service';

@UseGuards(AuthGuard('jwt-access'))
@Controller('partner-contacts')
export class PartnerContactsController {
  constructor(private readonly partnerContactsService: PartnerContactService) {}

  @Post()
  create(
      @Body(new ZodValidationPipe(createPartnerContactSchema))
      createPartnerDto: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerContactsService.create(userId, createPartnerDto);
  }

  @Post('search')
  @HttpCode(200)
  findMany(
      @Body(new ZodValidationPipe(searchPartnerContactSchema)) payload: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerContactsService.findAll(userId, payload);
  }

  @Get(':id')
  findOne(@Param('id') partnerId: string, @Req() req: any) {
      const userId = req.user.id;
      return this.partnerContactsService.findOne(userId, partnerId);
  }

  @Patch(':id')
  update(
      @Param('id') partnerId: string,
      @Body(new ZodValidationPipe(updatePartnerContactSchema))
      updatePartnerDto: any,
      @Req() req: any,
  ) {
      const userId = req.user.id;
      return this.partnerContactsService.update(
          userId,
          partnerId,
          updatePartnerDto,
      );
  }

  @Delete(':id')
  remove(@Param('id') partnerId: string, @Req() req: any) {
      const userId = req.user.id;
      return this.partnerContactsService.remove(userId, partnerId);
  }
}
