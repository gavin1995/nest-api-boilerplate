import { TError } from '@/shared/constant/error';

/**
 * @author Gavin
 * @description 用于抛出前后端协定的特殊错误（code与status不同）
 * @example
 * throw new SpecialException(SPECIAL_ERRORS.FORCE_LOGIN); // 前端不展示错误信息，直接删除token跳转至登录页
 */
export class SpecialException extends Error {
  constructor(private readonly error: TError) {
    super();
    this.initMessage();
  }

  public initMessage() {
    this.message = this.error.message;
  }

  public getResponse(): string | object {
    return this.error.message;
  }

  public getStatus(): number {
    return this.error.status;
  }

  public getCode(): number {
    return this.error.code;
  }
}
