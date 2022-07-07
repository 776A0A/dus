import { beforeEach, expect, it, Mock, vi } from 'vitest'
import { fast } from '../../../test-utils'
import { repeatable } from '../repeatable'
import { sleep } from '../sleep'

let callback: Mock<any, any>
let re: ReturnType<typeof repeatable>

beforeEach(() => {
  let count = 0
  callback = vi.fn()

  re = repeatable(() => count++ <= 2, callback, 16)
})

it('重复 3 次后停止', async () => {
  await fast(async () => {
    re.run()
  })

  await sleep(16)
  expect(callback).toHaveBeenCalledTimes(3)
})

it('调用 stop 后停止循环', async () => {
  re.run()

  await sleep(20)

  re.stop()

  expect(callback).toHaveBeenCalledTimes(2)
})

it('不调用 run 将不会开始', async () => {
  vi.useFakeTimers()
  sleep(100)
  vi.runAllTimers()

  expect(callback).not.toHaveBeenCalled()
})
