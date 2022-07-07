/**
 * 随机概率
 * @param p  - 默认判断随机值是否小于 0.5，传入 1 返回 true，传入 0 返回 false
 */
export function probability(p = 0.5) {
	return p === 1
		? true
		: p === 0
			? false
			: Math.random() < p;
}
