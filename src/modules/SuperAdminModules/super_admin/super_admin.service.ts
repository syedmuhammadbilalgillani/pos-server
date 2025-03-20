import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import {
  LoginSuperAdminDto,
  RegisterSuperAdminDto,
} from './dto/super_admin.dto';
import { SuperAdmin, SuperAdminDocument } from './schema/super_admin.schema';
import { JwtHelper } from '../../../helper/token.helper';
import { PasswordHelper } from '../../..//helper/password.helper';

@Injectable()
export class SuperAdminService {
  private readonly jwtHelper: JwtHelper;

  constructor(
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdminDocument>,
    private readonly configService: ConfigService,
  ) {
    this.jwtHelper = new JwtHelper(this.configService);
  }

  async create(
    createSuperAdminDto: RegisterSuperAdminDto,
  ): Promise<{ user: any }> {
    const existingUser = await this.superAdminModel.findOne({
      email: createSuperAdminDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const { hash, salt } = PasswordHelper.hashPassword(
      createSuperAdminDto.passwordHash,
    );
    const superAdminUser = new this.superAdminModel({
      username: createSuperAdminDto.username,
      email: createSuperAdminDto.email,
      passwordHash: hash,
      passwordSalt: salt,
      isActive: true,
      lastLogin: new Date(),
      permissions: {},
    });

    await superAdminUser.save();
    return { user: superAdminUser };
  }

  async login(
    dto: LoginSuperAdminDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.superAdminModel.findOne({ email: dto.email });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = PasswordHelper.validatePassword(
      dto.password,
      user.passwordHash,
      user.passwordSalt,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user._id, email: user.email };
    return {
      accessToken: this.jwtHelper.generateAccessToken(payload),
      refreshToken: this.jwtHelper.generateRefreshToken(payload),
    };
  }

  // async logout(userId: string): Promise<{ message: string }> {
  //   // Implementation depends on token management (e.g., blacklist refresh tokens, maintain session store)
  //   return { message: 'User logged out successfully' };
  // }
}
