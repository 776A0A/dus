import { describe, expect, it, vi } from 'vitest'
import { sleep } from '../sleep'

describe('sleep', () => {
  it('预计会在指定时间后往后执行', async () => {
    vi.useFakeTimers()

    const TIME = 2000

    const startTime = Date.now()

    sleep(TIME)

    vi.runAllTimers()

    const endTime = Date.now()

    expect(endTime - startTime >= TIME).toBe(true)
  })
})
