import { removeExtraSpaces } from '../removeExtraSpaces';

describe(
	'removeExtraSpaces',
	() => {
		test(
			"传入' abc   de f  gh  '",
			() => {
				expect(removeExtraSpaces(' abc   de f  gh  ')).toBe('abc de f gh');
			},
		);

		it(
			'传入undefined，返回空串',
			() => {
				expect(removeExtraSpaces()).toBe('');
			},
		);
	},
);
