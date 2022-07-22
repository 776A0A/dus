/**
 * 过滤对象中的空值和 null/undefined
 * @param obj - 需要过滤的对象
 * @param {boolean} [options.cleanEmptyString=true] - 是否需要过滤空值，默认 true
 * @returns 过滤后的对象
 */
export const cleanObject: <T extends Record<keyof any, any>>(
  obj: T,
  options?: { cleanEmptyString?: boolean }
) => T = (obj, options = { cleanEmptyString: true }) => {
  const copiedObj = { ...obj }
  const keys = Object.keys(copiedObj)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = copiedObj[key]
    if (value == null) {
      delete copiedObj[key]
    } else if (options.cleanEmptyString && value === '') {
      delete copiedObj[key]
    }
  }

  return copiedObj
}
