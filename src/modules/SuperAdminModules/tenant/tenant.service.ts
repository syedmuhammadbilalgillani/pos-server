import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateTenantDto, TenantLoginDto } from './dto/tenant.dto';
import { Tenant, TenantDocument } from './schema/tenant.schema';
import { JwtHelper } from 'src/helper/token.helper';
import { ConfigService } from '@nestjs/config';
import { TenantUserSchema } from 'src/modules/tenant-user/schema/tenant-user.schema';

@Injectable()
export class TenantService {
  private readonly jwtHelper: JwtHelper;

  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    @InjectConnection() private readonly connection: Connection, // Inject the Connection object
    private readonly configService: ConfigService,
  ) {
    this.jwtHelper = new JwtHelper(this.configService);
  }
  async create_tenant(createTenantDto: CreateTenantDto): Promise<Tenant> {
    try {
      console.log('Creating tenant:', createTenantDto);
  
      // Check for existing tenant
      const existingTenant = await this.tenantModel.findOne({
        $or: [
          { name: createTenantDto.name },
          { contactEmail: createTenantDto.contactEmail },
          { contactPhone: createTenantDto.contactPhone },
          // { subscriptionPlan: createTenantDto.subscriptionPlan },
          { dbConnectionString: createTenantDto.dbConnectionString },
        ],
      });
  
      if (existingTenant) {
        throw new Error('Tenant with provided details already exists');
      }
  
      const dbName = `${createTenantDto.dbConnectionString}`;
      const originalUri = 'mongodb://localhost:27017';
      const url = new URL(originalUri);
      url.pathname = `/${dbName}`;
      const dbUri = url.toString();
  
      const tenant = new this.tenantModel({
        ...createTenantDto,
        dbConnectionString: dbName,
      });
  
      await tenant.save();
  
      // Connect to the new database
      const tenantDb = this.connection.useDb(dbName, { useCache: true });
  
      // Create TenantUser model
      const TenantUserModel = tenantDb.model('TenantUser', TenantUserSchema);
  
      // Create admin user
      const adminUser = new TenantUserModel({
        name: 'Admin',
        email: createTenantDto.contactEmail,
        password: 'admin', // Hash in production
        isAdmin: true,
      });
  
      await adminUser.save();
  
      console.log(`Tenant ${createTenantDto.name} created with DB: ${dbUri}`);
      return tenant;
    } catch (error) {
      // if (error.code === 11000) {
      //   throw new Error('Duplicate key error: A tenant with this unique value already exists');
      // }
      console.error('Error creating tenant:', error);
      throw new Error('Tenant creation failed');
    }
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

    return {
      accessToken: this.jwtHelper.generateAccessToken(payload),
      tenant: {
        tenantId: tenant._id,
        name: tenant.name,
        email: tenant.contactEmail,
      },
    };
  }
}
