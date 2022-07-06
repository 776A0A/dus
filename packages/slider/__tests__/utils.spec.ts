import { describe, expect, it } from 'vitest';
import { getIndex, getTranslateX, transform, transition } from '../utils';

const getEl = (transform: string) => (
	{
		style: { transform },
	} as any
);

describe(
	'slider utils',
	() => {
		describe(
			'getTranslateX',
			() => {
				it(
					'正确获取元素的 x 偏移值',
					() => {
						expect(getTranslateX(getEl('translate3d(10%, 0, 0)'))).toBe('10');

						expect(getTranslateX(getEl('translate3d(55px, 0, 0)'))).toBe('55');
					},
				);

				it(
					'当没有偏移时，返回字符0',
					() => {
						expect(getTranslateX(getEl(''))).toBe('0');
					},
				);
			},
		);

		describe(
			'transform',
			() => {
				it(
					'正确设置元素的transform值',
					() => {
						const el = getEl('');

						transform(el, 100, 1);

						expect(el.style.transform).toBe('translate3d(100%, 0, 0) scale(1)');
					},
				);
			},
		);

		describe(
			'transition',
			() => {
				it(
					'正确设置元素的transition值',
					() => {
						const el = getEl('');

						const value = 'all .3s ease-out';

						transition(el, value);

						expect(el.style.transition).toBe(value);
					},
				);
			},
		);

		describe(
			'getIndex',
			() => {
				it(
					'正确获取index',
					() => {
						const length = 5;

						expect(getIndex(0, length)).toBe(0);
						expect(getIndex(1, length)).toBe(1);
						expect(getIndex(5, length)).toBe(0);
						expect(getIndex(6, length)).toBe(1);

						expect(getIndex(-1, length)).toBe(4);
						expect(getIndex(1, 0)).toBe(0);
					},
				);
			},
		);
	},
);
