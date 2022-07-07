import { vi } from 'vitest';

/**
 * 使用 fakeTimer 加快测试速度
 * @param callback - 需要加快的异步函数，内部触发的异步 settimeout 会直接完成
 */
export async function fast<F extends () => Promise<any>>(callback: F): Promise<
	Awaited<ReturnType<F>>
> {
	vi.useFakeTimers();

	const result: Awaited<ReturnType<F>> = await callback();

	vi.runAllTimers();
	vi.useRealTimers();

	return result;
}
