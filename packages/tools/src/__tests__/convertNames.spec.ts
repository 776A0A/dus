import { describe, expect, it } from 'vitest'
import { convertNames } from '../convertNames'

describe('convertNames', () => {
  const obj = {
    name: 'xx',
    age: 11,
  }
  it('转换后的对象会包含期望的key', () => {
    const newObj = convertNames(obj, { name: 'newName', age: 'newAge' })

    expect(newObj).toEqual({ newName: 'xx', newAge: 11 })
  })

  it('未转换的key将会保留', () => {
    const newObj = convertNames(obj, { name: 'newName' })

    expect(newObj).toEqual({ newName: 'xx', age: 11 })
  })

  it('转换后的对象不会包含源对象没有的key', () => {
    const newObj = convertNames(obj, { name: 'newName', sex: 'male' })

    expect('sex' in newObj).toBe(false)
    expect(newObj).toEqual({ newName: 'xx', age: 11 })
  })

  it('原始的key将会被替换', () => {
    const newObj = convertNames(obj, { name: 'newName' })

    expect('name' in newObj).toBe(false)
    expect(newObj).not.toEqual({ newName: 'xx', age: 11, name: 'xx' })
    expect(newObj).toEqual({ newName: 'xx', age: 11 })
  })

  it('传入的key-map为空对象时，会返回源对象的复制', () => {
    const newObj = convertNames(obj, {})

    expect(newObj).toEqual(obj)
    expect(newObj === obj).toBe(false)
  })

  it('传入非对象值将直接返回该值', () => {
    const newValue = convertNames(1 as any, {})

    expect(newValue).toBe(1)
  })

  it('传入的key-map中有空值，该空值会被忽略', () => {
    const newObj = convertNames(obj, { name: '', age: 'newAge' })

    expect(newObj).toEqual({ name: 'xx', newAge: 11 })
  })

  describe('deep', () => {
    const obj = {
      name: 'yyy',
      age: 12,
      children: [{ name: 'yyy child', age: 2 }],
    }

    it('可传入第三个参数，递归转换名称，默认子属性名称为 children 的数组', () => {
      const newObj = convertNames(
        obj,
        { name: 'fullName', age: 'years old' },
        { deep: true }
      )

      expect(newObj).toEqual({
        fullName: 'yyy',
        'years old': 12,
        children: [{ fullName: 'yyy child', 'years old': 2 }],
      })
    })

    it('更多的嵌套', () => {
      const obj = {
        name: 'yyy',
        age: 12,
        children: [
          {
            name: 'yyy child',
            age: 2,
            children: [{ name: 'yyy child 3', age: 0 }],
          },
        ],
      }

      const newObj = convertNames(
        obj,
        { name: 'fullName', age: 'years old' },
        { deep: true }
      )

      expect(newObj).toEqual({
        fullName: 'yyy',
        'years old': 12,
        children: [
          {
            fullName: 'yyy child',
            'years old': 2,
            children: [{ fullName: 'yyy child 3', 'years old': 0 }],
          },
        ],
      })
    })

    it('传入 childKey', () => {
      const obj = {
        name: 'yyy',
        age: 12,
        c: [{ name: 'yyy child', age: 2 }],
      }
      const newObj = convertNames(
        obj,
        { name: 'fullName' },
        { deep: true, childKey: 'c' }
      )

      expect(newObj).toEqual({
        fullName: 'yyy',
        age: 12,
        c: [{ fullName: 'yyy child', age: 2 }],
      })
    })

    it('当子属性名称也需要被转换时', () => {
      const newObj = convertNames(
        obj,
        { name: 'fullName', children: 'childNodes' },
        { deep: true, childKey: 'childNodes' }
      )

      expect(newObj).toEqual({
        fullName: 'yyy',
        age: 12,
        childNodes: [{ fullName: 'yyy child', age: 2 }],
      })
    })
  })
})
