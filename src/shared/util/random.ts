/**
 * 生成随机数字
 * @param min 最小值，默认：1000
 * @param max 最大值，默认：9999
 */
export const generateInteger = (min: number = 1000, max: number = 9999): number =>  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 生成随机字符串
 * @param length 字符串长度，默认：6位
 */
export const generateString = (length: number = 6): string => {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let _str = '';
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * str.length);
    _str += str[rand];
  }
  return _str;
}

/**
 * 生成随机昵称
 * @param prefix 前缀，如：手机号后四位，默认随机生成
 */
export const generateNickname = (prefix: string = generateString(generateInteger(3, 8))): string => prefix + '_' + generateString(generateInteger(3,8));
