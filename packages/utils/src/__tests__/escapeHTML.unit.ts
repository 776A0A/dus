import { escapeHTML } from '../escapeHTML';
describe(
	'escapeHTML',
	() => {
		it(
			'转义 ',
			() => {
				expect(escapeHTML(' ')).toBe(' ');
			},
		);

		it(
			'转义xx',
			() => {
				expect(escapeHTML('xx')).toBe('xx');
			},
		);

		it(
			'转义&',
			() => {
				expect(escapeHTML('&')).toBe('&amp;');
			},
		);

		it(
			'转义<',
			() => {
				expect(escapeHTML('<')).toBe('&lt;');
			},
		);

		it(
			'转义>',
			() => {
				expect(escapeHTML('>')).toBe('&gt;');
			},
		);

		it(
			"转义'",
			() => {
				expect(escapeHTML("'")).toBe('&#x27;');
			},
		);

		it(
			'转义"',
			() => {
				expect(escapeHTML('"')).toBe('&quot;');
			},
		);

		it(
			'转义/',
			() => {
				expect(escapeHTML('/')).toBe('&#x2F;');
			},
		);

		it(
			'转义xx&&<  <>>" "\'\'//   ',
			() => {
				expect(escapeHTML('xx&&<  <>>" "\'\'//   ')).toBe(
					'xx&amp;&amp;&lt;  &lt;&gt;&gt;&quot; &quot;&#x27;&#x27;&#x2F;&#x2F;   ',
				);
			},
		);
	},
);
