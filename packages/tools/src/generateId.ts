/**
 * 生成随机 id
 * @param prefix - 自定义 id 前缀，默认空串
 */
export function generateId(prefix = '') {
	const id = `${prefix}${Number(Math.random().toString().slice(2, 10))}`;
	return id.padStart(8, '0');
}
