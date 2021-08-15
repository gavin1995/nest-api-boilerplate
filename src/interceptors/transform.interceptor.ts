import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { THttpSuccessResponse, EHttpCode, HTTP_REQ_STATUS } from '@/interfaces/http.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, THttpSuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<THttpSuccessResponse<T>> {
    return next.handle().pipe(
      map(data => ({ success: HTTP_REQ_STATUS.SUCCESS, code: EHttpCode.Success, data }))
    );
  }
}
