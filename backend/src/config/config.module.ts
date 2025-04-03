import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import * as Joi from 'joi';
import { validationSchema } from 'src/config/validation';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema: validationSchema,
            envFilePath:
                process.env.NODE_ENV === 'test'
                    ? '.env.test'
                    : '.env.development',
        }),
    ],
})
export class AppConfigModule {}
