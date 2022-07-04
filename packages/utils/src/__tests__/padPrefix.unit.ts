import { padPrefix } from '../padPrefix';

describe(
	'padPrefix',
	() => {
		it(
			'默认补前缀0',
			() => {
				expect(padPrefix('1', 2)).toBe('01');
				expect(padPrefix('0', 2)).toBe('00');
				expect(padPrefix('1', 3)).toBe('001');
			},
		);

		test(
			"传入前缀'xx'",
			() => {
				expect(padPrefix('1', 2, 'xx')).toBe('x1');
				expect(padPrefix('1', 3, 'xx')).toBe('xx1');
				expect(padPrefix('0', 1, 'xx')).toBe('0');
				expect(padPrefix('0', 2, 'xx')).toBe('x0');
			},
		);
	},
);
