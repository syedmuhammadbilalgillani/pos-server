// src/logger/logging.module.ts
import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { GlobalExceptionFilter } from './global-exception.filter';
import { CustomLogger } from './custom-logger.service';

@Global()
@Module({
  providers: [
    CustomLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [CustomLogger],
})
export class LoggingModule {}
