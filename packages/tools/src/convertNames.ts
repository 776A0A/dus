type ConvertObjName = <
  T extends NormalObj,
  R extends {
    readonly [K in keyof T]?: string
  }
>(
  originalObj: T,
  namesMap: Readonly<R>,
  options?: Partial<{ deep: boolean; childKey: string }>
) => RecordWithSwappedKey<T, R>

/**
 * 转换对象的名称
 * @param obj - 源对象
 * @param namesMap - 目标key的对象
 * @param options - 可传入 deep 用于递归处理子对象，默认 { deep: false, childKey: 'children' }
 * @returns 替换后的对象，源对象中被替换的key将会删除，同时保留类型
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const convertNames: ConvertObjName = (obj, namesMap, options) => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const convertedObj = {} as ReturnType<ConvertObjName>

  Object.keys(obj).forEach((key) => {
    if (namesMap[key]) {
      convertedObj[namesMap[key as keyof typeof namesMap]] = obj[key]
    } else {
      convertedObj[key] = obj[key]
    }

    if (options?.deep) {
      const key = options.childKey || 'children'

      if (Array.isArray(convertedObj[key])) {
        const children = [...convertedObj[key]]
        convertedObj[key] = children.map((child) =>
          convertNames(child, namesMap, options)
        )
      }
    }
  })

  return convertedObj
}
