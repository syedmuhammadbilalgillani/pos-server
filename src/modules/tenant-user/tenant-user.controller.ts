import { Body, Controller, Post } from '@nestjs/common';
import { TenantUserService } from './tenant-user.service';
import { TenantLoginDto } from '../SuperAdminModules/tenant/dto/tenant.dto';

@Controller('tenant-user')
export class TenantUserController {
  constructor(private readonly tenantUserService: TenantUserService) {}
  @Post('login')
  login(@Body() TenantLoginDto: TenantLoginDto) {
    return this.tenantUserService.login(TenantLoginDto);
  }
 
}
