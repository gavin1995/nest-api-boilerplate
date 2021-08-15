import { createDecipheriv, createCipheriv } from 'crypto';

import cfg from '../../../config';

const aesKey = cfg.aes.key;
const aesIv = cfg.aes.iv;
const CLEAR_ENCODING = 'utf8';
const CIPHER_ENCODING = 'base64';
const ALGORITHM = 'aes-256-cbc';

/**
 * AES加密
 * @param data 需要加密的字符串
 * @param key 用于加/解密的key
 */
export const encrypt = (data: string, key: string = aesKey): string => {
  const cipherChunks = [];
  const cipher = createCipheriv(ALGORITHM, key, aesIv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, CLEAR_ENCODING, CIPHER_ENCODING));
  cipherChunks.push(cipher.final(CIPHER_ENCODING));
  return cipherChunks.join('');
}

/**
 * AES解密
 * @param data 需要解密的字符串
 * @param key 用于加/解密的key
 */
export const decrypt = (data: string, key: string = aesKey): string => {
  const cipherChunks = [];
  const decipher = createDecipheriv(ALGORITHM, key, aesIv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(data, CIPHER_ENCODING, CLEAR_ENCODING));
  cipherChunks.push(decipher.final(CLEAR_ENCODING));
  return cipherChunks.join('');
}
