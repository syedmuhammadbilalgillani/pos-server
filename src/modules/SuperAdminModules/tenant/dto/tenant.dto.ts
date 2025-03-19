
  // tenant.dto.ts
  import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsObject,
    IsDate,
    IsString,
  } from 'class-validator';
  
  export class CreateTenantDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    contactEmail: string;
  
    @IsOptional()
    @IsString()
    contactPhone?: string;
  
    @IsNotEmpty()
    @IsString()
    subscriptionPlan: string;
  
    @IsNotEmpty()
    @IsString()
    dbConnectionString: string;
  
    @IsNotEmpty()
    @IsDate()
    subscriptionStartDate: Date;
  
    @IsNotEmpty()
    @IsDate()
    subscriptionEndDate: Date;
  }
  
  export class UpdateTenantDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    contactEmail?: string;
  
    @IsOptional()
    @IsString()
    contactPhone?: string;
  
    @IsOptional()
    @IsString()
    subscriptionPlan?: string;
  
    @IsOptional()
    @IsDate()
    subscriptionStartDate?: Date;
  
    @IsOptional()
    @IsDate()
    subscriptionEndDate?: Date;
  
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
    @IsOptional()
    @IsObject()
    settings?: Record<string, any>;
  }
  
  export class UpdateTenantSettingsDto {
    @IsNotEmpty()
    @IsObject()
    settings: Record<string, any>;
  }
  export class TenantLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  
  
  