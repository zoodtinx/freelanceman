import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from 'src/utils/logger.interceptor';
import { LoggingExceptionFilter } from 'src/utils/logging.filter';
import { DelayInterceptor } from '@/utils/depay.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
          origin: 'https://freelanceman.peerapol.dev',

        credentials: true,
    });
    app.use(helmet());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new LoggingExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
