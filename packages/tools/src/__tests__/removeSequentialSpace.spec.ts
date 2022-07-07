import { describe, expect, it } from 'vitest';
import { removeSequentialSpace } from '../removeSequentialSpace';

describe(
	'removeSequentialSpace',
	() => {
		it(
			"传入' abc   de f  gh  '",
			() => {
				expect(removeSequentialSpace(' abc   de f  gh  ')).toBe('abc de f gh');
			},
		);

		it(
			'传入undefined，返回空串',
			() => {
				expect(removeSequentialSpace()).toBe('');
			},
		);
	},
);
