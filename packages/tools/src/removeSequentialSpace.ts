export function removeSequentialSpace(value?: StringOrNumber) {
  return String(value ?? '')
    .trim()
    .replace(/\s{2,}/g, ' ')
}
