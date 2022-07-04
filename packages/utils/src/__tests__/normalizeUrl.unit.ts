import { normalizeUrl } from '../normalizeUrl';

describe(
	'normalizeUrl',
	() => {
		it(
			'传入http://a，返回http://a',
			() => {
				expect(normalizeUrl('http://a')).toBe('http://a');
			},
		);

		it(
			'传入https://a，返回https://a',
			() => {
				expect(normalizeUrl('https://a')).toBe('https://a');
			},
		);

		it(
			'传入a，返回http://a',
			() => {
				expect(normalizeUrl('a')).toBe('http://a');
			},
		);

		it(
			'当协议是https时，传入a，返回https://a',
			() => {
				jsdom.reconfigure({ url: 'https://xx' });
				expect(normalizeUrl('a')).toBe('https://a');
			},
		);
	},
);
