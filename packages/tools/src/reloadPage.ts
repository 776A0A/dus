import { pushAndReload } from './pushAndReload'
import { replaceAndReload } from './replaceAndReload'

/**
 * 对外的刷新页面接口
 * @param url - 路径
 * @param [replace=true] - 默认使用 replace
 */
export function reloadPage(url = '', replace = true) {
  if (replace) {
    replaceAndReload(url)
  } else {
    pushAndReload(url)
  }
}
