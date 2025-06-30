import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // если используешь cookie / авторизацию
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Market API')
    .setDescription('Market API Documentation')
    .setVersion('1..0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
