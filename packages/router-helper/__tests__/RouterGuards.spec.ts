/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createGuards } from '../RouterGuards'

const paths = { login: '/login', home: '/home' }

describe('RouterGuard', () => {
  describe('beforeEach', () => {
    describe('not login', () => {
      let routerGuards: ReturnType<typeof createGuards>

      beforeEach(() => {
        routerGuards = createGuards({
          loginPath: paths.login,
          homePath: paths.home,
          isLogin: () => false,
          getAuthList: () => false,
          onNoAuthList: () => {},
        })
      })

      it('should back to login page when a user is not login and also not in login page', async () => {
        const result = // @ts-expect-error
          (await routerGuards.beforeEach(
            { path: '/', matched: [], fullPath: '/' } as any,
            { matched: [] } as any
          )) as any

        expect(result.path).toBe(paths.login)
        expect(result.query.redirect).toBe(encodeURIComponent('/'))
      })

      it('should return undefined when a user is not login but in login page', async () => {
        // @ts-expect-error
        const result = await routerGuards.beforeEach(
          { path: paths.login, matched: [] } as any,
          { matched: [] } as any
        )

        expect(result).toBeUndefined()
      })
    })

    describe('login', () => {
      let routerGuards: ReturnType<typeof createGuards>

      beforeEach(() => {
        routerGuards = createGuards({
          loginPath: paths.login,
          homePath: paths.home,
          isLogin: () => true,
          getAuthList: () => true,
          onNoAuthList: () => {},
        })
      })

      afterEach(() => {
        vi.resetAllMocks()
      })

      it('should return to home page when a user is login and is in login page', async () => {
        const result = // @ts-expect-error
          (await routerGuards.beforeEach(
            { path: paths.login, matched: [], query: {} } as any,
            { matched: [], query: {} } as any
          )) as any

        expect(result.path).toBe(paths.home)
      })

      it('should invoke onNoAuthList when there is no auth list', async () => {
        const callback = vi.fn((to) => to.fullPath)

        const routerGuards = createGuards({
          loginPath: paths.login,
          homePath: paths.home,
          isLogin: () => true,
          getAuthList: () => false,
          onNoAuthList: callback,
        })

        const result = // @ts-expect-error
          (await routerGuards.beforeEach(
            {
              path: '/xxx',
              matched: [],
              fullPath: '/base/xxx',
              query: {},
            } as any,
            { matched: [], query: {} } as any
          )) as any

        expect(callback).toHaveBeenCalled()
        expect(result).toBe('/base/xxx')
      })

      it('should return undefined when a user is login', async () => {
        const result = // @ts-expect-error
          (await routerGuards.beforeEach(
            {
              path: '/xxx',
              matched: [],
              fullPath: '/base/xxx',
              query: {},
            } as any,
            { matched: [], query: {} } as any
          )) as any

        expect(result).toBeUndefined()
      })
    })
  })
})
