import { TError } from './error';

// 1000+ 用户相关
const FORCE_LOGIN: TError = {
  code: 1001,
  message: '请重新登录',
  status: 401,
};

// 1100+ 应用相关
const APP_FORCE_UPDATE: TError = {
  code: 1101,
  message: '应用需要更新',
  status: 200
}

// 用于返回code与status不能一样的错误，客户端对特殊code进行特殊处理，通常不会展示错误信息
export const SPECIAL_ERRORS = {
  FORCE_LOGIN, // 强制登录
  APP_FORCE_UPDATE, // APP强更
};
