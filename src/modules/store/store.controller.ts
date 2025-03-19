// store.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { StoreService } from './store.service';
import {
  CreateStoreDto,
  UpdateStoreDto,
  UpdateSettingsDto,
  UpdateHoursDto,
  UpdateLayoutDto,
} from './dto/store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

// ... existing code ...
@Post()
create(@Body() createStoreDto: CreateStoreDto, @Req() req: Request & { tenantId: string }) {
  return this.storeService.create(req.tenantId, createStoreDto);
}
// ... existing code ...
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }

  @Get(':id/settings')
  getSettings(@Param('id') id: string) {
    return this.storeService.getSettings(id);
  }

  @Put(':id/settings')
  updateSettings(
    @Param('id') id: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.storeService.updateSettings(id, updateSettingsDto);
  }

  // @Get(':id/stats')
  // getStats(@Param('id') id: string) {
  //   return this.storeService.getStats(id);
  // }

  // @Get(':id/hours')
  // getHours(@Param('id') id: string) {
  //   return this.storeService.getHours(id);
  // }

  @Put(':id/hours')
  updateHours(@Param('id') id: string, @Body() updateHoursDto: UpdateHoursDto) {
    return this.storeService.updateHours(id, updateHoursDto);
  }

  // @Get(':id/layout')
  // getLayout(@Param('id') id: string) {
  //   return this.storeService.getLayout(id);
  // }

  @Put(':id/layout')
  updateLayout(
    @Param('id') id: string,
    @Body() updateLayoutDto: UpdateLayoutDto,
  ) {
    return this.storeService.updateLayout(id, updateLayoutDto);
  }
}
