import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    HttpCode,
    Req,
} from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ProjectFilterDto, projectFilterSchema } from 'freelanceman-common';

@UseGuards(AuthGuard('jwt-access'))
@Controller('payment')
export class PaymentsController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('search')
    @HttpCode(200)
    findMany(
        @Body(new ZodValidationPipe(projectFilterSchema))
        payload: ProjectFilterDto,
        @Req() req: any,
    ) {
        const userId = req.user.id;
        return this.paymentService.getPaymentData(userId, payload);
    }

    @Get('stats')
    findOne(@Param('id') paymentId: string, @Req() req: any) {
        const userId = req.user.id;
        return this.paymentService.getPaymentStats(userId);
    }
}
