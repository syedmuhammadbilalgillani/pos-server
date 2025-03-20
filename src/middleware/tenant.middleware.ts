// import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// interface CustomRequest extends Request {
//   tenantId?: any;
// }import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Tenant } from 'src/modules/tenant/schema/tenant.schema';

// @Injectable()
// export class TenantMiddleware implements NestMiddleware {
//   constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

//   async use(req: CustomRequest, res: Response, next: NextFunction) {
//     const { dbConnectionString } = req.headers; // Tenant key from request headers

//     if (!dbConnectionString) {
//       throw new BadRequestException('Tenant Key is required');
//     }

//     const tenant = await this.tenantModel.findOne({ dbConnectionString });

//     if (!tenant) {
//       throw new BadRequestException('Invalid Tenant');
//     }

//     req.tenantId = tenant._id; // Store the tenant DB name in the request
//     next();
//   }
// }

// tenant.middleware.ts
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { TokenService } from '../helper/token.service';
import { Tenant } from '../modules/SuperAdminModules/tenant/schema/tenant.schema';
interface CustomRequest extends Request {
  tenantId?: any;
  dbConnectionString?: string;
}
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<Tenant>,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // Exclude certain routes from tenant middleware
    // let excludeRoutes;
    // if (process.env.NODE_ENV !== 'production') {
    // } else {
    //   excludeRoutes = ['/tenant', '/super-admin'];
    // }
    const excludeRoutes = ['/api/v1/tenant', '/api/v1/super-admin'];
    console.log(excludeRoutes, 'exludeRoutes');
    if (excludeRoutes.some((route: string) => req.path.startsWith(route))) {
      return next();
    }

    console.log(req.path);
    console.log('TenantMiddleware triggered');

    // Extract and validate the auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authorization header missing or invalid');
      throw new UnauthorizedException('Authorization token is required');
    }

    const token = authHeader.split(' ')[1];
    try {
      // Use the injected TokenService
      const result = this.tokenService.verifyToken(token);

      if (!result.valid || !result.decoded) {
        console.error(
          '[TenantMiddleware] Token verification failed:',
          result.error,
        );
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Type assertion - now safely accessing the decoded property that we know exists
      const decodedToken = result.decoded as any;

      if (!decodedToken.tenantId) {
        console.error(
          '[TenantMiddleware] Token payload missing tenantId:',
          decodedToken,
        );
        throw new BadRequestException('Token missing tenantId');
      }

      // Find the tenant
      const tenant = await this.tenantModel.findOne({
        _id: decodedToken.tenantId,
      });

      if (!tenant) {
        console.error(
          '[TenantMiddleware] Tenant not found for ID:',
          decodedToken.tenantId,
        );
        throw new BadRequestException('Invalid tenant');
      }

      // Set tenant info on request
      req.tenantId = tenant._id;
      req.dbConnectionString = tenant.dbConnectionString;

      console.log(
        '[TenantMiddleware] Middleware completed successfully for tenant:',
        tenant._id,
      );
      next();
    } catch (error) {
      console.error('[TenantMiddleware] Error:', error.message, error.stack);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
