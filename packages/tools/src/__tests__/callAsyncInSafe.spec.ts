import { describe, expect, it, vi } from 'vitest'
import { callAsyncInSafe } from '../callAsyncInSafe'

describe('callAsyncInSafe', () => {
  it('异步的调用cb，并拿到结果', async () => {
    const result = callAsyncInSafe(() => Promise.resolve(1))

    expect(result).not.toBe(1)

    await result.then((r) => {
      expect(r).toBe(1)
    })
  })

  it('没有错误时，fallback不会调用', async () => {
    const fallback = vi.fn()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await callAsyncInSafe(() => {}, fallback)

    expect(fallback).not.toHaveBeenCalled()
  })

  it('抛出错误将会被fallback捕获到', async () => {
    const log = vi.fn()
    vi.spyOn(console, 'log').mockImplementationOnce(log)
    const fallback = vi.fn()

    await callAsyncInSafe(() => {
      throw Error('cb调用出错')
    }, fallback)

    expect(fallback).toHaveBeenCalledTimes(1)
    expect(fallback).toHaveBeenCalledWith(Error('cb调用出错'))
    expect(log).toHaveBeenCalledTimes(1)
  })

  it('rejected的将会被fallback捕获到', async () => {
    const log = vi.fn()
    vi.spyOn(console, 'log').mockImplementationOnce(log)
    const fallback = vi.fn()

    await callAsyncInSafe(() => Promise.reject('no'), fallback)

    expect(fallback).toHaveBeenCalledTimes(1)
    expect(fallback).toHaveBeenCalledWith('no')
    expect(log).toHaveBeenCalledTimes(1)
  })
})
