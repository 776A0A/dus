import { describe, expect, it, vi } from 'vitest'
import { wait } from '../wait'

describe('wait', () => {
  it('预计会在指定时间后往后执行', async () => {
    vi.useFakeTimers()

    const TIME = 2000

    const startTime = Date.now()

    wait(TIME)

    vi.runAllTimers()

    const endTime = Date.now()

    expect(endTime - startTime >= TIME).toBe(true)
  })
})
