import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import gzip from 'rollup-plugin-gzip'
import { visualizer } from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import type {
  AliasOptions,
  BuildOptions,
  HtmlTagDescriptor,
  PluginOption,
} from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgLoader from 'vite-svg-loader'

type EnvVars = Record<'isDev' | 'isTest' | 'isProd', boolean>

export function getEnvVars(mode: string) {
  const isDev = mode === 'development'
  const isTest = mode === 'onlineTest'
  const isProd = mode === 'production'

  console.log(
    `env: ${mode}, isDev: ${isDev}, isTest: ${isTest}, isProd: ${isProd}`
  )

  return { isDev, isTest, isProd }
}

export function getBaseDefinition({ isDev, isTest, isProd }: EnvVars) {
  return {
    __DEV__: isDev,
    __TEST__: isTest,
    __PROD__: isProd,
    __CDN__: JSON.stringify(getCdnBase()),
  }
}

export function getEnvsAndDefinitions(mode: string) {
  const envVars = getEnvVars(mode)

  const definitions = getBaseDefinition(envVars)

  return { envVars, definitions }
}

export function getBuildOptions(
  isTest: boolean,
  build?: BuildOptions
): BuildOptions {
  return { sourcemap: isTest, ...build }
}

export function getBaseAlias(): AliasOptions {
  return {
    assets: resolve('assets'),
    components: resolve('components'),
    router: resolve('router'),
    store: resolve('store'),
    styles: resolve('styles'),
    utils: resolve('utils'),
    venders: resolve('venders'),
    views: resolve('views'),
    service: resolve('service'),
    layout: resolve('layout'),
    config: resolve('config'),
  }
}

function resolve(name: string) {
  return `/src/${name}`
}

export function getBasePlugins(): PluginOption[] {
  return [
    vue(),
    vueJsx(),
    Unocss(),
    gzip({
      filter:
        /\.(js|mjs|json|css|html|dat|png|jpg|jpeg|ico|webp|svg|ttf|woff|woff2)$/,
    }),
    svgLoader(),
    visualizer({ gzipSize: true }),
    Components({ dts: true }),
    Icons({ compiler: 'vue3' }),
  ]
}

export function getBaseViteConfig({ isDev, isTest }: EnvVars) {
  return {
    base: isDev ? '/' : './',
    plugins: getBasePlugins(),
    resolve: { alias: getBaseAlias() },
    build: getBuildOptions(isTest),
  }
}

export function injectCdn(uri: string, type: 'link' | 'script') {
  const url = getCdnBase() + uri

  const isLink = type === 'link'

  return {
    tag: type,
    attrs: isLink
      ? {
          rel: 'preload',
          href: url,
          as: 'script',
        }
      : { src: url },
    injectTo: isLink ? 'head-prepend' : 'body',
  } as HtmlTagDescriptor
}

export function getCdnBase() {
  return '' as const
}

export function injectTags(...tags: ReturnType<typeof injectCdn>[]) {
  return createHtmlPlugin({ minify: true, inject: { tags } })
}
