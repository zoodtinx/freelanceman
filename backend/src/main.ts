import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(helmet())
  app.use(cookieParser()); // Enable cookie-parser
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
