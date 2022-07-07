import { Router, RouteRecordRaw } from 'vue-router'
import { NA, TA } from './constants'

/**
 *
 * @param router
 * @param routes - 传入 createRouter 中的 routes
 * @param reachables - 扁平的路由权限数组
 * @param customFilter - 可自定过滤逻辑，返回非布尔类型将把处理权交还给默认逻辑
 */
export function filterRoutes(
  router: Router,
  routes: RouteRecordRaw[],
  reachables: string[],
  customFilter?: (authPath: string, routePath: string) => boolean | undefined
) {
  routes.forEach((route) => {
    let deleted = false

    if (
      route.meta?.[NA] &&
      route.meta?.[TA] !== true &&
      !reachables.some((authPath) => {
        const auth = customFilter?.(authPath, route.path)

        if (typeof auth === 'boolean') {
          return auth
        }

        return route.path.startsWith(authPath)
      })
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      router.removeRoute(route.name!)
      deleted = true
    }

    if (!deleted && route.children) {
      filterRoutes(router, route.children, reachables, customFilter)
    }
  })
}
