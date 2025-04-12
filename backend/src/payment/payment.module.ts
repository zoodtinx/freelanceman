import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
    imports: [ProjectsModule],
    controllers: [PaymentsController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
