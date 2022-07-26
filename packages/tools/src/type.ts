export function isElement(value: unknown): value is Element {
  return value instanceof Element
}

/**
 * 判断是否是 null 或 undefined
 * @param value
 * @returns
 */
export function isNullable(value: unknown): value is null | undefined {
  return value === null || value === void 0
}

export function isObject(value: unknown): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
