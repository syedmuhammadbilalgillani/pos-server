import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from '../../../helper/token.service';
import { Tenant, TenantSchema } from './schema/tenant.schema';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    ConfigModule,
     
  ], // Make sure this is imported  ],
  controllers: [TenantController],
  providers: [TenantService, TokenService],
  exports: [TokenService,MongooseModule],
})
export class TenantModule {}
