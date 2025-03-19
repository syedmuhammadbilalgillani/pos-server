import { Module } from '@nestjs/common';
import { TenantUserService } from './tenant-user.service';
import { TenantUserController } from './tenant-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantUser, TenantUserSchema } from './schema/tenant-user.schema';
import { Tenant, TenantSchema } from '../SuperAdminModules/tenant/schema/tenant.schema';
import { TokenService } from '../../helper/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: TenantUser.name, schema: TenantUserSchema },
    ]),  ],
  controllers: [TenantUserController],
  providers: [TenantUserService,TokenService],
})
export class TenantUserModule {}
