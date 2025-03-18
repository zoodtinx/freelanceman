import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import * as Joi from 'joi';

@Module({
   imports: [NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
   })],
 })

 export class ConfigModule {}
