import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from 'src/config/config.module';
import { TasksModule } from './tasks/tasks.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { ClientContactsModule } from './client-contacts/client-contacts.module';
import { PartnerContactsModule } from './partner-contacts/partner-contacts.module';
import { PartnerCompanyModule } from './partner-companies/partner-companies.module';
import { SalesDocumentsModule } from './sales-documents/sales-documents.module';
import { SalesDocumentItemsModule } from './sales-document-items/sales-document-items.module';
import { FilesModule } from './files/files.module';
import { CronJobsModule } from 'src/jobs/cron-job.module';
import { S3Module } from 'src/shared/s3/s3.module';
import { MailModule } from 'src/shared/email/email.module';
import { DemoModule } from 'src/demo/demo.module';

@Module({
    imports: [
        AppConfigModule,
        AuthModule,
        ClientContactsModule,
        ClientsModule,
        CronJobsModule,
        DemoModule,
        EventsModule,
        FilesModule,
        MailModule,
        PartnerCompanyModule,
        PartnerContactsModule,
        PrismaModule,
        ProjectsModule,
        S3Module,
        SalesDocumentItemsModule,
        SalesDocumentsModule,
        TasksModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
