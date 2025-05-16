import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { OptionalUserAuthInterceptor } from './interceptors/auth.interceptor';
import * as expressEjsLayouts from 'express-ejs-layouts';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(expressEjsLayouts);
  app.set('layout', 'layouts/main');
  app.set('layout extractScripts', true);
  app.set('layout extractStyles', true);
  app.set('layout extractMetas', true);
  app.use(cookieParser());
  app.useGlobalInterceptors(app.get(OptionalUserAuthInterceptor));
  app.useGlobalPipes(new ValidationPipe());

  const configSevice = app.get(ConfigService);
  const port = +configSevice.get('port');
  await app.listen(port);
}
bootstrap();
