import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from 'src/utils/logger.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors();
    app.use(helmet());
    app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
