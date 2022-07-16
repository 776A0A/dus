type Env = 'dev' | 'prod' | 'test'

interface Options {
  dev: string
  test: string
  env: Env
  /**
   * 正式服环境地址
   * @default location.host
   */
  prod?: string
  /**
   * @default '/'
   */
  apiPath?: string
  /**
   * @default '/websocket'
   */
  wsPath?: string
  /**
   * 环境和是否启用 SSL 的映射
   * @default { env: false, test: true, prod: true }
   */
  httpsMap?: Record<Env, boolean>
  routerBase?: string
  siteOrigin?: string
}

export function createConfig<T extends Options>(options: Readonly<T>) {
  const { services, endpoints, origins } = createServiceConfig(options)

  const { routerBase = '', siteOrigin = location.origin } = options

  return [
    {
      get ___serviceEndpoint() {
        return services.endpoint
      },
      get ___wsEndpoint() {
        return services.wsEndpoint
      },
      get ___routerBase() {
        return routerBase
      },
      get ___siteOrigin() {
        return siteOrigin
      },
      get ___siteUrl() {
        return `${this.___siteOrigin}${this.___routerBase}/#` as const
      },
      get ___envEndpoint() {
        return endpoints.dev
      },
      get ___testEndpoint() {
        return endpoints.test
      },
      get ___prodEndpoint() {
        return endpoints.prod
      },
      get ___devOrigin() {
        return origins.dev
      },
      get ___testOrigin() {
        return origins.test
      },
      get ___prodOrigin() {
        return origins.prod
      },
    },
    { services, endpoints, origins },
  ] as const
}

const defaultHttpsMap = Object.freeze({
  env: false,
  test: true,
  prod: true,
}) as unknown as NonNullable<Options['httpsMap']>

function createServiceConfig<T extends Options>(options: Readonly<T>) {
  const {
    dev,
    test,
    prod = location.host,
    apiPath = '/',
    wsPath = '/websocket',
    env,
    httpsMap = defaultHttpsMap,
  } = options

  const https = httpsMap[env]

  const httpProtocol = `http${https ? 's' : ''}:` as const
  const wsProtocol = `ws${https ? 's' : ''}:` as const

  // 接口地址
  const endpoints = {
    dev: `//${dev}${apiPath}`,
    test: `${httpProtocol}//${test}${apiPath}`,
    prod: `${httpProtocol}//${prod}${apiPath}`,
  } as const

  // websocket 接口地址
  const wsEndpoints = {
    dev: `ws://${dev}${wsPath}`,
    test: `${wsProtocol}//${test}${wsPath}`,
    prod: `${wsProtocol}//${prod}${wsPath}`,
  } as const

  const services = {
    endpoint: endpoints[env],
    wsEndpoint: wsEndpoints[env],
  }

  const origins = {
    dev,
    test,
    prod,
  }

  return { services, endpoints, wsEndpoints, origins }
}
