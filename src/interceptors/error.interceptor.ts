import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_MESSAGE, ErrorMessageMap, TError, defaultErrorMessageMap } from '@/shared/constant/error';
import { ERROR_MESSAGE_MAP } from '@/shared/constant/metadata-key';
import { type } from '@/shared/util';
import { SpecialException } from '@/exceptions/special.exception';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const target = context.getHandler();
    const controller = context.getClass();
    const errorMessageMap = this.reflector.get<ErrorMessageMap>(ERROR_MESSAGE_MAP, target)
      || this.reflector.get<ErrorMessageMap>(ERROR_MESSAGE_MAP, controller)
      || defaultErrorMessageMap;
    return next.handle().pipe(catchError(error => {
      // TODO: 本地暂时调试使用，需更换为logger的方式
      console.log(error);

      // Nest内置错误
      if (error instanceof HttpException) {
        const errorResponse: any = error.getResponse();
        const errorCode = error.getStatus() || HttpStatus.BAD_REQUEST;
        if (type.isString(errorResponse)) {
          return throwError(new HttpException(errorResponse, errorCode));
        }
        const errorMessage = Array.isArray(errorResponse.message) ? errorResponse.message[0] : errorResponse.message;
        return throwError(new HttpException(errorMessage, errorCode));
      } else if (error instanceof SpecialException) {
        // 应用直接抛出的特殊错误
        return throwError(new SpecialException({ status: error.getStatus(), message: error.message, code: error.getCode() }));
      }
      const errorMsg = errorMessageMap[error.name];
      // 非已知错误
      if (!errorMsg) return throwError(new HttpException(error.message || ERROR_MESSAGE, HttpStatus.BAD_REQUEST));
      if (type.isString(errorMsg)) {
        return throwError(new HttpException(errorMsg, HttpStatus.BAD_REQUEST));
      }
      return throwError(new SpecialException(errorMsg));
    }));
  }
}
