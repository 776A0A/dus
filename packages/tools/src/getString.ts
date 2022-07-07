/**
 * 获取字符串，处理可能出现的 undefined 或者 null
 * @param value
 * @param trim 是否要清楚前后空格，默认 true
 */
export function getString(value?: unknown, trim = true) {
  const _value = String(value ?? '')

  return trim ? _value.trim() : _value
}
