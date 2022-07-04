export function isElement(value: unknown): value is Element {
	return value instanceof Element;
}

/**
 * 判断是否是 null 或 undefined
 * @param value
 * @returns
 */
export function isNullable(value: unknown): value is null | undefined {
	return value === null || value === void 0;
}

export { isBoolean, isFunction, isObject } from '@vueuse/core';
