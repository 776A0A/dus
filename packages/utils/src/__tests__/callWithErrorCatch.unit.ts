/* eslint-disable @typescript-eslint/no-empty-function */
import { callWithErrorCatch } from '../callWithErrorCatch';

describe(
	'callWithErrorCatch',
	() => {
		let consoleSpy: jest.SpyInstance;
		beforeEach(() => {
			consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		},);
		afterEach(() => {
			consoleSpy.mockRestore();
		},);

		it(
			'cb 函数被调用，没有错误fallback不会被调用，拿到返回结果',
			() => {
				const cb = jest.fn(() => 1);
				const fallback = jest.fn();

				const result = callWithErrorCatch(cb, fallback);

				expect(cb).toHaveBeenCalledTimes(1);
				expect(result).toBe(1);
				expect(fallback).not.toHaveBeenCalled();
			},
		);

		it(
			'cb 被调用且抛出错误，fallback被调用',
			() => {
				const fallback = jest.fn();

				callWithErrorCatch(
					() => {
						throw Error('cb调用出错');
					},
					fallback,
				);

				expect(fallback).toHaveBeenCalledTimes(1);
				expect(fallback).toHaveBeenCalledWith(Error('cb调用出错'));
			},
		);
	},
);
