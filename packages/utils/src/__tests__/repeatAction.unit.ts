import { sleep } from '../sleep';
import { repeatAction } from '../repeatAction';

let cb: jest.Mock<any, any>, repeat: ReturnType<typeof repeatAction>;

beforeEach(() => {
	let count = 0;
	cb = jest.fn();

	repeat =
		repeatAction(
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
