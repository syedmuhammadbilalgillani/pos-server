import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';

export const tenantDbProvider = {
  provide: 'TENANT_CONNECTION',
  useFactory: (
    request: { dbConnectionString?: string },
    connection: Connection,
  ) => {
    if (!request.dbConnectionString) {
      throw new InternalServerErrorException('DB Connection String is missing in request');
    }
    return connection.useDb(request.dbConnectionString, { useCache: true });
  },
  inject: [REQUEST, getConnectionToken()],
};