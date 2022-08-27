require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // all REST API routes must start with 'api'
  app.setGlobalPrefix('api');

  // Enable Cross Origin Support
  app.enableCors({ origin: '*' });

  // enable use of ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger document builder for REST API testing
  const config = new DocumentBuilder()
    .setTitle('Supertal Nodejs Assignment')
    .setDescription('REST APIs for Nodejs assignment for various different entities.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();


