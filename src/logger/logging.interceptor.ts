import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { CustomLogger } from './custom-logger.service';

// add this line in eslintconfig
// '@typescript-eslint/no-unsafe-assignment': 'warn',

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const {
      method,
      originalUrl,
      headers,
      body,
    }: {
      method: string;
      originalUrl: string;
      headers: Record<string, unknown>;
      body: unknown;
    } = request;
    // Log the incoming request
    this.logger.log(
      JSON.stringify({
        method,
        path: originalUrl,
        headers,
        body,
      }),
      'Request',
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((data: unknown) => {
        const { statusCode } = response;
        const responseTime = Date.now() - now;

        // Log the outgoing response
        this.logger.log(
          JSON.stringify({
            method,
            path: originalUrl,
            statusCode,
            responseTime: `${responseTime}ms`,
            responseBody: data,
          }),
          'Response',
        );
      }),
      catchError(
        (error: { status?: number; message: string; stack: string }) => {
          const responseTime = Date.now() - now;
          const statusCode = error.status || 500;

          // Log the error
          this.logger.error(
            JSON.stringify({
              method,
              path: originalUrl,
              statusCode,
              responseTime: `${responseTime}ms`,
              error: error.message,
              stack: error.stack,
            }),
            error.stack,
            'Error',
          );

          return throwError(() => error);
        },
      ),
    );
  }
}
