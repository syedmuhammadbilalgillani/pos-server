import { Module } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { SuperAdminController } from './super_admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminSchema } from './schema/super_admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuperAdmin.name, schema: SuperAdminSchema },
    ]), //✅ Register the model
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
