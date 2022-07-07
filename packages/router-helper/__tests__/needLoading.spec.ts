import { describe, expect, it } from 'vitest'
import { START_LOCATION } from 'vue-router'
import { needLoading } from '../utils'

describe('needLoading', () => {
  it('should return true when a router just started', () => {
    expect(
      needLoading({ matched: [{ path: '/' }] } as any, START_LOCATION)
    ).toBe(true)
  })

  it('should return true when the path changed', () => {
    expect(
      needLoading(
        { matched: [{ path: '/' }] } as any,
        { matched: [{ path: '/a' }] } as any
      )
    ).toBe(true)
  })

  it('should return false when only query changes', () => {
    expect(
      needLoading(
        { matched: [{ path: '/' }] } as any,
        { matched: [{ path: '/' }] } as any
      )
    ).toBe(false)
  })
})
