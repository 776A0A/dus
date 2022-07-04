import { resolveFileExt, resolveLowerFileExt } from '../resolveFileExt';

describe(
	'resolveFileExt',
	() => {
		it(
			'传入123.mov，得到mov',
			() => {
				expect(resolveFileExt('123.mov')).toBe('mov');
			},
		);

		it(
			'传入123.pdf，得到pdf',
			() => {
				expect(resolveFileExt('123.pdf')).toBe('pdf');
			},
		);

		it(
			'传入123.x.pdf，得到pdf',
			() => {
				expect(resolveFileExt('123.x.pdf')).toBe('pdf');
			},
		);

		it(
			'传入123，得到undefined',
			() => {
				expect(resolveFileExt('123')).toBe('');
			},
		);

		it(
			'传入123.pdf  ，得到pdf',
			() => {
				expect(resolveFileExt('123.pdf  ')).toBe('pdf');
			},
		);

		it(
			'传入123..pdf, 得到pdf',
			() => {
				expect(resolveFileExt('123..pdf')).toBe('pdf');
			},
		);
	},
);

describe(
	'resolveLowerFileExt',
	() => {
		it(
			'将大写后缀转换为小写',
			() => {
				expect(resolveLowerFileExt('xx.RVT')).toBe('rvt');
			},
		);
	},
);
