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
        // Connection timeouts to fail faster
        connectTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000,
        // Connection pool settings
        maxPoolSize: 10,
        minPoolSize: 1,
        // Important: Allow connections from anywhere (no IP whitelist)
        directConnection: false,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}