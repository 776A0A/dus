/* eslint-disable @typescript-eslint/no-empty-function */
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	SpyInstance,
	vi,
} from 'vitest';
import storage from '..';
import { sessionStorageKey, storageKey } from '../shared';

let consoleSpy: SpyInstance;
beforeEach(() => {
	consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
},);
afterEach(() => {
	consoleSpy.mockRestore();
},);

beforeEach(() => {
	storage.clear();
},);

describe(
	'localStorage',
	() => {
		describe(
			'get',
			() => {
				it(
					'本地没有时，返回undefined',
					() => {
						expect(storage.get('a')).toBeUndefined();
					},
				);

				it(
					'本地没有，但传入后备值，返回后备值，并存下后备值',
					() => {
						expect(storage.get('a', '你好')).toBe('你好');
						expect(storage.get('a')).toBe('你好');
					},
				);

				it(
					'本地有值，但是传入了后备值，忽略后备值',
					() => {
						storage.set('a', 1);
						expect(storage.get('a', 2)).toBe(1);
					},
				);

				it(
					'本地有值，但是无法通过parse的解析，返回undefined',
					() => {
						window.localStorage.setItem('b', [] as any);

						expect(storage.get('b')).toBeUndefined();
					},
				);
			},
		);

		describe(
			'set',
			() => {
				it(
					'存入abc，返回abc',
					() => {
						storage.set('a', 'abc');

						expect(storage.get('a')).toBe('abc');
					},
				);

				it(
					'存入非法值，回调函数调用',
					() => {
						const cb = vi.fn(() => {});

						// bigInt转换时会报错
						storage.set('a', 12n, cb);

						expect(cb.mock.calls.length).toBe(1);

						// 循环引用也会报错
						const a: any = {};
						const b = { a };
						a.b = b;

						storage.set('b', a, cb);

						expect(cb.mock.calls.length).toBe(2);
					},
				);

				it(
					'同一个key设置多次值，后面的会覆盖前面的',
					() => {
						storage.set('a', 1);
						storage.set('a', 2);

						expect(storage.get('a')).toBe(2);
					},
				);
			},
		);

		describe(
			'remove',
			() => {
				it(
					'只会移除a，而不会移除b',
					() => {
						storage.set('a', 'a');
						storage.set('b', 'b');

						storage.remove('a');

						expect(storage.get('a')).toBeUndefined();
						expect(storage.get('b')).toBe('b');
					},
				);

				it(
					'所有的都被移除',
					() => {
						storage.set('a', 'a');
						storage.set('b', 'b');

						storage.remove('a');
						storage.remove('b');

						expect((storage.get(storageKey) as []).length).toBe(0);
					},
				);
			},
		);

		describe(
			'removeAll',
			() => {
				it(
					'local和session中的存储都会被删除',
					() => {
						storage.set('a', 'a1');
						storage.session.set('a', 'a2');

						storage.clearAll();

						expect(storage.get('a')).toBeUndefined();
						expect(storage.session.get('a')).toBeUndefined();
						expect(storage.get(storageKey)).toBeUndefined();
						expect(storage.session.get(sessionStorageKey)).toBeUndefined();
					},
				);
			},
		);

		describe(
			'forEach',
			() => {
				it(
					'只会遍历使用storage存入的值',
					() => {
						window.localStorage.setItem('x', 'xx');

						storage.set('a', 'a');
						storage.set('b', 'b');
						storage.set('c', 'c');

						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const cb = vi.fn((_v) => {});

						storage.forEach(cb);

						expect(cb.mock.calls.length).toBe(3);
						expect(cb.mock.calls[0]?.[0]).toBe('a');
						expect(cb.mock.calls[1]?.[0]).toBe('b');
					},
				);

				it(
					'在本地为空时，不会执行任何遍历',
					() => {
						const cb = vi.fn(() => {});

						storage.forEach(cb);

						expect(cb.mock.calls.length).toBe(0);
					},
				);
			},
		);
	},
);

describe(
	'sessionStorage',
	() => {
		beforeEach(() => {
			storage.session.clear();
		},);
		describe(
			'set',
			() => {
				it(
					'正确的存入sessionStorage中',
					() => {
						storage.session.set('a', 1);
						storage.session.set('b', 2);
						storage.set('a', 3);

						expect(storage.session.get('a')).toBe(1);
						expect(storage.session.get('b')).toBe(2);
					},
				);
			},
		);
	},
);
