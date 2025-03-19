import { Body, Controller, Post } from '@nestjs/common';
import { LoginSuperAdminDto, RegisterSuperAdminDto } from './dto/super_admin.dto';
import { SuperAdminService } from './super_admin.service';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('')
  create(@Body() createSuperAdminDto: RegisterSuperAdminDto) {
    return this.superAdminService.create(createSuperAdminDto);
  }
  @Post('/login')
  login(@Body() createSuperAdminDto: LoginSuperAdminDto) {
    return this.superAdminService.login(createSuperAdminDto);
  }
}
