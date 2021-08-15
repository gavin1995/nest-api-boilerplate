import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { HTTP_REQ_STATUS } from '@/interfaces/http.interface';
import { SpecialException } from '@/exceptions/special.exception';

@Catch(SpecialException)
export class SpecialExceptionFilter implements ExceptionFilter {
  catch(exception: SpecialException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getCode();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response
      .status(status)
      .json({ success: HTTP_REQ_STATUS.FAIL, code: code, message: message });
  }
}
