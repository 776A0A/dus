import { vi } from 'vitest';

export async function fast<F extends () => Promise<any>>(callback: F): Promise<
	Awaited<ReturnType<F>>
> {
	vi.useFakeTimers();

	const result: Awaited<ReturnType<F>> = await callback();

	vi.runAllTimers();
	vi.useRealTimers();

	return result;
}
