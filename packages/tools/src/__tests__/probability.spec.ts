import { describe, it, expect } from 'vitest'
import { probability } from '../probability'

describe('probability', () => {
  it('should return true when the arg is 1', () => {
    expect(probability(1)).toBe(true)
  })

  it('should return false when the arg is 0', () => {
    expect(probability(0)).toBe(false)
  })
})
