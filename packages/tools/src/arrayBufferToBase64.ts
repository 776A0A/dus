/**
 *
 * @param ab
 * @param encode - 是否需要 encode 字符，默认 false
 * @returns
 */
export function arrayBufferToBase64(ab: ArrayBuffer, encode = false) {
  const bytes = new Uint8Array(ab)
  const length = bytes.byteLength

  let binary = ''

  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return window.btoa(encode ? window.encodeURIComponent(binary) : binary)
}
