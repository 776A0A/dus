/**
 * 解析文件后缀，会将解析出来的后缀小写化
 * @param filename 文件名
 */
export function ext(filename: string) {
  const ext = filename.includes('.') ? filename.split('.').pop() ?? '' : ''
  return ext.trim().toLowerCase()
}
