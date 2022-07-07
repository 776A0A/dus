import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../escapeHtml';

describe(
	'escapeHtml',
	() => {
		it(
			'转义 ',
			() => {
				expect(escapeHtml(' ')).toBe(' ');
			},
		);

		it(
			'转义xx',
			() => {
				expect(escapeHtml('xx')).toBe('xx');
			},
		);

		it(
			'转义&',
			() => {
				expect(escapeHtml('&')).toBe('&amp;');
			},
		);

		it(
			'转义<',
			() => {
				expect(escapeHtml('<')).toBe('&lt;');
			},
		);

		it(
			'转义>',
			() => {
				expect(escapeHtml('>')).toBe('&gt;');
			},
		);

		it(
			"转义'",
			() => {
				expect(escapeHtml("'")).toBe('&#x27;');
			},
		);

		it(
			'转义"',
			() => {
				expect(escapeHtml('"')).toBe('&quot;');
			},
		);

		it(
			'转义/',
			() => {
				expect(escapeHtml('/')).toBe('&#x2F;');
			},
		);

		it(
			'转义xx&&<  <>>" "\'\'//   ',
			() => {
				expect(escapeHtml('xx&&<  <>>" "\'\'//   ')).toBe(
					'xx&amp;&amp;&lt;  &lt;&gt;&gt;&quot; &quot;&#x27;&#x27;&#x2F;&#x2F;   ',
				);
			},
		);
	},
);
