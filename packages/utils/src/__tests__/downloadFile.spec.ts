import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { injectBrowserEnv } from '../../../test-utils';
import { downloadFile } from '../downloadFile';

describe(
	'downloadFile',
	() => {
		let creator: Mock;

		beforeEach(() => {
			injectBrowserEnv();

			creator = vi.fn();
			Object.defineProperty(window, 'Blob', { value: creator });
		},);

		it(
			'当传入blob时，原样传给createObjectURL',
			async () => {
				await downloadFile(new Blob(['123'], { type: 'text' }), () => '123.t');

				expect(creator.mock.calls[0][1]).toEqual({ type: 'text' });
			},
		);

		it(
			'当传入字符串，从网络获取blob失败时',
			async () => {
				window.fetch =
					() =>
						Promise.resolve(
							{
								blob() {
									return Promise.reject();
								},
							} as any,
						);

				await downloadFile('https://xx', () => 'test.html');

				expect(creator.mock.calls[0][1]).toEqual({ type: 'text/html' });
			},
		);

		it(
			'当传入普通文本时，写入txt文件',
			async () => {
				window.fetch =
					() =>
						Promise.resolve(
							{
								blob() {
									return Promise.reject();
								},
							} as any,
						);

				await downloadFile('qqq', () => 'qq');

				expect(creator.mock.calls[0][1]).toEqual({
					type: 'text/plain;charset=utf-8',
				},);
			},
		);
	},
);
