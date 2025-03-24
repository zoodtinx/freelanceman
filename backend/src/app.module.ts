import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { TasksModule } from './tasks/tasks.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from 'src/shared/database/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        AuthModule,
        ConfigModule,
        TasksModule,
        ClientsModule,
        PrismaModule,
        ProjectsModule,
        EventsModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
