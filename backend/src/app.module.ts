import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { ClientCompanyModule } from './client-company/client-company.module';
import { ClientContactModule } from './client-contact/client-contact.module';
import { EventModule } from './event/event.module';
import { FileModule } from './file/file.module';
import { PartnerCompanyModule } from './partner-company/partner-company.module';
import { PartnerContactModule } from './partner-contact/partner-contact.module';
import { SalesDocumentModule } from './sales-document/sales-document.module';
import { SalesDocumentItemModule } from './sales-document-item/sales-document-item.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProjectModule,
    ClientCompanyModule,
    ClientContactModule,
    EventModule,
    FileModule,
    PartnerCompanyModule,
    PartnerContactModule,
    SalesDocumentModule,
    SalesDocumentItemModule,
    TaskModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
