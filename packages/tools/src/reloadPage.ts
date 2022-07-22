import debounce from 'lodash.debounce'

/**
 * 对外的刷新页面接口
 * @param url - 路径
 * @param [replace=true] - 默认使用 replace
 */
export function reloadPage(url = '', replace = true) {
  if (replace) replaceAndReload(url)
  else pushAndReload(url)
}

/**
 * push 一个路由并刷新页面
 * @param [url] - 路径
 */
export const pushAndReload = debounce((url = '') => {
  location.assign(`${url}`)

  // chrome有bug，在firefox中完全正常，在chrome中有时url不会改变
  if (location.href !== url) location.href = url
  if (location.href !== url) window.location = url

  setTimeout(() => location.reload(), 10)
}, 30)

/**
 * 替换路由并刷新页面
 * @param [url] - 路径
 *
 * 单纯的改变hash（因为我们使用的是hash路由），并不会让页面刷新，所以既想重定向又想刷新页面，需要使用meta实现
 * @see https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections#html_%E9%87%8D%E5%AE%9A%E5%90%91%E6%9C%BA%E5%88%B6
 */
export const replaceAndReload = debounce((url = '') => {
  let metaElem = document.createElement('meta')
  metaElem.setAttribute('http-equiv', 'Refresh')
  metaElem.setAttribute('content', `0; URL=${url}`)
  document.head.appendChild(metaElem)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  metaElem = null

  const userAgent = navigator.userAgent
  // 火狐会跳转页面但是不会刷新页面，这会造成应用的状态仍然存在的问题，所以需要再调用reload
  if (userAgent.includes('Firefox')) {
    setTimeout(() => location.reload(), 10)
  }
}, 30)
