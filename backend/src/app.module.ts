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

@Module({
    imports: [
        AuthModule,
        AppConfigModule,
        TasksModule,
        ClientsModule,
        PrismaModule,
        ProjectsModule,
        EventsModule,
        ClientContactsModule,
        PartnerContactsModule,
        PartnerCompanyModule,
        SalesDocumentsModule,
        SalesDocumentItemsModule,
        FilesModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
