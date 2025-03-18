import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigDebugService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
