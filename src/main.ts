import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/custom-logger.service';
// import { GlobalExceptionFilter } from './logger/global-exception.filter';

// Add this export function for Vercel serverless deployment
export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  await app.init();
  
  const expressInstance = app.getHttpAdapter().getInstance();
  return expressInstance(req, res);
}

// Keep your existing bootstrap function for local development
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new CustomLogger(),
    logger: ['error', 'warn'], // Reduce logging
    cors: true,
  });

  // try {
  //   // Create a Redis Microservice
  //   app.connectMicroservice<MicroserviceOptions>({
  //     transport: Transport.REDIS,
  //     options: {
  //       host: 'localhost',
  //       port: 6379,
  //       wildcards: true,
  //       retryAttempts: 5,
  //       retryDelay: 1000,
  //     },
  //   });

  //   await app.startAllMicroservices();
  //   console.log('Microservice is listening');
  // } catch (err) {
  //   console.error('Failed to start Redis microservice:', err);
  // }
  app.setGlobalPrefix('api/');

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Middleware for JSON and URL-encoded bodies
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // Start listening on the specified port
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Only call bootstrap when running directly (not as serverless)
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
