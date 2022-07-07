import { describe, expect, it, vi } from 'vitest'
import { imageFileToBase64 } from '../imageFileToBase64'

describe('imageFileToBase64', () => {
  it.skip('传入blob对象，将会返回包含base64的字符串', (done) => {
    const cb = vi.fn((_error: any, url: string) => {
      expect(url).toContain('base64')
      done()
    })
    document.createElement('canvas').toBlob((blob) => {
      if (!blob) {
        return
      }
      imageFileToBase64(blob, cb as any)
    })
  })
})
