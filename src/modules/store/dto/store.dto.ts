// store.dto.ts
import { IsString, IsOptional, IsObject, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  // @IsNotEmpty()
  // @IsString()
  // tenantId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}

export class UpdateSettingsDto {
  @IsObject()
  settings: Record<string, any>;
}

export class UpdateHoursDto {
  @IsObject()
  hours: Record<string, any>;
}

export class UpdateLayoutDto {
  @IsObject()
  layout: Record<string, any>;
}
