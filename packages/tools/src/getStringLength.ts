import { getString } from './getString'

/**
 * 对于字符串会 trim 后计算长度，对于 nullable 值回返回 0
 * @param value 任何值
 * @returns
 */
export function getStringLength(value?: unknown) {
  return getString(value).length
}
