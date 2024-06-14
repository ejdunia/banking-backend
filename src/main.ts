import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    // the whitelist option enforces the createuserDto and removes any non specified input sent by the client, also the forbidnonwhitelisted sends an error if extra input is sent.
  );
  await app.listen(3000);
}

bootstrap();
