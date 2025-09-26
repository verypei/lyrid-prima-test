import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';
import { GlobalExceptionFilter } from './common/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import cors from "cors";
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:3000', // your frontend
    credentials: true,
  });
  const port = 5000
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true
  }));
  app.use('/uploads', express.static(join(__dirname, '..', 'src/assets')));
  await app.listen(port, () => {
    console.log(`--------------------------- SERVER RUNNING AT ${port}---------------------------`);
  });
}
bootstrap();
