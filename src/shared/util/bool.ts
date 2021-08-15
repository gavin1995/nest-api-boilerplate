/**
 * 是否包含汉字
 * @param data 需要判断的字符串
 */
export const isContainsChinese = (data: string) => /.*[\u4e00-\u9fa5]+.*$/.test(data);
