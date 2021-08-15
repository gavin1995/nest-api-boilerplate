import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HTTP_REQ_STATUS } from '@/interfaces/http.interface';
import { bool } from '@/shared/util';
import { StatusErrorMessage } from '@/shared/constant/error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    // 内置的HTTP异常类，不传入response会使用默认文案（如: "Bad Request"等），对国人不友好
    let message = bool.isContainsChinese(exception.message) ? exception.message : '';
    if (!message) {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          message = StatusErrorMessage.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          message = StatusErrorMessage.UNAUTHORIZED;
          break;
        default:
          message = StatusErrorMessage.UNKNOWN;
          break;
      }
    }

    response
      .status(status)
      .json({ success: HTTP_REQ_STATUS.FAIL, code: status, message: message });
  }
}
