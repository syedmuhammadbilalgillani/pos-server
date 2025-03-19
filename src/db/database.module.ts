// src/db/database.module.ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RedisModule } from './redis.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_SUPER_ADMIN_URI'),
            // Connection timeout settings
            connectTimeoutMS: 5000, // 5 seconds connection timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            serverSelectionTimeoutMS: 5000, // 5 seconds server selection timeout
            // Additional performance optimizations
            maxPoolSize: 10, // Limit connection pool size
            minPoolSize: 1, // Maintain at least one connection
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}