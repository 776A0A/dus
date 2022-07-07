import { describe, expect, it } from 'vitest';
import { isElement, isNullable } from '../is';

describe(
	'isElement',
	() => {
		it(
			'当value不为元素时，返回false',
			() => {
				expect(isElement(1)).toBe(false);
			},
		);

		it(
			'当传入Node实例时，返回false',
			() => {
				expect(isElement(document.createComment('comment'))).toBe(false);
			},
		);

		it(
			'当传入元素时，返回true',
			() => {
				expect(isElement(document.createElement('div'))).toBe(true);
			},
		);
	},
);

describe(
	'isNullable',
	() => {
		it(
			'传入null，返回true',
			() => {
				expect(isNullable(null)).toBe(true);
			},
		);

		it(
			'传入undefined，返回true',
			() => {
				expect(isNullable(undefined)).toBe(true);
			},
		);

		it(
			'传入空串，返回false',
			() => {
				expect(isNullable('')).toBe(false);
			},
		);

		it(
			'传入NaN，返回false',
			() => {
				expect(isNullable(NaN)).toBe(false);
			},
		);

		it(
			'传入0，返回false',
			() => {
				expect(isNullable(0)).toBe(false);
			},
		);

		it(
			'传入false，返回false',
			() => {
				expect(isNullable(false)).toBe(false);
			},
		);
	},
);
