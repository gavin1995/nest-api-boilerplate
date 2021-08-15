import { createHash } from 'crypto';

import * as base64 from './base64';
import cfg from '../../../config';

/**
 * MD5
 * @param data 需要MD5的字符串
 */
export const encode = (data: string): string => createHash('md5').update(data).digest('hex');

/**
 * 生成密码
 * @param password
 */
export const generatePassword = (password: string): string => encode(cfg.salt + base64.encode(password));
