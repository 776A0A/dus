/**
 * 填充前缀
 * @param str 需要填充的字符
 * @param targetLength 目标长度
 * @param prefix 填充的前缀，默认为 '0'
 */
export function padPrefix(str: StringOrNumber, targetLength: number, prefix = '0') {
	return String(str).padStart(targetLength, prefix);
}
