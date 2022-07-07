import { describe, expect, it } from 'vitest'
import { getString } from '../getString'

describe('getString', () => {
  it('nullable 值返回空串', () => {
    expect(getString()).toBe('')
  })

  it('nullable 值返回空串', () => {
    expect(getString(null)).toBe('')
  })

  it('字符串会 trim 后返回字符串 1', () => {
    expect(getString('  1 ')).toBe('1')
  })

  it('非字符串会转换为字符串后返回', () => {
    expect(getString(2)).toBe('2')
  })
})
