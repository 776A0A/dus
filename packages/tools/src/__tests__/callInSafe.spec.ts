/* eslint-disable @typescript-eslint/no-empty-function */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  SpyInstance,
  vi,
} from 'vitest'
import { callInSafe } from '../callInSafe'

describe('callInSafe', () => {
  let consoleSpy: SpyInstance
  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('cb 函数被调用，没有错误fallback不会被调用，拿到返回结果', () => {
    const cb = vi.fn(() => 1)
    const fallback = vi.fn()

    const result = callInSafe(cb, fallback)

    expect(cb).toHaveBeenCalledTimes(1)
    expect(result).toBe(1)
    expect(fallback).not.toHaveBeenCalled()
  })

  it('cb 被调用且抛出错误，fallback被调用', () => {
    const fallback = vi.fn()

    callInSafe(() => {
      throw Error('cb调用出错')
    }, fallback)

    expect(fallback).toHaveBeenCalledTimes(1)
    expect(fallback).toHaveBeenCalledWith(Error('cb调用出错'))
  })
})
