/**
 * 移除首尾空格
 * @param data
 */
export const trim = (data: string): string => data.replace(/^\s+|\s+$/gm,'');

/**
 * 移除所有空格
 * @param data
 */
export const trimAll = (data: string): string => data.replace(/\s+/g,'');

/**
 * 获取手机号后{len}位
 * @param phoneNumber 手机号字符串
 * @param len 长度，默认：4
 */
export const getPhoneNumberEnd = (phoneNumber: string, len: number = 4): string => phoneNumber.substr(phoneNumber.length - len);

/**
 * 驼峰命名转下划线命名
 * @param data
 */
export const camelCaseToUnderScores = (data: string): string => data.replace(/\B([A-Z])/g, '_$1').toLowerCase();
