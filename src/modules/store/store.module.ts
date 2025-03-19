import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schema/store.schema';
import { tenantModels } from '../../provider/tenantSchema.provider';
import { tenantConnectionProvider } from '../../provider/tenantDB.provider';
import { TenantUserModule } from '../tenant-user/tenant-user.module';
import { JwtHelper } from '../../helper/token.helper';

@Module({
  imports: [ConfigModule, TenantUserModule],
  controllers: [StoreController],
  providers: [
    JwtHelper,
    StoreService,
    tenantModels.storeModel,
    tenantConnectionProvider,
  ],
  exports: [JwtHelper, StoreService],
})
export class StoreModule {}
