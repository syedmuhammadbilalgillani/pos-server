// DTOs
import { IsEmail, IsString } from 'class-validator';

export class RegisterSuperAdminDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  //   @IsStrongPassword()
  @IsString()
  passwordHash: string;
}

export class LoginSuperAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;
}
