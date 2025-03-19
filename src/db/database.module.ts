// src/db/database.module.ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { RedisModule } from './redis.module';

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/pos_super_admin_db')],
  exports: [MongooseModule],
})
export class DatabaseModule {}