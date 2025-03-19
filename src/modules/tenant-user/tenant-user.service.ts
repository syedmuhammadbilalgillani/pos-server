import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { JwtHelper } from 'src/helper/token.helper';
import { TokenService } from 'src/helper/token.service';
import { TenantLoginDto } from '../SuperAdminModules/tenant/dto/tenant.dto';
import {
  Tenant,
  TenantDocument,
} from '../SuperAdminModules/tenant/schema/tenant.schema';
import { TenantUserSchema } from './schema/tenant-user.schema';

@Injectable()
export class TenantUserService {
  private readonly jwtHelper: JwtHelper;

  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    //  @InjectModel(TenantUser.name) private TenantUserModel: Model<TenantUser>,
    @InjectConnection() private readonly connection: Connection, // Inject the Connection object
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService, // Inject TokenService
  ) {
    this.jwtHelper = new JwtHelper(this.configService);
  }
  async login(loginDto: TenantLoginDto) {
    // Find tenant by email
    const tenant = await this.tenantModel.findOne({
      contactEmail: loginDto.email,
    });
    if (!tenant) {
      throw new UnauthorizedException('Tenant does not exist.');
    }

    // Connect to tenant's database
    const tenantDb = this.connection.useDb(tenant.dbConnectionString, {
      useCache: true,
    });

    // Get TenantUser model
    const TenantUserModel = tenantDb.model('TenantUser', TenantUserSchema);

    // Find user by email
    const user = await TenantUserModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials.');
    }

    // // Verify password
    // const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    // if (!isPasswordValid) {
    //     throw new UnauthorizedException('Invalid password.');
    // }

    // Generate JWT token
    const payload = {
      sub: user._id,
      email: user.email,
      tenantId: tenant._id,
      dbConnectionString: tenant.dbConnectionString,
    };

    // Use the injected TokenService
    return {
      accessToken: this.tokenService.generateAccessToken(payload),
      //   tenant: {
      //     tenantId: tenant._id,
      //     name: tenant.name,
      //     email: tenant.contactEmail,
      //   },
    };
  }
}
