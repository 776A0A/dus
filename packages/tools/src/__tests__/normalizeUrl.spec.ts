import { describe, expect, it, vi } from 'vitest'
import { normalizeURL } from '../normalizeURL'

describe('normalizeURL', () => {
  it('传入http://a，返回http://a', () => {
    expect(normalizeURL('http://a')).toBe('http://a')
  })

  it('传入https://a，返回https://a', () => {
    expect(normalizeURL('https://a')).toBe('https://a')
  })

  it('传入a，返回http://a', () => {
    expect(normalizeURL('a')).toBe('http://a')
  })

  it('当协议是https时，传入a，返回https://a', () => {
    vi.stubGlobal('location', { protocol: 'https:' })

    expect(normalizeURL('a')).toBe('https://a')
  })
})
