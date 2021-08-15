import { HttpStatus } from '@nestjs/common';
import { HTTP_REQ_STATUS } from '@/interfaces/http.interface';

export type TError = {
  code: number;
  message: string;
  status: number;
};

export type TErrorResponse = {
  success: boolean;
  code: number;
  message: string;
};

export type ErrorMessageMap = {
  SequelizeUniqueConstraintError?: string | TError;
};

export const ERROR_MESSAGE = '未知错误，请重试';

export const DEFAULT_ERROR_RESPONSE: TErrorResponse = {
  success: HTTP_REQ_STATUS.FAIL,
  code: HttpStatus.BAD_REQUEST,
  message: ERROR_MESSAGE,
};

export const SEQUELIZE_UNIQUE_CONSTRAINT_ERROR: TErrorResponse = {
  success: HTTP_REQ_STATUS.FAIL,
  code: HttpStatus.BAD_REQUEST,
  message: '已存在',
};

export const defaultErrorMessageMap = {
  SequelizeUniqueConstraintError: '已存在',
};

export enum StatusErrorMessage {
  BAD_REQUEST = '未知错误，请重试',
  UNAUTHORIZED = '权限不足',
  UNKNOWN = '未知错误，请重试',
}

export enum TemplateError {
  NAME_UNIQUE = 'name已存在，不能重复',
  PACKAGE_NAME_UNIQUE = 'packageName已存在，不能重复',
}

export enum AppPageError {
  NAME_UNIQUE = 'name已存在，不能重复',
  ROUTE_UNIQUE = 'route已存在，不能重复',
}
