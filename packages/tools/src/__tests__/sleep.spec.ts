import { describe, expect, it } from 'vitest';
import { sleep } from '../sleep';

describe(
	'sleep',
	() => {
		it(
			'预计会在指定时间后往后执行',
			async () => {
				const TIME = 2000;

				const startTime = Date.now();

				await sleep(TIME);

				const endTime = Date.now();
				expect((endTime - startTime) >= TIME).toBe(true);
			},
		);
	},
);
