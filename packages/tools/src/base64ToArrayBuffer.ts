/**
 *
 * @param sBase64
 * @param decode - 是否需要 decode 字符，默认 false
 * @returns
 */
export function base64ToArrayBuffer(sBase64: string, decode = false) {
  const str = window.atob(decode ? window.decodeURIComponent(sBase64) : sBase64)
  const length = str.length
  const bytes = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    bytes[i] = str.charCodeAt(i)
  }

  return bytes.buffer
}
