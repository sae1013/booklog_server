import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const options = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  } as CorsOptions;
  const app = await NestFactory.create(AppModule);
  app.enableCors(options);
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
