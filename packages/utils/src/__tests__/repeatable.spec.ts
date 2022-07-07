import { beforeEach, expect, it, Mock, vi } from 'vitest';
import { repeatable } from '../repeatable';
import { sleep } from '../sleep';

let cb: Mock<any, any>, repeat: ReturnType<typeof repeatable>;

beforeEach(() => {
	let count = 0;
	cb = vi.fn();

	repeat =
		repeatable(
			() => {
				if (count >= 3) {
					return false;
				}
				count++;
				return true;
			},
			cb,
			16,
		);
},);

it(
	'重复 3 次后停止',
	async () => {
		repeat.run();

		await sleep(200);

		expect(cb).toHaveBeenCalledTimes(3);
	},
);

it(
	'调用 stop 后停止循环',
	async () => {
		repeat.run();

		await sleep(20);

		repeat.stop();

		expect(cb).toHaveBeenCalledTimes(2);
	},
);

it(
	'不调用 run 将不会开始',
	async () => {
		await sleep(100);

		expect(cb).not.toHaveBeenCalled();
	},
);
