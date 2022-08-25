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

// Assumptions: 
// a track can have only single artist


/**
 * Admin Portal 
 * 
 * Users (id, name, username, roles: [], Favorites(one to one))
 * Artist (id, name, dateOfBirth, profile picture, Track.id(one to many), genres)
 * Track (id, title, duration(s), Artist.id(one to one), genre, releaseYear)
 * Album (id, title, Tracks i.e. Track.id (one to many), genre, releaseYear)
 * Favorites (id, User.id, Track.id | Album.id)
 */