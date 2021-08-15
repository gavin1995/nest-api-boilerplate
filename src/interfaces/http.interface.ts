import { ApiProperty } from '@nestjs/swagger';

export enum EHttpCode {
  Success = 200,
  Error = 400,
  Fatal = 500
}

export const HTTP_REQ_STATUS = {
  SUCCESS: true,
  FAIL: false,
}

export type ClassType<T = any> = new (...args: any[]) => T;

export interface IHttpResultPagination<T> {
  count: number;
  rows: T;
}

export function HttpResultPagination<T extends ClassType>(ResourceCls: T): any {
  class ResultPagination {
    @ApiProperty({ description: '总条数' })
    readonly count: number;

    @ApiProperty({ type: [ResourceCls], description: '当页数据' })
    readonly rows: Array<typeof ResourceCls>;
  }
  return ResultPagination;
}

export interface IHttpResponseBase {
  success: boolean;
  code: number;
}

export type THttpSuccessResponse<T> = IHttpResponseBase & {
  data: T | IHttpResultPagination<T>
}

export type THttpErrorResponse<T> = IHttpResponseBase & {
  message: string
}
