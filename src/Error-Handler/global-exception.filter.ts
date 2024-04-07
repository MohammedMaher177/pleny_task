/* eslint-disable prettier/prettier */
// global-exception.filter.ts
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
      keyValue: exception.keyValue || null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
