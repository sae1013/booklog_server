import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const options = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  } as CorsOptions;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.enableCors(options);
  app.use(cookieParser());
  app.setViewEngine('hbs');

  await app.listen(8000);
}
bootstrap();
