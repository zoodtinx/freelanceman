import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'src/config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
