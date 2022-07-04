/**
 * 解析文件后缀
 * @param filename 文件名
 */
export function resolveFileExt(filename: string) {
	const ext = filename.includes('.') ? filename.split('.').pop() ?? '' : '';
	return ext.trim();
}

/**
 * 解析文件后缀并返回小写字符
 * @param filename 文件名
 * @returns
 */
export function resolveLowerFileExt(filename: string) {
	return resolveFileExt(filename).toLowerCase();
}
