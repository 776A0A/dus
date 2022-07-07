export {}

declare global {
  /**
   * 开发环境
   */
  const __DEV__: boolean
  /**
   * 测试环境
   */
  const __TEST__: boolean
  /**
   * 生产环境
   */
  const __PROD__: boolean

  type StringOrNumber = string | number
  type Id = StringOrNumber

  type NormalObj = Record<keyof any, any>

  type APIMethodReturnType<T extends (...args: any[]) => any> = Awaited<
    ReturnType<T>
  >

  type ResolveArrayType<T> = T extends (infer P)[] ? P : never

  /**
   * 对指定的 key 进行可选化
   */
  type PartialPart<T, K extends keyof T> = Omit<T, K> & {
    [key in K]?: T[key]
  }

  /**
   * 对指定的 key 进行必填化
   */
  type RequiredPart<T, K extends keyof T> = Omit<T, K> & {
    [key in T]: T[key]
  }

  type ValidTemplateString<T> = T extends string | number ? T : never
  type ValidTemplateNumber<T> = T extends `${number}`
    ? T extends `${infer N}`
      ? N
      : never
    : T

  type TupleToTemplateString<T> = T extends [infer S]
    ? ValidTemplateString<S>
    : T extends [infer F, ...infer R]
    ? `${ValidTemplateString<F>}.${TupleToTemplateString<R>}`
    : never

  type TemplateStringToTuple<T> = T extends `${infer F}.${infer R}`
    ? [ValidTemplateNumber<F>, ...TemplateStringToTuple<R>]
    : [ValidTemplateNumber<T>]

  type ObjPathsToTuple<T> = T extends object
    ? {
        [K in keyof T]: T[K] extends object
          ? [K] | [K, ...ObjPathsToTuple<T[K]>]
          : [K]
      }[keyof T]
    : never

  type ObjPathsToUnion<T> = TupleToTemplateString<ObjPathsToTuple<T>>

  type ValueOf<
    T,
    K extends ObjPathsToUnion<T>
  > = K extends `${infer F}.${infer R}`
    ? F extends keyof T
      ? R extends ObjPathsToUnion<T[F]>
        ? ValueOf<T[F], R>
        : never
      : F extends `${number}`
      ? number extends keyof T
        ? R extends ObjPathsToUnion<T[number]>
          ? ValueOf<T[number], R>
          : never
        : never
      : never
    : K extends keyof T
    ? T[K]
    : never

  type IsChild<T, K> = K extends keyof T ? true : false
  type IsDescendant<T, K> = K extends keyof T
    ? true
    : K extends ObjPathsToUnion<T>
    ? true
    : false

  type ObjValues<T> = T extends object ? T[keyof T] : never

  /**
   * 用于 convertNames 这个工具函数中，提取对应的 key 的值为新的对象的 key，并保留类型
   */
  type RecordWithSwappedKey<T, U extends Partial<Record<keyof T, any>>> = Omit<
    T,
    keyof U
  > & {
    -readonly [K in Extract<keyof U, keyof T> as U[K]]: K extends keyof T
      ? T[K]
      : K
  }

  /**
   * 交换键值类型
   */
  type SwapKeyValue<T extends Record<keyof any, string>> = {
    [K in keyof T as T[K]]: K
  }

  /**
   * 可向对象内添加属性
   */
  type AppendToObject<T, U, V = any> = {
    [Key in keyof T | (U extends string ? U : keyof U)]: Key extends keyof T
      ? Key extends keyof U
        ? T[Key] | U[Key]
        : T[Key]
      : U extends string
      ? V
      : Key extends keyof U
      ? U[Key]
      : never
  }

  type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
      ? // eslint-disable-next-line @typescript-eslint/ban-types
        T[P] extends Function
        ? T[P]
        : DeepReadonly<T[P]>
      : T[P]
  }

  type AnyFunction = (...args: any[]) => any

  /**
   * 合法的对象 key
   */
  type ObjKeys = keyof any

  type SingleSameKeyValue<T extends ObjKeys, Key extends T = T> = Key extends T
    ? {
        [K in Key]: Key
      }
    : never

  type MergeSingleSameKeyValue<
    T,
    Obj extends Record<any, T>,
    Initial = Record<any, keyof Obj>
  > = Obj & Initial

  /**
   * 获取 key 和 value 相同的类型对象
   */
  type SameKeyValue<T extends ObjKeys> = MergeSingleSameKeyValue<
    T,
    SingleSameKeyValue<T>
  >
}
