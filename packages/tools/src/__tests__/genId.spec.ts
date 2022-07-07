import { describe, expect, it } from 'vitest'
import { genId } from '../genId'

describe('genId', () => {
  it('生成一个随机的8位字符串', () => {
    const randomId = genId()

    expect(randomId.length).toBe(8)
  })
})
