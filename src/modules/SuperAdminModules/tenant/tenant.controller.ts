import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDto, TenantLoginDto } from './dto/tenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create_tenant(createTenantDto);
  }
  @Post('login')
  login(@Body() TenantLoginDto: TenantLoginDto) {
    return this.tenantService.login(TenantLoginDto);
  }


}
