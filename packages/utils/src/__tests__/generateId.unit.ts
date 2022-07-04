import { generateId } from '../generateId';

describe(
	'generateId',
	() => {
		it(
			'生成一个随机的8位字符串',
			() => {
				const randomId = generateId();

				expect(randomId.length).toBe(8);
			},
		);
	},
);
