/**
 *
 * @param condition 循环终止条件函数，返回 boolean
 * @param callback 循环动作
 * @param time 循环间隔，最小值 16ms，默认 1000ms
 * @returns
 */
export function repeatAction(condition: () => boolean, callback: () => unknown, time = 1000) {
	let timer: NodeJS.Timer;

	return { run, stop };

	async function run() {
		if (!condition()) {
			return;
		}

		await callback();

		timer = setTimeout(run, Math.max(16, time));
	}

	function stop() {
		clearTimeout(timer);
	}
}
