import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sampleRate: 1.0,
  });

  const config = new DocumentBuilder()
    .setTitle("Haenu's GPT API")
    .setDescription('Open GPT APIs by Haenu')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ApiModule],
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(9900);
}
bootstrap();
