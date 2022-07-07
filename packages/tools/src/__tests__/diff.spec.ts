import { describe, expect, it } from 'vitest';
import { diff } from '../diff';

describe(
	'diff',
	() => {
		it(
			'正确拿到不同的值',
			() => {
				expect(diff({ a: 1, b: 2 }, { a: 3, c: 4 })).toEqual({
					a: 3,
					c: 4,
				},);
			},
		);

		it(
			'值都相同时，返回空对象',
			() => {
				expect(diff({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({});
			},
		);

		describe(
			'自定义过滤器',
			() => {
				it(
					'未处理的将交给内部处理',
					() => {
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						expect(diff({ a: 1, b: 2 }, { a: 3 }, () => {})).toEqual({
							a: 3,
						},);
					},
				);

				it(
					'返回false的将被视为不同',
					() => {
						expect(diff({ a: 1 }, { a: 1 }, () => false)).toEqual({ a: 1 });
					},
				);

				it(
					'返回true的将是为相同',
					() => {
						expect(diff({ a: 1 }, { a: 2 }, () => true)).toEqual({});
					},
				);
			},
		);
	},
);
