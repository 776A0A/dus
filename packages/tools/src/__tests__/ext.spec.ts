import { describe, expect, it } from 'vitest'
import { ext } from '../ext'

describe('ext', () => {
  it('传入123.mov，得到mov', () => {
    expect(ext('123.mov')).toBe('mov')
  })

  it('传入123.pdf，得到pdf', () => {
    expect(ext('123.pdf')).toBe('pdf')
  })

  it('传入123.x.pdf，得到pdf', () => {
    expect(ext('123.x.pdf')).toBe('pdf')
  })

  it('传入123，得到undefined', () => {
    expect(ext('123')).toBe('')
  })

  it('传入123.pdf  ，得到pdf', () => {
    expect(ext('123.pdf  ')).toBe('pdf')
  })

  it('传入123..pdf, 得到pdf', () => {
    expect(ext('123..pdf')).toBe('pdf')
  })

  it('将大写后缀转换为小写', () => {
    expect(ext('xxx.ABC')).toBe('abc')
  })
})
