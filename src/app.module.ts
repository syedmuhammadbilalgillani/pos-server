import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { LoggingModule } from './logger/logging.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { SuperAdminModule } from './modules/SuperAdminModules/super_admin/super_admin.module';
import { TenantModule } from './modules/SuperAdminModules/tenant/tenant.module';
import { TenantUserModule } from './modules/tenant-user/tenant-user.module';
import { StoreModule } from './modules/store/store.module';
import { JwtHelper } from './helper/token.helper';
import { TokenService } from './helper/token.service';

@Module({
  imports: [
    LoggingModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    SuperAdminModule,
    TenantModule,
    TenantUserModule,
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtHelper, TokenService],
  exports: [TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '/*path', method: RequestMethod.ALL }); // Use "*path" instead of ":path(*)"
  }
}
