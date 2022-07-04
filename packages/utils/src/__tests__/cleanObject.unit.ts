import { cleanObject } from '../cleanObject';

describe(
	'cleanObject',
	() => {
		it(
			'清除空值、null和undefined',
			() => {
				const obj = {
					a: undefined,
					b: 1,
					c: null,
					d: 2,
					e: '',
				};

				expect(cleanObject(obj)).toEqual({ b: 1, d: 2 });
			},
		);

		it(
			'NaN、0、false不会清除',
			() => {
				const obj = {
					a: 1,
					b: NaN,
					c: 2,
					d: 0,
					f: false,
					e: undefined,
				};

				expect(cleanObject(obj)).toEqual({
					a: 1,
					b: NaN,
					c: 2,
					d: 0,
					f: false,
				},);
			},
		);

		it(
			'空格会被保留',
			() => {
				const obj = {
					a: ' ',
					b: 1,
				};

				expect(cleanObject(obj)).toEqual({
					a: ' ',
					b: 1,
				},);
			},
		);
	},
);
