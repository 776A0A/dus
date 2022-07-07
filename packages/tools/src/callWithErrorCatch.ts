import { logError } from './logError';

/**
 * @param cb - 需要包裹的函数
 * @param [fallback] - 可选的错误处理函数
 */
export function callWithErrorCatch<T extends (...args: any[]) => any>(
	cb: T,
	fallback?: (error: any) => void,
): ReturnType<T> | void {
	try {
		return cb();
	} catch (error: any) {
		logError(error.message);

		fallback?.(error);
	}
}
