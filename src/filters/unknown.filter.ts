import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DEFAULT_ERROR_RESPONSE } from '@/shared/constant/error';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json(DEFAULT_ERROR_RESPONSE);
  }
}
